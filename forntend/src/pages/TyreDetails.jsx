import { useParams } from 'react-router-dom'
import { useProducts } from '../context/ProductContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function TyreDetails() {
  const { id } = useParams()
  const { getById } = useProducts()
  const { addToCart } = useCart()
  const tyre = getById(id)
  if (!tyre) return <div className="text-center mt-4">Tyre not found.</div>
  return (
    <div className="max-w-md">
      <div className="card">
        <div className="card-title">{tyre.name}</div>
        <div className="card-subtitle">
          {tyre.brand} • {tyre.size} • {tyre.vehicleType}
        </div>
        <div className="price mt-4 mb-4">${tyre.price}</div>
        <div className="mb-4">
          <span className={tyre.stock > 0 ? "badge success" : "badge danger"}>
            {tyre.stock > 0 ? `${tyre.stock} in stock` : 'Out of Stock'}
          </span>
        </div>
        <button onClick={() => addToCart(tyre, 1)} disabled={tyre.stock <= 0} className="w-full">
          {tyre.stock > 0 ? 'Add to Cart' : 'Sold Out'}
        </button>
      </div>
    </div>
  )
}
