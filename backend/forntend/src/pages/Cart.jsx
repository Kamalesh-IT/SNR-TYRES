import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const { items, removeFromCart, total } = useCart()
  const nav = useNavigate()
  return (
    <div className="max-w-md">
      <h2 className="mb-4">Shopping Cart</h2>
      {items.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <p>Your cart is currently empty.</p>
          <Link to="/tyres">
            <button>Browse Tyres</button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {items.map((i) => (
              <div key={i.product.id} className="list-item" style={{ margin: 0, border: 'none', borderBottom: '1px solid var(--border)', borderRadius: 0 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{i.product.name}</div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
                    {i.qty} x ${i.product.price}
                  </div>
                </div>
                <div style={{ fontWeight: 600 }}>${(i.qty * i.product.price).toFixed(2)}</div>
                <button className="danger" onClick={() => removeFromCart(i.product.id)} style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
                  Remove
                </button>
              </div>
            ))}
            <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <div style={{ fontSize: '1.1rem' }}>Total</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>${total.toFixed(2)}</div>
            </div>
          </div>
          <button onClick={() => nav('/checkout')} style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}

