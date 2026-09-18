import { Outlet } from 'react-router-dom'
import NavBar from '@/components/navbar/navbar'
import Footer from './components/footer'

export default function App() {

  const dataImported = true

  return (
     <div>
      <main className="min-h-screen bg-gray-50">
        <NavBar
          dataImported={dataImported}
        />
        <Outlet />
        <Footer />
      </main>
    </div>
  )
}
