"use client"

import { UtensilsCrossed } from "lucide-react"
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button"
import ImageCarousel from "@/components/card-swiper";



const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
});

export default function HomePage() {

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8 bg-[url(/banner.jpg)] bg-cover rounded-xl">
          <div className="backdrop-brightness-45 p-12 rounded-xl flex flex-col gap-5">
            <h1 className="text-4xl text-white font-bold flex gap-2 items-center">
              خوشمزگی با اصالت ایرانی
              <UtensilsCrossed className="h-10 w-10 text-primary" />
            </h1>
            <p className="text-lg text-muted"> آدرس: مازندران، نوشهر، میدان شموشک، روبروی باغ اکولوژی، جنب هایپر جانبو </p>
            <div className="flex gap-4 items-center">
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-5 w-5 rounded-full bg-green-300 opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
              </div>
              <p className="text-sm text-white">سفارش میپذیریم</p>
              <Button variant={"default"} className="cursor-pointer">
                منو رستوران
              </Button>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-3xl font-bold text-primary py-5">غذاهای محبوب</h3>
          <ImageCarousel />
        </section>


        <section className="mt-20">
          <Map />
        </section>
      </main>
    </div>
  )
}
