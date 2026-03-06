import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-title">Digital Tyre Purchase</h1>
        <p className="hero-subtitle">
          The best place to browse, filter, and order tyres online. Find the perfect fit for your vehicle today.
        </p>
        <div className="flex justify-center gap-4" style={{centerAlign: 'center'}}>
          <Link to="/tyres">
            <button style={{ fontSize: '1.1rem', padding: '0.75rem 1.5rem' }}>Explore Tyres</button>
          </Link>
          <Link to="/register">
            <button className="secondary" style={{ fontSize: '1.1rem', padding: '0.75rem 1.5rem' }}>Join Now</button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="section">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="grid">
            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚚</div>
              <h3 className="card-title">Fast Delivery</h3>
              <p className="card-subtitle">We deliver your tyres directly to your doorstep or preferred fitter within 24 hours.</p>
            </div>
            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
              <h3 className="card-title">Best Prices</h3>
              <p className="card-subtitle">We offer competitive pricing on all major brands with a price match guarantee.</p>
            </div>
            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔧</div>
              <h3 className="card-title">Expert Support</h3>
              <p className="card-subtitle">Our team of tyre experts is available to help you choose the right product.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <div className="grid">
            <Link to="/tyres" className="card text-center" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚗</div>
              <h3 className="card-title">Car Tyres</h3>
              <p className="card-subtitle">High performance and economy tyres for every car.</p>
              <div style={{ color: 'var(--primary)', fontWeight: 600 }}>Shop Now →</div>
            </Link>
            <Link to="/tyres" className="card text-center" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏍️</div>
              <h3 className="card-title">Bike Tyres</h3>
              <p className="card-subtitle">Top brands for street, sport, and off-road bikes.</p>
              <div style={{ color: 'var(--primary)', fontWeight: 600 }}>Shop Now →</div>
            </Link>
            <Link to="/tyres" className="card text-center" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚛</div>
              <h3 className="card-title">Truck Tyres</h3>
              <p className="card-subtitle">Durable tyres for commercial and heavy-duty use.</p>
              <div style={{ color: 'var(--primary)', fontWeight: 600 }}>Shop Now →</div>
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="section">
        <div className="container">
          <div className="card">
            <h2 className="section-title">About SNR Tyres</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
              <div>
                <h3 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your Trusted Partner for Quality Tyres</h3>
                <p className="mb-4">
                  SNR Tyres has been a leader in the automotive industry for over a decade. We specialize in providing high-quality tyres for all types of vehicles, ensuring safety, performance, and durability on every journey.
                </p>
                <p className="mb-4">
                  Our mission is to make tyre purchasing simple and accessible. With our digital platform, you can browse hundreds of options, compare specifications, and have them delivered right to your door.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.5rem' }}>
                  <li className="flex items-center gap-2">✅ Authorized Dealer for Top Brands</li>
                  <li className="flex items-center gap-2">✅ 24/7 Customer Support</li>
                  <li className="flex items-center gap-2">✅ 100% Satisfaction Guarantee</li>
                </ul>
              </div>
              <div style={{ background: 'var(--bg)', height: '100%', minHeight: '300px', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)' }}>
                [Company Image / Storefront Placeholder]
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="section text-center">
        <div className="container">
          <h2 className="mb-4">Ready to upgrade your ride?</h2>
          <p className="mb-4 text-light">Create an account to track your orders and get exclusive deals.</p>
          <Link to="/register">
            <button style={{ fontSize: '1.25rem', padding: '1rem 2rem' }}>Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
