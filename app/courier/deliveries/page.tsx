import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CourierDeliveriesClient } from './deliveries-client'

export default async function CourierDeliveriesPage() {
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

  // Get all deliveries for this courier
  const { data: deliveries } = await supabase
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
    .order('created_at', { ascending: false })

  return (
    <CourierDeliveriesClient 
      profile={profile}
      initialDeliveries={deliveries || []}
    />
  )
}
