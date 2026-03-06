import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

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

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readLS('authUser', null))
  const [users, setUsers] = useState(() => readLS('users', []))

  useEffect(() => {
    writeLS('users', users)
  }, [users])

  useEffect(() => {
    writeLS('authUser', user)
  }, [user])

  function register({ name, email, password }) {
    const exists = users.find((u) => u.email === email)
    if (exists) throw new Error('Email already registered')
    const newUser = { id: crypto.randomUUID(), name, email, password, role: 'user' }
    setUsers((prev) => [...prev, newUser])
    setUser(newUser)
    return newUser
  }

  function login({ email, password, admin }) {
    // bootstrap default admin and default demo user
    let currentUsers = users
    if (!currentUsers.find((u) => u.role === 'admin')) {
      const defaultAdmin = {
        id: 'admin-1',
        name: 'Administrator',
        email: 'admin@snr-tyres.local',
        password: 'admin123',
        role: 'admin',
      }
      currentUsers = [...currentUsers, defaultAdmin]
    }

    // add a default demo user with credentials: email 'snr' password 'snr'
    if (!currentUsers.find((u) => u.email === 'snr')) {
      const demoUser = {
        id: 'user-snr',
        name: 'snr',
        email: 'snr',
        password: 'snr',
        role: 'user',
      }
      currentUsers = [...currentUsers, demoUser]
    }

    // persist any newly added users
    if (currentUsers !== users) setUsers(currentUsers)
    const found = currentUsers.find((u) => u.email === email && u.password === password)
    if (!found) throw new Error('Invalid credentials')
    if (admin && found.role !== 'admin') throw new Error('Admin access required')
    setUser(found)
    return found
  }

  function logout() {
    setUser(null)
  }

  const value = { user, users, register, login, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
