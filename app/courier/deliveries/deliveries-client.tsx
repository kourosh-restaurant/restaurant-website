'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { OrderStatusBadge } from '@/components/order-status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { 
  Package, 
  Clock, 
  MapPin,
  Store
} from 'lucide-react'
import { Profile, OrderStatus } from '@/lib/types'

interface CourierDeliveriesClientProps {
  profile: Profile
  initialDeliveries: any[]
}

export function CourierDeliveriesClient({ 
  profile, 
  initialDeliveries 
}: CourierDeliveriesClientProps) {
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState('all')

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

  const filteredDeliveries = activeTab === 'all' 
    ? initialDeliveries 
    : initialDeliveries.filter(d => d.status === activeTab)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('My Deliveries', 'تحویل‌های من')}</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="all">{t('All', 'همه')}</TabsTrigger>
          <TabsTrigger value="on_the_way">{t('In Progress', 'در حال انجام')}</TabsTrigger>
          <TabsTrigger value="delivered">{t('Delivered', 'تحویل شده')}</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {filteredDeliveries.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  {t('No deliveries found', 'تحویلی یافت نشد')}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredDeliveries.map((delivery: any) => (
                <Card key={delivery.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-base">
                          #{delivery.id.slice(0, 8)}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(delivery.created_at)}
                        </div>
                      </div>
                      <OrderStatusBadge status={delivery.status as OrderStatus} size="sm" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* Restaurant */}
                    <div className="flex items-start gap-3">
                      <Store className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-sm font-medium">
                          {t(delivery.restaurant?.name, delivery.restaurant?.name_fa)}
                        </p>
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-sm">{delivery.customer?.full_name}</p>
                        <p className="text-sm text-muted-foreground">{delivery.delivery_address}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Order Summary */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {delivery.order_items?.length || 0} {t('items', 'آیتم')}
                      </span>
                      <span className="font-medium text-primary">
                        {formatPrice(delivery.total_amount)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
