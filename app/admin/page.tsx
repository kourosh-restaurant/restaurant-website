import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminDashboardClient } from './dashboard-client'

export default async function AdminDashboardPage() {
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

  // Get orders for this restaurant
  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      customer:profiles!orders_customer_id_fkey(id, full_name, phone),
      order_items:order_items(
        id,
        quantity,
        unit_price,
        menu_item:menu_items(id, name, name_fa)
      )
    `)
    .eq('restaurant_id', restaurant?.id)
    .order('created_at', { ascending: false })
    .limit(20)

  // Get stats
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const { count: todayOrdersCount } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant?.id)
    .gte('created_at', todayStart.toISOString())

  const { count: pendingOrdersCount } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant?.id)
    .in('status', ['pending', 'cooking', 'ready'])

  return (
    <AdminDashboardClient
      restaurant={restaurant}
      initialOrders={orders || []}
      todayOrdersCount={todayOrdersCount || 0}
      pendingOrdersCount={pendingOrdersCount || 0}
    />
  )
}
