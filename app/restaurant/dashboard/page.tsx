"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Order {
  id: string
  customerName: string
  items: { name: string; quantity: number }[]
  total: number
  time: string
  status: "pending" | "accepted" | "preparing" | "ready" | "rejected"
}

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    items: [
      { name: "Margherita Pizza", quantity: 2 },
      { name: "Caesar Salad", quantity: 1 },
    ],
    total: 34.97,
    time: "5 mins ago",
    status: "pending",
  },
  {
    id: "ORD-002",
    customerName: "Sarah Smith",
    items: [
      { name: "Spaghetti Carbonara", quantity: 1 },
      { name: "Tiramisu", quantity: 2 },
    ],
    total: 28.97,
    time: "12 mins ago",
    status: "accepted",
  },
  {
    id: "ORD-003",
    customerName: "Mike Johnson",
    items: [
      { name: "Lasagna", quantity: 1 },
      { name: "Bruschetta", quantity: 1 },
    ],
    total: 23.98,
    time: "18 mins ago",
    status: "preparing",
  },
  {
    id: "ORD-004",
    customerName: "Emily Brown",
    items: [
      { name: "Margherita Pizza", quantity: 1 },
      { name: "Spaghetti Carbonara", quantity: 1 },
    ],
    total: 27.98,
    time: "25 mins ago",
    status: "ready",
  },
]

const statusConfig = {
  pending: { label: "Pending", className: "bg-yellow-500 text-white hover:bg-yellow-600" },
  accepted: { label: "Accepted", className: "bg-blue-500 text-white hover:bg-blue-600" },
  preparing: { label: "Preparing", className: "bg-purple-500 text-white hover:bg-purple-600" },
  ready: { label: "Ready", className: "bg-green-500 text-white hover:bg-green-600" },
  rejected: { label: "Rejected", className: "bg-red-500 text-white hover:bg-red-600" },
}

export default function RestaurantDashboard() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Restaurant Dashboard</h1>
          <p className="text-muted-foreground">Manage incoming orders and update their status</p>
        </div>

        <div className="grid gap-4">
          {orders.map((order) => {
            const statusInfo = statusConfig[order.status]
            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-foreground">{order.customerName}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Order #{order.id} • {order.time}
                      </p>
                    </div>
                    <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-semibold text-foreground">Items</h4>
                      <ul className="space-y-1 text-sm">
                        {order.items.map((item, index) => (
                          <li key={index} className="text-muted-foreground">
                            {item.quantity}x {item.name}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 font-semibold text-primary">Total: ${order.total.toFixed(2)}</p>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold text-foreground">Update Status</h4>
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value as Order["status"])}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="accepted">Accepted</SelectItem>
                          <SelectItem value="preparing">Preparing</SelectItem>
                          <SelectItem value="ready">Ready</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
