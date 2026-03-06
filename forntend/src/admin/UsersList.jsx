import { useAuth } from '../context/AuthContext.jsx'

export default function UsersList() {
  const { users } = useAuth()
  return (
    <div>
      <h3 className="mb-4">Users</h3>
      <div className="grid">
        {users.map((u) => (
          <div key={u.id} className="card">
            <div className="card-title">{u.name}</div>
            <div className="card-subtitle">{u.email}</div>
            <div>Role: {u.role}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
