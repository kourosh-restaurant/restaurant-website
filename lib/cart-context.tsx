'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { MenuItem, CartItem } from '@/lib/types'

interface CartContextType {
  items: CartItem[]
  addItem: (menuItem: MenuItem) => void
  removeItem: (menuItemId: string) => void
  updateQuantity: (menuItemId: string, quantity: number) => void
  clearCart: () => void
  totalAmount: number
  totalItems: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((menuItem: MenuItem) => {
    setItems(prev => {
      const existing = prev.find(item => item.menuItem.id === menuItem.id)
      if (existing) {
        return prev.map(item =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { menuItem, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((menuItemId: string) => {
    setItems(prev => prev.filter(item => item.menuItem.id !== menuItemId))
  }, [])

  const updateQuantity = useCallback((menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(menuItemId)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.menuItem.id === menuItemId ? { ...item, quantity } : item
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalAmount = items.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  )

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalAmount,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
