import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext.jsx'
import { useOrders } from '../context/OrderContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Dashboard() {
  const { tyres } = useProducts()
  const { orders } = useOrders()
  const { users } = useAuth()
  const revenue = orders.reduce((sum, o) => sum + o.total, 0)
  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{tyres.length}</div>
          <div className="stat-label">Total Products</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{orders.length}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{users.length}</div>
          <div className="stat-label">Registered Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${revenue.toFixed(2)}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
      </div>
      <div className="grid">
        <Link to="/admin/tyres" className="card">
          <div className="card-title">Manage Inventory</div>
          <div className="card-subtitle">Update stock, prices, and product details</div>
        </Link>
        <Link to="/admin/tyres/add" className="card">
          <div className="card-title">Add New Product</div>
          <div className="card-subtitle">Create new tyre listings</div>
        </Link>
        <Link to="/admin/orders" className="card">
          <div className="card-title">Manage Orders</div>
          <div className="card-subtitle">View and update order status</div>
        </Link>
        <Link to="/admin/users" className="card">
          <div className="card-title">User Management</div>
          <div className="card-subtitle">View registered customers</div>
        </Link>
      </div>
    </div>
  )
}
