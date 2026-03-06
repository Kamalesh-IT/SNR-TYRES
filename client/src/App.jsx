import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import './App.css';

function App() {
  return (
    <ShopProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </Router>
    </ShopProvider>
  );
}

export default App;
