import React from "react"
import { Button } from "./ui/button"
import Link from "next/link"


export default function Contactus() {
    

    return(
        <div className="bg-primary rounded-2xl w-full p-8 flex flex-col gap-4">
            <h4 className="font-bold text-lg text-muted">غذای مراسم خود را با خیال راحت به کوروش بسپارید</h4>
            <p className="text-muted">با تیم حرفه‌ای، مواد تازه و طعمی بی‌نظیر، هر مهمانی را به یک خاطره خوش تبدیل می‌کنیم.</p>
            <Link href={'tel:011 5233 3218'} className="bg-white text-primary w-fit py-2 px-4 rounded-lg">تماس بگیرید</Link>
        </div>
    )
}