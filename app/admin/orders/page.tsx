import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminOrdersClient } from './orders-client'

export default async function AdminOrdersPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Get profile to check role
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'restaurant_admin') {
    redirect('/customer')
  }

  // Get restaurant for this admin
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('admin_id', user.id)
    .single()

  if (!restaurant) {
    redirect('/admin')
  }

  // Get all orders for this restaurant
  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      customer:profiles!orders_customer_id_fkey(id, full_name, phone),
      courier:profiles!orders_courier_id_fkey(id, full_name, phone),
      order_items:order_items(
        id,
        quantity,
        unit_price,
        menu_item:menu_items(id, name, name_fa)
      )
    `)
    .eq('restaurant_id', restaurant.id)
    .order('created_at', { ascending: false })

  // Get available couriers
  const { data: couriers } = await supabase
    .from('profiles')
    .select('id, full_name, phone')
    .eq('role', 'courier')

  return (
    <AdminOrdersClient 
      restaurant={restaurant}
      initialOrders={orders || []}
      couriers={couriers || []}
    />
  )
}
