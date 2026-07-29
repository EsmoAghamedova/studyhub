import { BrowserRouter, Routes, Route } from 'react-router';
import { PAGE_PATHS } from './Configs/Pages.js';
import { Dashboard } from './Pages/Dashboard';
import { Leaderboard } from './Pages/Leaderboard';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { Notes } from './Pages/Notes';
import { NoteDetails } from './Pages/NoteDetails';
import { Navbar } from './Components/Navbar';

function App() {
  return (
    <section className='flex flex-col sm:flex-row h-screen w-full
    bg-page-bg text-page-fg'>
      <BrowserRouter>
        <Navbar />
        <main className='flex-1 overflow-y-auto p-6'>
          <Routes>
            <Route path={PAGE_PATHS.dashboard} element={<Dashboard />} />
            <Route path={PAGE_PATHS.noteDetails} element={<NoteDetails />} />
            <Route path={PAGE_PATHS.notes} element={<Notes />} />
            <Route path={PAGE_PATHS.leaderBoard} element={<Leaderboard />} />
            <Route path={PAGE_PATHS.register} element={<Register />} />
            <Route path={PAGE_PATHS.login} element={<Login />} />
          </Routes>
        </main>
      </BrowserRouter>
    </section>
  )
}

export default App