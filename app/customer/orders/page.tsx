import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CustomerOrdersClient } from './orders-client'

export default async function CustomerOrdersPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: ordersData } = await supabase
    .from('orders')
    .select(`
      *,
      restaurant:restaurants(id, name, name_fa),
      order_items:order_items(
        id,
        quantity,
        unit_price,
        menu_item:menu_items(id, name, name_fa)
      )
    `)
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false })

  const orders = ordersData || []

  return <CustomerOrdersClient initialOrders={orders} />
}
