import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function AdminLogin() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('admin@snr-tyres.local')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      login({ email, password, admin: true })
      nav('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md">
      <div className="card">
        <h3 className="card-title text-center" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Admin Portal</h3>
        <form onSubmit={onSubmit}>
          <div>
            <label>Email Address</label>
            <input placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" style={{ marginTop: '0.5rem' }}>Login to Dashboard</button>
          {error && <div className="text-danger text-center">{error}</div>}
        </form>
      </div>
    </div>
  )
}

