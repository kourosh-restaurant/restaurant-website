'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/lib/language-context'
import { Phone, ArrowRight, Globe } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()
  const { language, setLanguage, t, isRTL } = useLanguage()

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formattedPhone = phone.startsWith('+') ? phone : `+98${phone.replace(/^0/, '')}`

    const { error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
    })

    if (error) {
      setError(error.message)
    } else {
      setStep('otp')
    }
    setLoading(false)
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formattedPhone = phone.startsWith('+') ? phone : `+98${phone.replace(/^0/, '')}`

    const { error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: 'sms',
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/customer')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'fa' : 'en')}
            className="gap-2"
          >
            <Globe className="h-4 w-4" />
            {language === 'en' ? 'فارسی' : 'English'}
          </Button>
        </div>
        
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Phone className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {t('Welcome Back', 'خوش آمدید')}
            </CardTitle>
            <CardDescription>
              {step === 'phone' 
                ? t('Enter your phone number to continue', 'شماره تلفن خود را وارد کنید')
                : t('Enter the verification code sent to your phone', 'کد تأیید ارسال شده را وارد کنید')
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'phone' ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('Phone Number', 'شماره تلفن')}</Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={isRTL ? '۹۱۲۱۲۳۴۵۶۷' : '9121234567'}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="text-lg h-12 pl-12"
                      dir="ltr"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      +98
                    </span>
                  </div>
                </div>
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                <Button type="submit" className="w-full h-12" disabled={loading || !phone}>
                  {loading ? t('Sending...', 'در حال ارسال...') : t('Send Code', 'ارسال کد')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">{t('Verification Code', 'کد تأیید')}</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="text-center text-2xl tracking-widest h-14"
                    maxLength={6}
                    dir="ltr"
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                <Button type="submit" className="w-full h-12" disabled={loading || otp.length < 6}>
                  {loading ? t('Verifying...', 'در حال تأیید...') : t('Verify & Login', 'تأیید و ورود')}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setStep('phone')
                    setOtp('')
                    setError('')
                  }}
                >
                  {t('Change phone number', 'تغییر شماره تلفن')}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {t("Don't have an account?", 'حساب کاربری ندارید؟')}{' '}
              <Link href="/auth/sign-up" className="text-primary hover:underline font-medium">
                {t('Sign up', 'ثبت نام')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
