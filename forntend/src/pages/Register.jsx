import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const { register } = useAuth()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      register({ name, email, password })
      nav('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md">
      <div className="card">
        <h3 className="card-title text-center" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Create Account</h3>
        <form onSubmit={onSubmit}>
          <div>
            <label>Full Name</label>
            <input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Email</label>
            <input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input placeholder="Choose a password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" style={{ marginTop: '0.5rem' }}>Register</button>
          {error && <div className="text-danger text-center">{error}</div>}
        </form>
      </div>
    </div>
  )
}

