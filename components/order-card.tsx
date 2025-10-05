import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface OrderCardProps {
  orderId: string
  date: string
  items: OrderItem[]
  total: number
  status: "pending" | "preparing" | "delivered" | "cancelled"
}

const statusConfig = {
  pending: { label: "Pending", className: "bg-yellow-500 text-white hover:bg-yellow-600" },
  preparing: { label: "Preparing", className: "bg-blue-500 text-white hover:bg-blue-600" },
  delivered: { label: "Delivered", className: "bg-green-500 text-white hover:bg-green-600" },
  cancelled: { label: "Cancelled", className: "bg-red-500 text-white hover:bg-red-600" },
}

export function OrderCard({ orderId, date, items, total, status }: OrderCardProps) {
  const statusInfo = statusConfig[status]

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Order #{orderId}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
          <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-foreground">
                {item.quantity}x {item.name}
              </span>
              <span className="font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-border pt-2">
            <div className="flex justify-between font-semibold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
