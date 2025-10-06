import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-muted/30">
            <div className="w-full max-w-md">
                <div className="bg-background rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-balance">خوش آمدید</h1>
                        <p className="text-muted-foreground mt-2">لطفا برای ثبت سفارش وارد شوید.</p>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="tel">شماره تلفن </Label>
                            <Input id="tel" type="tel" placeholder="09112907140" required />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">رمز</Label>
                                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                                    فراموش کرده اید؟
                                </Link>
                            </div>
                            <Input id="password" type="password" placeholder="••••••••" required />
                        </div>

                        <Button type="submit" className="w-full">
                            ثبت نام
                        </Button>
                    </form>

                    {/* <p className="text-center text-sm text-muted-foreground mt-6">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-primary font-medium hover:underline">
                            Sign up
                        </Link>
                    </p> */}
                </div>

                {/* <p className="text-center text-xs text-muted-foreground mt-6 px-8">
                    By continuing, you agree to our{" "}
                    <Link href="/terms" className="underline hover:text-foreground">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline hover:text-foreground">
                        Privacy Policy
                    </Link>
                </p> */}
            </div>
        </div>
    )
}
