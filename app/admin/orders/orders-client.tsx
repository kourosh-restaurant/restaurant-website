'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { createClient } from '@/lib/supabase/client'
import { OrderStatusBadge } from '@/components/order-status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Package, 
  Clock, 
  Search,
  User,
  Truck,
  MapPin
} from 'lucide-react'
import { Restaurant, OrderStatus, ORDER_STATUS_LABELS, Profile } from '@/lib/types'

interface AdminOrdersClientProps {
  restaurant: Restaurant
  initialOrders: any[]
  couriers: Partial<Profile>[]
}

export function AdminOrdersClient({ 
  restaurant, 
  initialOrders,
  couriers 
}: AdminOrdersClientProps) {
  const { t, language } = useLanguage()
  const [orders, setOrders] = useState(initialOrders)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const supabase = createClient()

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('admin-all-orders')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `restaurant_id=eq.${restaurant.id}`,
        },
        async (payload) => {
          if (payload.eventType === 'INSERT') {
            const { data } = await supabase
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
  }, [restaurant.id, supabase])

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId)
  }

  const assignCourier = async (orderId: string, courierId: string) => {
    await supabase
      .from('orders')
      .update({ 
        courier_id: courierId, 
        status: 'on_the_way',
        updated_at: new Date().toISOString() 
      })
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
      return d.toLocaleDateString('fa-IR', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    }
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchQuery === '' ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.phone?.includes(searchQuery)

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const statusOptions: (OrderStatus | 'all')[] = ['all', 'pending', 'cooking', 'ready', 'on_the_way', 'delivered']

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('All Orders', 'همه سفارشات')}</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('Search by order ID or customer...', 'جستجو با شماره سفارش یا مشتری...') || ''}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map(status => (
              <SelectItem key={status} value={status}>
                {status === 'all' 
                  ? t('All Status', 'همه وضعیت‌ها')
                  : language === 'fa' 
                    ? ORDER_STATUS_LABELS[status].fa 
                    : ORDER_STATUS_LABELS[status].en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('Order ID', 'شماره سفارش')}</TableHead>
                <TableHead>{t('Customer', 'مشتری')}</TableHead>
                <TableHead>{t('Items', 'آیتم‌ها')}</TableHead>
                <TableHead>{t('Total', 'جمع')}</TableHead>
                <TableHead>{t('Status', 'وضعیت')}</TableHead>
                <TableHead>{t('Time', 'زمان')}</TableHead>
                <TableHead>{t('Actions', 'عملیات')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    {t('No orders found', 'سفارشی یافت نشد')}
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order: any) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">
                      #{order.id.slice(0, 8)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer?.full_name || '-'}</p>
                        <p className="text-xs text-muted-foreground">{order.customer?.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {order.order_items?.length || 0} {t('items', 'آیتم')}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatPrice(order.total_amount)}
                    </TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status as OrderStatus} size="sm" />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(order.created_at)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        {t('View', 'مشاهده')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {t('Order Details', 'جزئیات سفارش')} #{selectedOrder?.id.slice(0, 8)}
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              {/* Customer */}
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{selectedOrder.customer?.full_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer?.phone}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <p className="text-sm">{selectedOrder.delivery_address}</p>
              </div>

              <Separator />

              {/* Items */}
              <div className="space-y-2">
                {selectedOrder.order_items?.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {t(item.menu_item?.name, item.menu_item?.name_fa)}
                    </span>
                    <span>{formatPrice(item.quantity * item.unit_price)}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <span>{t('Total', 'جمع کل')}</span>
                <span className="text-primary">{formatPrice(selectedOrder.total_amount)}</span>
              </div>

              {/* Status Update */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('Update Status', 'تغییر وضعیت')}</label>
                <Select
                  value={selectedOrder.status}
                  onValueChange={(value) => {
                    updateOrderStatus(selectedOrder.id, value as OrderStatus)
                    setSelectedOrder({ ...selectedOrder, status: value })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(['pending', 'cooking', 'ready', 'on_the_way', 'delivered'] as OrderStatus[]).map(status => (
                      <SelectItem key={status} value={status}>
                        {language === 'fa' 
                          ? ORDER_STATUS_LABELS[status].fa 
                          : ORDER_STATUS_LABELS[status].en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Assign Courier */}
              {selectedOrder.status === 'ready' && couriers.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('Assign Courier', 'تخصیص پیک')}</label>
                  <Select
                    value={selectedOrder.courier_id || ''}
                    onValueChange={(value) => {
                      assignCourier(selectedOrder.id, value)
                      setSelectedOrder({ ...selectedOrder, courier_id: value, status: 'on_the_way' })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('Select courier', 'انتخاب پیک') || ''} />
                    </SelectTrigger>
                    <SelectContent>
                      {couriers.map(courier => (
                        <SelectItem key={courier.id} value={courier.id!}>
                          {courier.full_name} ({courier.phone})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Current Courier */}
              {selectedOrder.courier && (
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{t('Courier', 'پیک')}</p>
                    <p className="text-sm">{selectedOrder.courier.full_name}</p>
                    <p className="text-xs text-muted-foreground">{selectedOrder.courier.phone}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
