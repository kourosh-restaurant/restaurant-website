"use client"

import { ClipboardCheck, DollarSign, Flame, ListCheck, Truck, UtensilsCrossed } from "lucide-react"
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button"
import ImageCarousel from "@/components/card-swiper";
import Image from "next/image";
import { VerticalProcessFlow } from "@/components/vertical-process-flow";
import ParagraphLoadMore from "@/components/paragraph-loadmore";
import Contactus from "@/components/contactus";



const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
});

export default function HomePage() {


  const processSteps = [
    {
      id: 1,
      title: "ثبت سفارش",
      icon: <ClipboardCheck className="text-primary" width={40} height={50} />,
      image: "/slide-items/item1.jpg"
    },
    {
      id: 2,
      title: "پرداخت",
      icon: <DollarSign className="text-primary" width={40} height={50} />,
      image: "/slide-items/item2.jpg"
    },
    {
      id: 3,
      title: "تایید سفارش",
      icon: <ListCheck className="text-primary" width={40} height={50} />,
      image: "/slide-items/item3.jpg"
    },
    {
      id: 4,
      title: "آماده سازی سفارش",
      icon: <Flame className="text-primary" width={40} height={50} />,
      image: "/slide-items/item4.jpg"
    },
    {
      id: 5,
      title: "ارسال سفارش",
      icon: <Truck className="text-primary" width={40} height={40} />,
      image: "/slide-items/item5.jpg"
    },
  ]



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

        <section className="mt-20">
          <h3 className="text-3xl font-bold text-primary py-5">غذاهای محبوب</h3>
          <ImageCarousel />
        </section>

        <section className="flex justify-around items-start mt-20 flex-col sm:flex-row gap-8">
          <div>
            <h3 className="text-3xl font-bold text-primary py-5">چرا آشپزخانه کوروش</h3>
            <p className="max-w-96 tracking-wide leading-8 text-md sm:text-lg font-semibold">رستوران کوروش با افتخار ارائه‌دهنده‌ی غذاهای اصیل ایرانی با بالاترین کیفیت و طعمی ماندگار است. ما با استفاده از مواد اولیه تازه و مرغوب، غذاهایی تهیه می‌کنیم که هم خوش‌طعم‌اند و هم سالم. هدف ما، خلق تجربه‌ای دل‌انگیز از هر وعده غذایی برای شماست — چه در محیط گرم و صمیمی رستوران ما غذا میل کنید، چه سفارش خود را به‌صورت بیرون‌بر دریافت کنید.</p>
          </div>
          <div className="bg-primary pr-4 hover:pr-8 duration-200 rounded-xl">
            <Image
              className="rounded-lg backdrop:opacity-25"
              src={"/caesar-salad.png"}
              height={500}
              width={300}
              alt="caesar-salad-image"
            />
          </div>
        </section>

        <section className="flex justify-around items-start mt-20 flex-col-reverse sm:flex-row gap-8">
          <div className="bg-primary pr-4 hover:pr-8 duration-200 rounded-xl">
            <Image
              className="rounded-lg backdrop:opacity-25"
              src={"/kebab.avif"}
              height={500}
              width={300}
              alt="lamb-shish-kebab-image"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary py-5">خدمات آشپزخانه</h3>
            <ul className="max-w-96 flex flex-col gap-8">
              <li><span className="text-primary font-bold">سرو غذاهای باکیفیت و تازه </span>استفاده از بهترین مواد اولیه و دستورهای اصیل برای تهیه‌ی غذاهایی خوش‌طعم و سالم.</li>
              <li><span className="text-primary font-bold">سفارش بیرون‌بر و ارسال سریع </span>تحویل به‌موقع غذا با بسته‌بندی مناسب برای حفظ طعم و حرارت در مسیر.</li>
              <li><span className="text-primary font-bold">محیطی دل‌نشین و خانوادگی </span>فضایی آرام و صمیمی برای صرف غذا با دوستان و خانواده.</li>
              <li><span className="text-primary font-bold">پذیرش سفارشات ویژه </span>آماده‌سازی غذا برای مهمانی‌ها، مراسم و سفارشات گروهی با منوی متنوع و قیمت مناسب.</li>
            </ul>
          </div>
        </section>

        <section className="mt-20">
          <h3 className="text-3xl font-bold text-primary py-5">فرایند آشپزخانه ما</h3>
          <VerticalProcessFlow steps={processSteps} />
        </section>

        <section className="">
          <h3 className="text-3xl font-bold text-primary py-5">با افتخار</h3>
          <ParagraphLoadMore
            text="رستوران کوروش نوشهر یکی از بهترین رستوران‌های مازندران در تهیه و سرو غذاهای اصیل ایرانی و محلی است. ما با تکیه بر تجربه‌ی چندین ساله در آشپزی و استفاده از مواد اولیه‌ی تازه شمال کشور، طعمی بی‌نظیر و متفاوت را برای شما به ارمغان می‌آوریم. در آشپزخانه کوروش، کیفیت و رضایت مشتری اولویت اصلی ماست؛ از برنج معطر شمالی گرفته تا گوشت تازه و سبزیجات محلی، همه با دقت انتخاب می‌شوند تا بهترین طعم را تجربه کنید.
          اگر به دنبال غذای بیرون‌بر در نوشهر هستید، رستوران کوروش انتخابی مطمئن و خوش‌طعم است. ما با سرویس سفارش آنلاین غذا، امکان انتخاب و ثبت سفارش را برای شما آسان کرده‌ایم. تنها با چند کلیک می‌توانید غذای دلخواه خود را از منوی متنوع کوروش انتخاب کنید و در کمترین زمان، تازه و گرم درب منزل یا محل کارتان تحویل بگیرید. ما تضمین می‌کنیم که طعم و کیفیت غذا مانند سرو در رستوران باقی بماند.
          آشپزخانه کوروش نوشهر ترکیبی از هنر آشپزی ایرانی با سبک مدرن پخت است. غذاهای ما، از چلوکباب، خورشت قورمه‌سبزی و فسنجان گرفته تا انواع فست‌فود و غذاهای دریایی شمالی، با دقت و ظرافت طبخ می‌شوند. ما به طعم اصیل و عطر طبیعی غذا اهمیت می‌دهیم و با رعایت کامل استانداردهای بهداشتی، وعده‌ای سالم و خوش‌طعم برای شما فراهم می‌کنیم.
          در رستوران کوروش نوشهر، علاوه بر سرو غذا در محیطی دل‌نشین و خانوادگی، امکان پذیرش سفارشات گروهی، مهمانی‌ها و مراسم خاص نیز وجود دارد. تیم ما آماده است تا غذاهایی باکیفیت و متناسب با سلیقه‌ی شما را برای جشن‌ها و گردهمایی‌هایتان آماده کند. با انتخاب رستوران کوروش نوشهر، طعم اصالت ایرانی را در کنار طبیعت زیبای مازندران تجربه کنید."
            previewLength={500}
            className="text-center tracking-wide"
          />
        </section>

        <section className="mt-20">
          <Contactus />
        </section>

        <section className="mt-20">
          <Map />
        </section>

      </main>
    </div>
  )
}

