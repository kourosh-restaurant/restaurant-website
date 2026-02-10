-- Create enum types for roles and order status
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('customer', 'restaurant_admin', 'courier', 'super_admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE order_status AS ENUM ('pending', 'cooking', 'ready', 'on_the_way', 'delivered');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('pending', 'confirmed', 'failed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Profiles table with role-based access
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone TEXT NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'customer' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Restaurants table
CREATE TABLE IF NOT EXISTS public.restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Menu categories
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Menu items
CREATE TABLE IF NOT EXISTS public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL NOT NULL,
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE SET NULL NOT NULL,
  courier_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status order_status DEFAULT 'pending' NOT NULL,
  payment_status payment_status DEFAULT 'pending' NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  delivery_address TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Order items
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  menu_item_id UUID REFERENCES public.menu_items(id) ON DELETE SET NULL NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Restaurant admins and super admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('restaurant_admin', 'super_admin', 'courier')
    )
  );

-- Restaurants policies (public read, admin write)
CREATE POLICY "Anyone can view active restaurants" ON public.restaurants FOR SELECT USING (is_active = true);
CREATE POLICY "Restaurant admin can manage own restaurant" ON public.restaurants FOR ALL 
  USING (admin_id = auth.uid());

-- Categories policies
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Restaurant admin can manage categories" ON public.categories FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurants WHERE id = restaurant_id AND admin_id = auth.uid()
    )
  );

-- Menu items policies
CREATE POLICY "Anyone can view available menu items" ON public.menu_items FOR SELECT USING (is_available = true);
CREATE POLICY "Restaurant admin can manage menu items" ON public.menu_items FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurants WHERE id = restaurant_id AND admin_id = auth.uid()
    )
  );

-- Orders policies
CREATE POLICY "Customers can view own orders" ON public.orders FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "Customers can insert own orders" ON public.orders FOR INSERT WITH CHECK (customer_id = auth.uid());
CREATE POLICY "Restaurant admin can view restaurant orders" ON public.orders FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurants WHERE id = restaurant_id AND admin_id = auth.uid()
    )
  );
CREATE POLICY "Restaurant admin can update restaurant orders" ON public.orders FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurants WHERE id = restaurant_id AND admin_id = auth.uid()
    )
  );
CREATE POLICY "Courier can view assigned orders" ON public.orders FOR SELECT USING (courier_id = auth.uid());
CREATE POLICY "Courier can update assigned orders" ON public.orders FOR UPDATE USING (courier_id = auth.uid());

-- Order items policies
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.orders WHERE id = order_id AND customer_id = auth.uid()
    )
  );
CREATE POLICY "Users can insert own order items" ON public.order_items FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders WHERE id = order_id AND customer_id = auth.uid()
    )
  );
CREATE POLICY "Restaurant admin can view order items" ON public.order_items FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.orders o
      JOIN public.restaurants r ON o.restaurant_id = r.id
      WHERE o.id = order_id AND r.admin_id = auth.uid()
    )
  );
CREATE POLICY "Courier can view assigned order items" ON public.order_items FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.orders WHERE id = order_id AND courier_id = auth.uid()
    )
  );

-- Function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_phone TEXT;
  user_role_val user_role;
BEGIN
  user_phone := COALESCE(NEW.phone, NEW.raw_user_meta_data ->> 'phone', '');
  
  BEGIN
    user_role_val := (NEW.raw_user_meta_data ->> 'role')::user_role;
  EXCEPTION WHEN OTHERS THEN
    user_role_val := 'customer';
  END;

  INSERT INTO public.profiles (id, phone, full_name, role)
  VALUES (
    NEW.id,
    user_phone,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NULL),
    COALESCE(user_role_val, 'customer')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Trigger to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for orders (wrapped in exception handler)
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
