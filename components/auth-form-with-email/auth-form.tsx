"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/email-auth-context"
import LoginForm from "./email-login-form"
import SignupForm from "./email-sign-up-form"
import Image from "next/image"

export function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)
    const [successMessage, setSuccessMessage] = useState("")
    const { user, isLoading } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (!isLoading && user) {
            router.push("/dashboard")
        }

        const success = searchParams.get("success")
        if (success === "true") {
            setSuccessMessage("Account created! Please check your email to confirm your account.")
            setIsLogin(true)
        }
    }, [user, isLoading, router, searchParams])

    if (isLoading) {
        return (
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
            </div>
        )
    }

    return (
        <>
            <div className="mb-6 flex items-center justify-center gap-1">
                <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">Stone Code</h1>
                <Image src={"/logo.png"} height={50} width={50} alt="logo pix" />
            </div>
            <p className="text-center text-gray-600 mb-8">{isLogin ? "Welcome back!" : "Create your account"}</p>

            {successMessage && (
                <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm mb-4">{successMessage}</div>
            )}

            {isLogin ? <LoginForm /> : <SignupForm />}

            <div className="mt-6 text-center ">
                <p className="text-gray-600 text-sm">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:text-blue-700 font-medium">
                        {isLogin ? "Sign up" : "Sign in"}
                    </button>
                </p>
            </div>
        </>
    )
}