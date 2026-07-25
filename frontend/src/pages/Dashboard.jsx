import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Timer from '../components/Timer'
import { sessionsApi } from '../api/sessionsApi'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [stats, setStats] = useState({
    totalTime: 0,
    streak: 0,
    topSubject: 'N/A',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const sessions = await sessionsApi.getAll()
      const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0)
      const totalHours = Math.round(totalMinutes / 60)

      // Calculate top subject
      const subjectMap = {}
      sessions.forEach((s) => {
        subjectMap[s.subject] = (subjectMap[s.subject] || 0) + s.duration
      })
      const topSubject = Object.entries(subjectMap).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'

      // Simple streak calculation (consecutive days)
      const uniqueDays = [...new Set(sessions.map((s) => s.created_at?.split('T')[0]))]
      const streak = calculateStreak(uniqueDays)

      setStats({ totalTime: totalHours, streak, topSubject })
    } catch (err) {
      console.error('Failed to load dashboard:', err)
    } finally {
      setLoading(false)
    }
  }

  const calculateStreak = (days) => {
    if (days.length === 0) return 0
    const sorted = days.sort().reverse()
    let streak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < sorted.length; i++) {
      const expected = new Date(today)
      expected.setDate(expected.getDate() - i)
      if (sorted[i] === expected.toISOString().split('T')[0]) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', emoji: '🏠', active: true },
    { to: '/notes', label: 'Notes', emoji: '📝' },
    { to: '/leaderboard', label: 'Leaderboard', emoji: '🏆' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span className="text-xl font-extrabold text-gray-900">StudyHub</span>
          </Link>

          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  link.active
                    ? 'bg-brand-100 text-brand-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.emoji} {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              👋 Hey, <span className="font-semibold text-gray-800">{user?.username}</span>
            </span>
            <button
              onClick={logout}
              className="text-sm text-red-400 hover:text-red-600 font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-brand-600 to-purple-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold mb-2">
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}! ☀️
            </h1>
            <p className="text-brand-100 text-lg">
              Let's make today productive. You've got this! 💪
            </p>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl opacity-20">
            🎯
          </div>
        </div>


        {/* Timer + Quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Timer />

          <div className="card">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              ⚡ Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                to="/notes"
                className="flex items-center gap-3 p-4 rounded-xl bg-brand-50 hover:bg-brand-100 transition-colors group"
              >
                <span className="text-2xl">📝</span>
                <div>
                  <p className="font-semibold text-gray-800 group-hover:text-brand-700">
                    Create a Note
                  </p>
                  <p className="text-sm text-gray-500">
                    Capture your thoughts and ideas
                  </p>
                </div>
                <span className="ml-auto text-gray-400 group-hover:text-brand-600">→</span>
              </Link>

              <Link
                to="/notes"
                className="flex items-center gap-3 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group"
              >
                <span className="text-2xl">🔍</span>
                <div>
                  <p className="font-semibold text-gray-800 group-hover:text-green-700">
                    Browse Notes
                  </p>
                  <p className="text-sm text-gray-500">
                    Review and search your study materials
                  </p>
                </div>
                <span className="ml-auto text-gray-400 group-hover:text-green-600">→</span>
              </Link>

              <Link
                to="/leaderboard"
                className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors group"
              >
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-semibold text-gray-800 group-hover:text-amber-700">
                    View Leaderboard
                  </p>
                  <p className="text-sm text-gray-500">
                    See how you rank against others
                  </p>
                </div>
                <span className="ml-auto text-gray-400 group-hover:text-amber-600">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}