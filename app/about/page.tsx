import { Utensils, Clock, Shield, Heart, Users, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
              ارتباط شما با رستوران‌ مورد علاقه‌تان
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 text-pretty leading-relaxed">
              ما ماموریت داریم سفارش غذا را ساده، سریع و لذت‌بخش کنیم. چه هوس غذای آماده داشته باشید و چه به دنبال کشف غذاهای جدید، ما بهترین طعم‌های محلی را درب منزل شما می‌آوریم.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Link href="/menu">برو به منو</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">500+</div>
              <div className="text-gray-600">Partner Restaurants</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">1M+</div>
              <div className="text-gray-600">Orders Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">30min</div>
              <div className="text-gray-600">Avg Delivery Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ordering food has never been easier. Just three simple steps to satisfy your cravings.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Utensils className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Browse & Choose</h3>
              <p className="text-gray-600 leading-relaxed">
                Explore hundreds of restaurants and thousands of dishes. Filter by cuisine, rating, or delivery time to
                find exactly what you want.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Order & Track</h3>
              <p className="text-gray-600 leading-relaxed">
                Place your order with a few taps. Track your food in real-time from preparation to delivery with live
                updates.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Enjoy Your Meal</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive your hot, fresh food at your doorstep. Rate your experience and help others discover great food.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best food ordering experience for both customers and restaurant partners.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600 leading-relaxed">
                  Average delivery time of 30 minutes. We value your time and ensure your food arrives hot and fresh.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Safe & Secure</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your data and payments are protected with industry-leading security. Order with confidence.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our customer support team is always ready to help with any questions or concerns you may have.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Store className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Partners</h3>
                <p className="text-gray-600 leading-relaxed">
                  We partner with the best local restaurants to bring you authentic flavors from your neighborhood.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality First</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every restaurant is carefully vetted to ensure you receive only the highest quality food.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Wide Selection</h3>
                <p className="text-gray-600 leading-relaxed">
                  From pizza to sushi, burgers to salads - discover cuisines from around the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Order?</h2>
            <p className="text-lg text-orange-50 mb-8 leading-relaxed">
              Join thousands of happy customers who trust us for their daily meals. Start exploring delicious food from
              local restaurants today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/">Start Ordering</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-orange-500"
              >
                <Link href="/restaurant/dashboard">Become a Partner</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
