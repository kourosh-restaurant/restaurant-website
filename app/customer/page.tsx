import { createClient } from '@/lib/supabase/server'
import { MenuItem, Category, Restaurant } from '@/lib/types'
import { CustomerMenuClient } from './menu-client'

export default async function CustomerPage() {
  const supabase = await createClient()

  // Fetch restaurant
  const { data: restaurants } = await supabase
    .from('restaurants')
    .select('*')
    .eq('is_active', true)
    .limit(1)

  const restaurant = restaurants?.[0] as Restaurant | undefined

  if (!restaurant) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No restaurant available</p>
      </div>
    )
  }

  // Fetch categories
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .order('sort_order')

  const categories = (categoriesData || []) as Category[]

  // Fetch menu items
  const { data: menuItemsData } = await supabase
    .from('menu_items')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .eq('is_available', true)

  const menuItems = (menuItemsData || []) as MenuItem[]

  return (
    <CustomerMenuClient 
      restaurant={restaurant}
      categories={categories}
      menuItems={menuItems}
    />
  )
}
