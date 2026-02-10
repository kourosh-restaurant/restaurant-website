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
