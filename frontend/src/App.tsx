import { Outlet, NavLink } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="p-4 bg-white shadow flex gap-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'font-bold text-blue-600' : 'text-gray-700'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? 'font-bold text-blue-600' : 'text-gray-700'
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/upload"
          className={({ isActive }) =>
            isActive ? 'font-bold text-blue-600' : 'text-gray-700'
          }
        >
          Upload
        </NavLink>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
