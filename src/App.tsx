import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateClient from './pages/CreateClient'
import CreateInvoice from './pages/CreateInvoice'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients/new" element={<CreateClient />} />
          <Route path="/invoices/new" element={<CreateInvoice />} />
      </Route>
      
    </Routes>
    
  )
}

export default App