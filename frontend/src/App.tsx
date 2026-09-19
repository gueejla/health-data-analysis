import { Outlet } from 'react-router-dom'
import NavBar from '@/components/navbar/navbar'
import Footer from './components/footer/footer'

export default function App() {
  return (
    <div>
      <main className="min-h-screen bg-gray-100 flex flex-col">
        <NavBar />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  )
}
