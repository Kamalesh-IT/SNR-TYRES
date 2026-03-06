import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '80vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1580273916550-e323be2ebdd9?q=80&w=2670&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        marginTop: '-80px', // Pull behind the transparent header if applicable
        paddingTop: '80px'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <h1 className="animate-fade-in" style={{ fontSize: '4rem', marginBottom: '1.5rem', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
            PREMIUM PERFORMANCE<br />
            <span style={{ color: 'var(--primary)' }}>WHEELS & TYRES</span>
          </h1>
          <p className="hero-subtitle mb-8" style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 2.5rem', color: 'rgba(255,255,255,0.8)' }}>
            Elevate your driving experience with our engineered collection of high-performance tyres and luxury alloy wheels. Durability, safety, and style in every rotation.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/tyres" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              EXPLORE PRODUCTS
            </Link>
            <Link to="/tyres" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderColor: 'white', color: 'white' }}>
              VIEW CATALOG
            </Link>
          </div>
        </div>
      </div>

      {/* Product Categories (New Arrivals / Popular) */}
      <div className="section" style={{ padding: '6rem 0', background: 'var(--bg)' }}>
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 style={{ marginBottom: '0.5rem' }}>Renner Series</h2>
              <p style={{ color: 'var(--text-muted)' }}>Exclusive lightweight alloy composites.</p>
            </div>
            <Link to="/tyres" style={{ color: 'var(--primary)', fontWeight: 600 }}>View All Items &rarr;</Link>
          </div>

          <div className="grid">
            {/* Card 1 */}
            <div className="card" style={{ background: 'var(--surface-highlight)', border: 'none' }}>
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ height: '200px', background: 'radial-gradient(circle at center, #333 0%, transparent 70%)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '5rem', opacity: 0.5 }}>🏎️</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Renner Sport+</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>Ultra-lightweight forged alloy.</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="price">$399.00</span>
                  <button className="btn btn-primary btn-sm">ORDER NOW</button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card" style={{ background: 'var(--surface-highlight)', border: 'none' }}>
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ height: '200px', background: 'radial-gradient(circle at center, #333 0%, transparent 70%)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '5rem', opacity: 0.5 }}>🔘</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Renner Basic</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>Standard durable alloy finish.</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="price">$159.00</span>
                  <button className="btn btn-primary btn-sm">ORDER NOW</button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card" style={{ background: 'var(--surface-highlight)', border: 'none' }}>
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ height: '200px', background: 'radial-gradient(circle at center, #333 0%, transparent 70%)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '5rem', opacity: 0.5 }}>🌑</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Nibiru Dark</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>Matte black performance rim.</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="price">$289.00</span>
                  <button className="btn btn-primary btn-sm">ORDER NOW</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="section" style={{ padding: '6rem 0', background: 'var(--surface)' }}>
        <div className="container">
          <div className="grid" style={{ alignItems: 'center', gap: '4rem' }}>
            <div>
              <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Why Choose Us</h2>
              <p className="mb-8" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                We combine cutting-edge technology with premium materials to deliver wheels that perform as good as they look. Our commitment to quality ensures safety and style for every mile.
              </p>

              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="flex items-center gap-4">
                  <div style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>✓</div>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>High-Quality Alloy</h4>
                    <p style={{ fontSize: '0.875rem', margin: 0 }}>Premium grade materials</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>✓</div>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>Modern Design</h4>
                    <p style={{ fontSize: '0.875rem', margin: 0 }}>Aerodynamic styling</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>✓</div>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>Light & Strong</h4>
                    <p style={{ fontSize: '0.875rem', margin: 0 }}>Optimized weight ratio</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>✓</div>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>Heat Resistant</h4>
                    <p style={{ fontSize: '0.875rem', margin: 0 }}>Tracking performance</p>
                  </div>
                </div>
              </div>

              <Link to="/about" className="btn btn-primary mt-4" style={{ marginTop: '3rem' }}>ABOUT US</Link>
            </div>

            <div style={{
              height: '500px',
              background: 'linear-gradient(45deg, #1a1a1a, #262626)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Abstract car/wheel imagery placeholder */}
              <div style={{
                position: 'absolute',
                width: '120%',
                height: '100%',
                background: 'radial-gradient(circle at 70% 30%, var(--primary) 0%, transparent 40%)',
                opacity: 0.1
              }}></div>
              <span style={{ fontSize: '8rem', opacity: 0.8 }}>🏎️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Compatibility */}
      <div className="section" style={{ padding: '6rem 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div className="container text-center">
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>We are ready for</p>
          <div className="flex justify-center gap-8 flex-wrap" style={{ marginTop: '2rem' }}>
            <div className="flex flex-col items-center gap-2" style={{ width: '100px' }}>
              <span style={{ fontSize: '2rem', color: 'var(--text)' }}>🚲</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Cycle</span>
            </div>
            <div className="flex flex-col items-center gap-2" style={{ width: '100px' }}>
              <span style={{ fontSize: '2rem', color: 'var(--text)' }}>🏍️</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Bike</span>
            </div>
            <div className="flex flex-col items-center gap-2" style={{ width: '100px' }}>
              <span style={{ fontSize: '2rem', color: 'var(--text)' }}>🚗</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Car</span>
            </div>
            <div className="flex flex-col items-center gap-2" style={{ width: '100px' }}>
              <span style={{ fontSize: '2rem', color: 'var(--text)' }}>🚐</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Bus</span>
            </div>
            <div className="flex flex-col items-center gap-2" style={{ width: '100px' }}>
              <span style={{ fontSize: '2rem', color: 'var(--text)' }}>🚛</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Truck</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
