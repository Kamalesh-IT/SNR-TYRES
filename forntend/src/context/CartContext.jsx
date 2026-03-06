import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

function readLS(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    if (!v) return fallback
    const parsed = JSON.parse(v)
    if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback
    return parsed
  } catch {
    return fallback
  }
}

function writeLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readLS('cart', []))

  useEffect(() => {
    writeLS('cart', items)
  }, [items])

  function addToCart(product, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { product, qty }]
    })
  }

  function removeFromCart(productId) {
    setItems((prev) => prev.filter((i) => i.product.id !== productId))
  }

  function clearCart() {
    setItems([])
  }

  const total = useMemo(() => items.reduce((sum, i) => sum + i.product.price * i.qty, 0), [items])

  const value = { items, addToCart, removeFromCart, clearCart, total }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext)
}
