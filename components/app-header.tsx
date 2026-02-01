'use client'

import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/lib/language-context'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { ShoppingCart, User, Globe, LogOut, Menu } from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'

interface AppHeaderProps {
  showCart?: boolean
  onCartClick?: () => void
}

export function AppHeader({ showCart = true, onCartClick }: AppHeaderProps) {
  const { user, profile, signOut } = useAuth()
  const { language, setLanguage, t, isRTL } = useLanguage()
  const { totalItems } = useCart()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push('/auth/login')
  }

  const navLinks = profile?.role === 'restaurant_admin' 
    ? [
        { href: '/admin', label: t('Dashboard', 'داشبورد') },
        { href: '/admin/menu', label: t('Menu', 'منو') },
        { href: '/admin/orders', label: t('Orders', 'سفارشات') },
      ]
    : profile?.role === 'courier'
    ? [
        { href: '/courier', label: t('Dashboard', 'داشبورد') },
        { href: '/courier/deliveries', label: t('Deliveries', 'تحویل‌ها') },
      ]
    : [
        { href: '/customer', label: t('Menu', 'منو') },
        { href: '/customer/orders', label: t('My Orders', 'سفارشات من') },
      ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={isRTL ? 'right' : 'left'} className="w-64">
              <nav className="flex flex-col gap-2 mt-8">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      pathname === link.href 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href={profile?.role === 'restaurant_admin' ? '/admin' : profile?.role === 'courier' ? '/courier' : '/customer'} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">PD</span>
            </div>
            <span className="font-semibold hidden sm:inline-block">
              {t('Persian Delights', 'لذت‌های ایرانی')}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 ml-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {showCart && profile?.role === 'customer' && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">{t('Cart', 'سبد خرید')}</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === 'en' ? 'fa' : 'en')}
          >
            <Globe className="h-5 w-5" />
            <span className="sr-only">{t('Change language', 'تغییر زبان')}</span>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">{t('User menu', 'منوی کاربر')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{profile?.full_name || t('User', 'کاربر')}</p>
                  <p className="text-xs text-muted-foreground">{profile?.phone}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('Sign out', 'خروج')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm">
              <Link href="/auth/login">{t('Login', 'ورود')}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
