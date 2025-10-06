
import { OrderCard } from "@/components/order-card"

const orders = [
  {
    orderId: "12345",
    date: "Today, 2:30 PM",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 12.99 },
      { name: "Caesar Salad", quantity: 1, price: 8.99 },
    ],
    total: 24.97,
    status: "preparing" as const,
  },
  {
    orderId: "12344",
    date: "Yesterday, 7:15 PM",
    items: [
      { name: "Sushi Platter", quantity: 1, price: 24.99 },
      { name: "Miso Soup", quantity: 2, price: 3.99 },
    ],
    total: 32.97,
    status: "delivered" as const,
  },
  {
    orderId: "12343",
    date: "Dec 28, 6:45 PM",
    items: [
      { name: "Cheeseburger", quantity: 2, price: 11.99 },
      { name: "French Fries", quantity: 2, price: 4.99 },
    ],
    total: 33.96,
    status: "delivered" as const,
  },
  {
    orderId: "12342",
    date: "Dec 27, 1:20 PM",
    items: [
      { name: "Chicken Tikka Masala", quantity: 1, price: 15.99 },
      { name: "Garlic Naan", quantity: 2, price: 2.99 },
    ],
    total: 21.97,
    status: "delivered" as const,
  },
]

export default function OrdersPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">My Orders</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <OrderCard key={order.orderId} {...order} />
          ))}
        </div>
      </main>
    </div>
  )
}
