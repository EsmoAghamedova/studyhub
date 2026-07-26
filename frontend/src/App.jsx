import { BrowserRouter, Routes } from 'react-router';
import { PAGE_PATHS } from './Configs/Pages';
import { Dashboard } from './Pages/Dashboard';
import { Leaderboard } from './Pages/Leaderboard';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { Notes } from './Pages/Notes';
import { NoteDetails } from './Pages/NoteDetails';
import { Navbar } from './Components/Navbar';
function App() {
  return (
    <section className='flex gap-4'>
      <BrowserRouter>
        <Navbar />
        <main>

          <Routes path={PAGE_PATHS.dashboard} element={<Dashboard />} />
          <Routes path={PAGE_PATHS.dashboard} element={<NoteDetails />} />
          <Routes path={PAGE_PATHS.dashboard} element={<Notes />} />
          <Routes path={PAGE_PATHS.dashboard} element={<Leaderboard />} />
          <Routes path={PAGE_PATHS.dashboard} element={<Register />} />
          <Routes path={PAGE_PATHS.dashboard} element={<Login />} />

        </main>
      </BrowserRouter>
    </section >
  )
}

export default App
