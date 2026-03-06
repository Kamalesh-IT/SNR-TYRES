import { useOrders } from '../context/OrderContext.jsx'

export default function OrdersList() {
  const { orders, updateOrderStatus } = useOrders()
  return (
    <div>
      <h3 className="mb-4">Customer Orders</h3>
      {orders.length === 0 ? (
        <div className="text-center">No orders found.</div>
      ) : (
        <div className="grid">
          {orders.map((o) => (
            <div key={o.id} className="card">
              <div className="card-title">Order {o.id}</div>
              <div className="card-subtitle">Status: {o.status}</div>
              <div><strong>Total:</strong> ${o.total.toFixed(2)}</div>
              <div className="card-footer">
                <div className="flex gap-4">
                  <button onClick={() => updateOrderStatus(o.id, 'Pending')}>Pending</button>
                  <button onClick={() => updateOrderStatus(o.id, 'Shipped')}>Shipped</button>
                  <button onClick={() => updateOrderStatus(o.id, 'Delivered')}>Delivered</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
