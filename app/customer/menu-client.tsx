'use client'

import { ReactNode, useState } from 'react'
import { MenuItem, Category, Restaurant } from '@/lib/types'
import { useLanguage } from '@/lib/language-context'
import { MenuItemCard } from '@/components/menu-item-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, UtensilsCrossed } from 'lucide-react'

interface CustomerMenuClientProps {
  restaurant: Restaurant
  categories: Category[]
  menuItems: MenuItem[]
}

export function CustomerMenuClient({ restaurant, categories, menuItems }: CustomerMenuClientProps) {
  const { t, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.name_fa && item.name_fa.includes(searchQuery)) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.description_fa && item.description_fa.includes(searchQuery))

    const matchesCategory = !selectedCategory || item.category_id === selectedCategory

    return matchesSearch && matchesCategory
  })

  const groupedItems = selectedCategory 
    ? { [selectedCategory]: filteredItems }
    : categories.reduce((acc, cat) => {
        const items = filteredItems.filter(item => item.category_id === cat.id)
        if (items.length > 0) {
          acc[cat.id] = items
        }
        return acc
      }, {} as Record<string, MenuItem[]>)

  // Add uncategorized items
  const uncategorizedItems = filteredItems.filter(item => !item.category_id)
  if (uncategorizedItems.length > 0 && !selectedCategory) {
    groupedItems['uncategorized'] = uncategorizedItems
  }

  return (
    <div className="space-y-6">
      {/* Restaurant Header */}
      <div className="text-center space-y-2">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <UtensilsCrossed className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-balance">
          {t(restaurant.name, restaurant.name_fa)}
        </h1>
        {(restaurant.description || restaurant.description_fa) && (
          <p className="text-muted-foreground text-pretty max-w-md mx-auto">
            {t(restaurant.description, restaurant.description_fa)}
          </p>
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t('Search menu...', 'جستجو در منو...') || ''}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      {/* Category Filters */}
      {categories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="rounded-full whitespace-nowrap"
          >
            {t('All', 'همه')}
          </Button>
          {categories.map(cat => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="rounded-full whitespace-nowrap"
            >
              {t(cat.name, cat.name_fa)}
            </Button>
          ))}
        </div>
      )}

      {/* Menu Items */}
      {Object.keys(groupedItems).length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {t('No items found', 'موردی یافت نشد')}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedItems).map(([categoryId, items]) => {
            const category = categories.find(c => c.id === categoryId)
            return (
              <div key={categoryId}>
                {!selectedCategory && (
                  <h2 className="text-lg font-semibold mb-4">
                    {categoryId === 'uncategorized' 
                      ? t('Other', 'سایر')
                      : t(category?.name || '', category?.name_fa || '')}
                  </h2>
                )}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map(item => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
