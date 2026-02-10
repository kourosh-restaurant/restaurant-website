-- Seed sample restaurant data
-- Note: Run this after creating at least one restaurant admin user

-- Insert a sample restaurant (you'll need to update admin_id with actual user id)
INSERT INTO public.restaurants (id, name, description, image_url, is_active)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Pizza Palace', 'Best pizza in town with authentic Italian recipes', '/images/pizza-palace.jpg', true),
  ('00000000-0000-0000-0000-000000000002', 'Burger House', 'Gourmet burgers made with premium ingredients', '/images/burger-house.jpg', true);

-- Insert categories
INSERT INTO public.categories (id, restaurant_id, name, sort_order)
VALUES 
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Pizzas', 1),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Drinks', 2),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'Burgers', 1),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 'Sides', 2);

-- Insert menu items
INSERT INTO public.menu_items (restaurant_id, category_id, name, description, price, is_available)
VALUES 
  -- Pizza Palace items
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Margherita', 'Classic tomato sauce, mozzarella, and fresh basil', 85000, true),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Pepperoni', 'Tomato sauce, mozzarella, and spicy pepperoni', 95000, true),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Vegetarian', 'Fresh vegetables with cheese blend', 90000, true),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 'Cola', 'Refreshing cola drink', 15000, true),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 'Orange Juice', 'Fresh squeezed orange juice', 25000, true),
  -- Burger House items
  ('00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000003', 'Classic Burger', 'Beef patty, lettuce, tomato, onion, pickles', 75000, true),
  ('00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000003', 'Cheese Burger', 'Beef patty with melted cheddar cheese', 85000, true),
  ('00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000003', 'Double Burger', 'Two beef patties with special sauce', 120000, true),
  ('00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000004', 'French Fries', 'Crispy golden fries', 35000, true),
  ('00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000004', 'Onion Rings', 'Crispy breaded onion rings', 40000, true);
