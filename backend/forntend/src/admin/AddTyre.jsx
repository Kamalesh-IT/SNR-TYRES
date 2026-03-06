import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductContext.jsx'

export default function AddTyre() {
  const { addTyre } = useProducts()
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', brand: '', size: '', vehicleType: '', price: '', stock: '' })

  function setField(k, v) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  function onSubmit(e) {
    e.preventDefault()
    const price = Number(form.price)
    const stock = Number(form.stock)
    addTyre({ ...form, price, stock, image: '' })
    nav('/admin/tyres')
  }

  return (
    <div className="max-w-md">
      <div className="card">
        <h2 className="card-title text-center" style={{ marginBottom: '1.5rem' }}>Add New Tyre</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label>Product Name</label>
            <input placeholder="e.g. Michelin Energy Saver" value={form.name} onChange={(e) => setField('name', e.target.value)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label>Brand</label>
              <input placeholder="Brand" value={form.brand} onChange={(e) => setField('brand', e.target.value)} />
            </div>
            <div>
              <label>Size</label>
              <input placeholder="e.g. 195/65 R15" value={form.size} onChange={(e) => setField('size', e.target.value)} />
            </div>
          </div>
          <div>
            <label>Vehicle Type</label>
            <select value={form.vehicleType} onChange={(e) => setField('vehicleType', e.target.value)}>
              <option value="">Select Type</option>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Truck">Truck</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label>Price ($)</label>
              <input placeholder="0.00" type="number" value={form.price} onChange={(e) => setField('price', e.target.value)} />
            </div>
            <div>
              <label>Stock Qty</label>
              <input placeholder="0" type="number" value={form.stock} onChange={(e) => setField('stock', e.target.value)} />
            </div>
          </div>
          <button type="submit" style={{ marginTop: '1rem' }}>Create Product</button>
        </form>
      </div>
    </div>
  )
}

