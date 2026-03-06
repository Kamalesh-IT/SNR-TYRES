import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext.jsx'
import { useProducts } from './ProductContext.jsx'

const OrderContext = createContext(null)

function readLS(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

function writeLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => readLS('orders', []))
  const { user } = useAuth()
  const { updateTyre } = useProducts()

  useEffect(() => {
    writeLS('orders', orders)
  }, [orders])

  function placeOrder(items, total) {
    if (!user) throw new Error('Login required')
    const order = {
      id: crypto.randomUUID(),
      userId: user.id,
      items: items.map((i) => ({ id: i.product.id, qty: i.qty, price: i.product.price })),
      total,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }
    setOrders((prev) => [order, ...prev])
    // decrease stock
    items.forEach((i) => updateTyre(i.product.id, { stock: Math.max(0, i.product.stock - i.qty) }))
    return order
  }

  function getOrdersByUser(userId) {
    return orders.filter((o) => o.userId === userId)
  }

  function updateOrderStatus(id, status) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  const value = { orders, placeOrder, getOrdersByUser, updateOrderStatus }
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useOrders() {
  return useContext(OrderContext)
}

