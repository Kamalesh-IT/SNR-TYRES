import { useAuth } from '../context/AuthContext.jsx'
import { useOrders } from '../context/OrderContext.jsx'

export default function Orders() {
  const { user } = useAuth()
  const { getOrdersByUser } = useOrders()
  if (!user) return <div className="text-center" style={{ padding: '2rem' }}>Please login to view your orders.</div>
  const orders = getOrdersByUser(user.id)
  return (
    <div className="max-w-md">
      <h2 className="mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <div className="card text-center" style={{ padding: '2rem' }}>No orders yet.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((o) => (
            <div key={o.id} className="card">
              <div className="flex justify-between items-center mb-4">
                <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                  {new Date(o.createdAt).toLocaleDateString()}
                </div>
                <span className={`badge ${o.status === 'Delivered' ? 'success' : o.status === 'Shipped' ? 'warning' : 'secondary'}`}>
                  {o.status}
                </span>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Items</div>
                {o.items.map((i) => (
                  <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                    <span>Product ID: {i.id}</span>
                    <span>x{i.qty}</span>
                  </div>
                ))}
              </div>
              <div className="card-footer">
                <span style={{ fontWeight: 500 }}>Total Amount</span>
                <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>${o.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

