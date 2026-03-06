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
import Footer from './components/Footer.jsx'

function Header() {
  const { user, logout } = useAuth()
  return (
    <header className="header">
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.03em', color: 'white', marginRight: 'auto' }}>
          SNR <span style={{ color: 'var(--primary)' }}>Tyres</span>
        </Link>
        <nav className="nav-links" style={{ gap: '2rem' }}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/tyres" className="nav-link">Tyres</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginLeft: '3rem' }}>
          {user ? (
            <>
              <Link to="/orders" className="nav-link">Orders</Link>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>{user.name}</span>
              <button onClick={logout} className="btn btn-secondary btn-sm">LOGOUT</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm" style={{ textDecoration: 'none' }}>Register</Link>
            </>
          )}
          <div style={{ width: 1, height: 24, background: 'var(--border)', margin: '0 8px' }}></div>
          <Link to="/admin/login" className="nav-link" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ADMIN</Link>
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
              <Footer />
            </BrowserRouter>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App
