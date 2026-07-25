import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Notes from './pages/Notes'
import NoteDetails from './pages/NoteDetails'
import Leaderboard from './pages/Leaderboard'

function AppRoutes() {
  return (
    <Routes>
      {/* Removed the <ProtectedRoute> wrappers so pages are open to everyone */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/notes/:id" element={<NoteDetails />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      
      {/* Changed the default redirect to go to Dashboard instead of Login */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}