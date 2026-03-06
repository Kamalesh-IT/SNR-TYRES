import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function TyreList() {
  const { tyres } = useProducts()
  const { addToCart } = useCart()
  const [brand, setBrand] = useState('')
  const [size, setSize] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const brands = useMemo(() => Array.from(new Set(tyres.map((t) => t.brand))), [tyres])
  const sizes = useMemo(() => Array.from(new Set(tyres.map((t) => t.size))), [tyres])
  const types = useMemo(() => Array.from(new Set(tyres.map((t) => t.vehicleType))), [tyres])

  const filtered = tyres.filter(
    (t) =>
      (!brand || t.brand === brand) && (!size || t.size === size) && (!vehicleType || t.vehicleType === vehicleType)
  )

  return (
    <div>
      <h2 className="mb-4">Browse Tyres</h2>
      <div className="filters-bar">
        <div className="filter-group">
          <label>Brand</label>
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Size</label>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">All Sizes</option>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Vehicle Type</label>
          <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
            <option value="">All Types</option>
            {types.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid">
        {filtered.map((t) => (
          <div key={t.id} className="card">
            <div className="card-title">{t.name}</div>
            <div className="card-subtitle">
              {t.brand} • {t.size} • {t.vehicleType}
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>
              ${t.price}
            </div>
            <div style={{ fontSize: '0.875rem', color: t.stock > 0 ? 'var(--success)' : 'var(--danger)', marginBottom: '1rem' }}>
              {t.stock > 0 ? `${t.stock} in stock` : 'Out of Stock'}
            </div>
            <div className="card-footer">
              <Link to={`/tyres/${t.id}`} style={{ fontWeight: 500 }}>
                View Details
              </Link>
              <button onClick={() => addToCart(t, 1)} disabled={t.stock <= 0}>
                {t.stock > 0 ? 'Add to Cart' : 'Sold Out'}
              </button>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div className="text-center" style={{ padding: '2rem' }}>No tyres found matching your filters.</div>}
    </div>
  )
}

