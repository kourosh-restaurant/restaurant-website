'use client'

import { OrderStatus, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/types'
import { useLanguage } from '@/lib/language-context'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface OrderStatusBadgeProps {
  status: OrderStatus
  size?: 'sm' | 'default' | 'lg'
}

export function OrderStatusBadge({ status, size = 'default' }: OrderStatusBadgeProps) {
  const { language } = useLanguage()

  const label = language === 'fa' 
    ? ORDER_STATUS_LABELS[status].fa 
    : ORDER_STATUS_LABELS[status].en

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    default: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  }

  return (
    <Badge 
      variant="secondary" 
      className={cn(
        ORDER_STATUS_COLORS[status],
        sizeClasses[size],
        'font-medium'
      )}
    >
      {label}
    </Badge>
  )
}
