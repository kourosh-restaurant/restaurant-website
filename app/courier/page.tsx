import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CourierDashboardClient } from './dashboard-client'

export default async function CourierDashboardPage() {
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

  if (profile?.role !== 'courier') {
    redirect('/customer')
  }

  // Get assigned orders for this courier
  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      restaurant:restaurants(id, name, name_fa, address),
      customer:profiles!orders_customer_id_fkey(id, full_name, phone),
      order_items:order_items(
        id,
        quantity,
        unit_price,
        menu_item:menu_items(id, name, name_fa)
      )
    `)
    .eq('courier_id', user.id)
    .in('status', ['on_the_way', 'ready'])
    .order('created_at', { ascending: false })

  // Get stats
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const { count: todayDeliveriesCount } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .eq('courier_id', user.id)
    .eq('status', 'delivered')
    .gte('updated_at', todayStart.toISOString())

  const { count: activeDeliveriesCount } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .eq('courier_id', user.id)
    .eq('status', 'on_the_way')

  return (
    <CourierDashboardClient
      profile={profile}
      initialOrders={orders || []}
      todayDeliveriesCount={todayDeliveriesCount || 0}
      activeDeliveriesCount={activeDeliveriesCount || 0}
    />
  )
}
