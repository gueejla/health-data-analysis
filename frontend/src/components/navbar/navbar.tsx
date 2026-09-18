import { NavLink } from 'react-router-dom'

type Props = {
  dataImported: boolean;
};

export default function NavBar({dataImported}: Props) {
  return (
    <div className="flex items-center justify-between bg-teal-100/50 drop-shadow-md">
      <a href="/" className="text-xl font-bold text-gray-700 px-20">Health Data Analysis</a>
      <nav className="p-7 flex gap-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'font-bold text-teal-600' : 'text-gray-700'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? 'font-bold text-teal-600' : 'text-gray-700'
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/upload"
          className={({ isActive }) =>
            isActive ? 'font-bold text-teal-600' : 'text-gray-700'
          }
        >
          Upload
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'font-bold text-teal-600' : 'text-gray-700'
          }
        >
          About
        </NavLink>
      </nav>
    </div>
  )}