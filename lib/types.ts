export type UserRole = 'customer' | 'restaurant_admin' | 'courier' | 'super_admin'

export type OrderStatus = 'pending' | 'cooking' | 'ready' | 'on_the_way' | 'delivered'

export type PaymentStatus = 'pending' | 'confirmed' | 'failed'

export interface Profile {
  id: string
  phone: string
  full_name: string | null
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Restaurant {
  id: string
  name: string
  name_fa: string | null
  description: string | null
  description_fa: string | null
  image_url: string | null
  address: string | null
  is_active: boolean
  admin_id: string | null
  created_at: string
}

export interface Category {
  id: string
  restaurant_id: string
  name: string
  name_fa: string | null
  sort_order: number
  created_at: string
}

export interface MenuItem {
  id: string
  restaurant_id: string
  category_id: string | null
  name: string
  name_fa: string | null
  description: string | null
  description_fa: string | null
  price: number
  image_url: string | null
  is_available: boolean
  created_at: string
  category?: Category
  onAddToCart: () => void
  image: string
}

export interface Order {
  id: string
  customer_id: string
  restaurant_id: string
  courier_id: string | null
  status: OrderStatus
  payment_status: PaymentStatus
  delivery_address: string
  total_amount: number
  notes: string | null
  created_at: string
  updated_at: string
  restaurant?: Restaurant
  items?: OrderItem[]
  customer?: Profile
  courier?: Profile
}

export interface OrderItem {
  id: string
  order_id: string
  menu_item_id: string
  quantity: number
  unit_price: number
  created_at: string
  menu_item?: MenuItem
}

export interface CartItem {
  menuItem: MenuItem
  quantity: number
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, { en: string; fa: string }> = {
  pending: { en: 'Pending', fa: 'در انتظار' },
  cooking: { en: 'Cooking', fa: 'در حال پخت' },
  ready: { en: 'Ready', fa: 'آماده' },
  on_the_way: { en: 'On The Way', fa: 'در مسیر' },
  delivered: { en: 'Delivered', fa: 'تحویل شده' },
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-800',
  cooking: 'bg-orange-100 text-orange-800',
  ready: 'bg-emerald-100 text-emerald-800',
  on_the_way: 'bg-blue-100 text-blue-800',
  delivered: 'bg-gray-100 text-gray-800',
}
