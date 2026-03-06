import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useOrders } from '../context/OrderContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const { placeOrder } = useOrders()
  const { user } = useAuth()
  const nav = useNavigate()
  const [error, setError] = useState('')

  function onPay() {
    setError('')
    try {
      if (!user) throw new Error('Please login to place an order')
      if (items.length === 0) throw new Error('Cart is empty')
      placeOrder(items, total)
      clearCart()
      nav('/orders')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md">
      <div className="card text-center">
        <h2 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Checkout</h2>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ color: 'var(--text-light)' }}>Total Amount</div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>${total.toFixed(2)}</div>
        </div>
        <button onClick={onPay} disabled={items.length === 0} style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
          Confirm Payment
        </button>
        {error && <div className="text-danger mt-4">{error}</div>}
      </div>
    </div>
  )
}

