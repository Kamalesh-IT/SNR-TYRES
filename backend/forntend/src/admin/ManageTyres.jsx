import { useProducts } from '../context/ProductContext.jsx'

export default function ManageTyres() {
  const { tyres, updateTyre, deleteTyre } = useProducts()
  return (
    <div>
      <h3 className="mb-4">Manage Tyres</h3>
      <div className="grid">
        {tyres.map((t) => (
          <div key={t.id} className="card">
            <div className="card-title">{t.name}</div>
            <div className="card-subtitle">
              {t.brand} • {t.size} • {t.vehicleType}
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>Price: ${t.price}</div>
              <span className={t.stock > 0 ? 'badge success' : 'badge danger'}>
                {t.stock > 0 ? `Stock: ${t.stock}` : 'Out of Stock'}
              </span>
            </div>
            <div className="card-footer">
              <div className="flex gap-4">
                <button onClick={() => updateTyre(t.id, { stock: t.stock + 1 })}>+ Stock</button>
                <button onClick={() => updateTyre(t.id, { stock: Math.max(0, t.stock - 1) })}>- Stock</button>
              </div>
              <button className="danger" onClick={() => deleteTyre(t.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
