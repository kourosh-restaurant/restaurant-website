'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { createClient } from '@/lib/supabase/client'
import { OrderStatusBadge } from '@/components/order-status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Package, 
  Clock, 
  Truck, 
  CheckCircle2,
  MapPin,
  Phone,
  User,
  Navigation,
  Store
} from 'lucide-react'
import { Profile, OrderStatus } from '@/lib/types'

interface CourierDashboardClientProps {
  profile: Profile
  initialOrders: any[]
  todayDeliveriesCount: number
  activeDeliveriesCount: number
}

export function CourierDashboardClient({ 
  profile, 
  initialOrders, 
  todayDeliveriesCount,
  activeDeliveriesCount 
}: CourierDashboardClientProps) {
  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">{t('Dashboard', 'داشبورد')}</h1>
        <p className="text-muted-foreground">
          {t('Welcome', 'خوش آمدید')}, {profile.full_name}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("Today's Deliveries", 'تحویل‌های امروز')}</p>
                <p className="text-2xl font-bold">{todayDeliveriesCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('Active Deliveries', 'تحویل‌های فعال')}</p>
                <p className="text-2xl font-bold">{activeDeliveriesCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Deliveries */}
      <div>
        <h2 className="text-lg font-semibold mb-4">{t('Active Deliveries', 'تحویل‌های فعال')}</h2>
        
        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                {t('No active deliveries', 'تحویل فعالی وجود ندارد')}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <Card key={order.id}>
                <CardHeader className="pb-3">
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
                <CardContent className="space-y-4">
                  

                  

                  <Separator />

                  

                  <Separator />

                  
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
