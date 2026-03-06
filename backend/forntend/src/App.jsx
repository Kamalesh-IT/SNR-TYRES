import './App.css'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'
import HomePage from './pages/HomePage.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import TyreList from './pages/TyreList.jsx'
import TyreDetails from './pages/TyreDetails.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Orders from './pages/Orders.jsx'
import AdminLogin from './admin/AdminLogin.jsx'
import Dashboard from './admin/Dashboard.jsx'
import AddTyre from './admin/AddTyre.jsx'
import ManageTyres from './admin/ManageTyres.jsx'
import OrdersList from './admin/OrdersList.jsx'
import UsersList from './admin/UsersList.jsx'

function Header() {
  const { user, logout } = useAuth()
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', textDecoration: 'none', color: 'var(--primary)' }}>
          SNR Tyres
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/tyres" className="nav-link">Tyres</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
        </nav>
        <div className="nav-right">
          {user ? (
            <>
              <Link to="/orders" className="nav-link">Orders</Link>
              <span style={{ fontSize: '0.875rem' }}>{user.name}</span>
              <button onClick={logout} className="secondary" style={{ padding: '0.25rem 0.75rem' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
          <div style={{ width: 1, height: 24, background: '#eee', margin: '0 8px' }}></div>
          <Link to="/admin/login" className="nav-link" style={{ fontSize: '0.875rem' }}>Admin</Link>
        </div>
      </div>
    </header>
  )
}

function AdminRoute({ children }) {
  const { user } = useAuth()
  if (!user || user.role !== 'admin') return <Navigate to="/admin/login" replace />
  return children
}

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <BrowserRouter>
              <Header />
              <div className="container page-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/tyres" element={<TyreList />} />
                  <Route path="/tyres/:id" element={<TyreDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />

                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin/dashboard"
                    element={
                      <AdminRoute>
                        <Dashboard />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/tyres/add"
                    element={
                      <AdminRoute>
                        <AddTyre />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/tyres"
                    element={
                      <AdminRoute>
                        <ManageTyres />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <AdminRoute>
                        <OrdersList />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/users"
                    element={
                      <AdminRoute>
                        <UsersList />
                      </AdminRoute>
                    }
                  />
                </Routes>
              </div>
            </BrowserRouter>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App
