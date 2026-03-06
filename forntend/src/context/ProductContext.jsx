import { createContext, useContext, useEffect, useState } from 'react'

const ProductContext = createContext(null)

function readLS(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

function writeLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

const seedTyres = [
  {
    id: 't-1',
    brand: 'Michelin',
    size: '195/65 R15',
    vehicleType: 'Car',
    price: 120,
    stock: 10,
    image: '',
    name: 'Michelin Energy Saver',
  },
  {
    id: 't-2',
    brand: 'Bridgestone',
    size: '205/55 R16',
    vehicleType: 'Car',
    price: 140,
    stock: 8,
    image: '',
    name: 'Bridgestone Turanza',
  },
  {
    id: 't-3',
    brand: 'Apollo',
    size: '100/90 R17',
    vehicleType: 'Bike',
    price: 60,
    stock: 25,
    image: '',
    name: 'Apollo Actigrip',
  },
]

export function ProductProvider({ children }) {
  const [tyres, setTyres] = useState(() => {
    const existing = readLS('tyres', null)
    return existing && Array.isArray(existing) ? existing : seedTyres
  })

  useEffect(() => {
    writeLS('tyres', tyres)
  }, [tyres])

  function addTyre(t) {
    const tyre = { ...t, id: crypto.randomUUID() }
    setTyres((prev) => [tyre, ...prev])
  }

  function updateTyre(id, patch) {
    setTyres((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)))
  }

  function deleteTyre(id) {
    setTyres((prev) => prev.filter((t) => t.id !== id))
  }

  function getById(id) {
    return tyres.find((t) => t.id === id)
  }

  const value = { tyres, addTyre, updateTyre, deleteTyre, getById }
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProducts() {
  return useContext(ProductContext)
}

