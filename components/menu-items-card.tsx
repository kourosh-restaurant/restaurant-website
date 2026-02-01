'use client'

import { MenuItem } from '@/lib/types'
import { useLanguage } from '@/lib/language-context'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Minus } from 'lucide-react'

interface MenuItemCardProps {
  item: MenuItem
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { t, language } = useLanguage()
  const { items, addItem, updateQuantity } = useCart()

  const cartItem = items.find(ci => ci.menuItem.id === item.id)
  const quantity = cartItem?.quantity || 0

  const formatPrice = (price: number) => {
    if (language === 'fa') {
      return `${price.toLocaleString('fa-IR')} تومان`
    }
    return `${price.toLocaleString()} Toman`
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {item.image_url ? (
            <img
              src={item.image_url || "/placeholder.svg"}
              alt={t(item.name, item.name_fa) || ''}
              className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">🍽️</span>
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">
              {t(item.name, item.name_fa)}
            </h3>
            {(item.description || item.description_fa) && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {t(item.description, item.description_fa)}
              </p>
            )}
            <p className="text-primary font-medium mt-2">
              {formatPrice(item.price)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end">
          {quantity > 0 ? (
            <div className="flex items-center gap-3 bg-muted rounded-full px-2 py-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => updateQuantity(item.id, quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-medium w-6 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => addItem(item)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => addItem(item)}
              className="rounded-full"
            >
              <Plus className="h-4 w-4 mr-1" />
              {t('Add', 'افزودن')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
