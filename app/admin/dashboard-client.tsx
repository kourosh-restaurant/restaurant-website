'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { createClient } from '@/lib/supabase/client'
import { OrderStatusBadge } from '@/components/order-status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  Package, 
  Clock, 
  ChefHat, 
  Truck, 
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Store
} from 'lucide-react'
import { Restaurant, OrderStatus, ORDER_STATUS_LABELS } from '@/lib/types'

interface AdminDashboardClientProps {
  restaurant: Restaurant | null
  initialOrders: any[]
  todayOrdersCount: number
  pendingOrdersCount: number
}

export function AdminDashboardClient({ 
  restaurant, 
  initialOrders, 
  todayOrdersCount,
  pendingOrdersCount 
}: AdminDashboardClientProps) {
  const { t, language } = useLanguage()
  const [orders, setOrders] = useState(initialOrders)
  const supabase = createClient()

  // Real-time subscription for new orders
  useEffect(() => {
    if (!restaurant) return

    const channel = supabase
      .channel('admin-orders')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `restaurant_id=eq.${restaurant.id}`,
        },
        async (payload: { eventType: string; new: { id: any } }) => {
          if (payload.eventType === 'INSERT') {
            // Fetch complete order with relations
            const { data } = await supabase
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
              .eq('id', payload.new.id)
              .single()

            if (data) {
              setOrders(prev => [data, ...prev])
            }
          } else if (payload.eventType === 'UPDATE') {
            setOrders(prev =>
              prev.map(order =>
                order.id === payload.new.id
                  ? { ...order, ...payload.new }
                  : order
              )
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [restaurant, supabase])

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId)
  }

  const formatPrice = (price: number) => {
    if (language === 'fa') {
      return `${price.toLocaleString('fa-IR')} تومان`
    }
    return `${price.toLocaleString()} Toman`
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    if (language === 'fa') {
      return d.toLocaleTimeString('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    }
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const statusOptions: OrderStatus[] = ['pending', 'cooking', 'ready', 'on_the_way', 'delivered']

  if (!restaurant) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Store className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold mb-2">
          {t('No Restaurant Assigned', 'رستورانی تخصیص داده نشده')}
        </h2>
        <p className="text-muted-foreground">
          {t('Please contact support to set up your restaurant', 'لطفاً برای راه‌اندازی رستوران با پشتیبانی تماس بگیرید')}
        </p>
      </div>
    )
  }

  const activeOrders = orders.filter(o => !['delivered'].includes(o.status))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">{t('Dashboard', 'داشبورد')}</h1>
        <p className="text-muted-foreground">
          {t(restaurant.name, restaurant.name_fa)}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("Today's Orders", 'سفارشات امروز')}</p>
                <p className="text-2xl font-bold">{todayOrdersCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('Pending', 'در انتظار')}</p>
                <p className="text-2xl font-bold">{pendingOrdersCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('Cooking', 'در حال پخت')}</p>
                <p className="text-2xl font-bold">
                  {orders.filter(o => o.status === 'cooking').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('Ready', 'آماده')}</p>
                <p className="text-2xl font-bold">
                  {orders.filter(o => o.status === 'ready').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Orders */}
      <div>
        <h2 className="text-lg font-semibold mb-4">{t('Active Orders', 'سفارشات فعال')}</h2>
        
        {activeOrders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                {t('No active orders', 'سفارش فعالی وجود ندارد')}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeOrders.map((order: any) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="pb-3 bg-muted/50">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base">
                        #{order.id.slice(0, 8)}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(order.created_at)}
                      </div>
                    </div>
                    <OrderStatusBadge status={order.status as OrderStatus} size="sm" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {/* Customer Info */}
                    <div className="text-sm">
                      <p className="font-medium">{order.customer?.full_name || t('Customer', 'مشتری')}</p>
                      <p className="text-muted-foreground">{order.customer?.phone}</p>
                    </div>

                    <Separator />

                    {/* Order Items */}
                    <div className="space-y-1">
                      {order.order_items?.map((item: any) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.quantity}x {t(item.menu_item?.name, item.menu_item?.name_fa)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Total & Status Change */}
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-primary">
                        {formatPrice(order.total_amount)}
                      </span>
                    </div>

                    {/* Status Update */}
                    <Select
                      value={order.status}
                      onValueChange={(value) => updateOrderStatus(order.id, value as OrderStatus)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map(status => (
                          <SelectItem key={status} value={status}>
                            {language === 'fa' 
                              ? ORDER_STATUS_LABELS[status].fa 
                              : ORDER_STATUS_LABELS[status].en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Delivery Address */}
                    {order.delivery_address && (
                      <div className="text-xs text-muted-foreground">
                        <Truck className="h-3 w-3 inline mr-1" />
                        {order.delivery_address}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
