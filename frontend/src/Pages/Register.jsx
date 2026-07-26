import { useState } from "react"
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authApi } from '../API/AuthApi'

export function Register() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try{
            //call the backend API to register
            const data = await authApi.register(username, email, password)

            //save the JWT token and user data to context/loacalStorage
            login(data.user, data.access_token)

            //Redirect to dashboard on success
            navigate('/dashboard')
        }catch(err){
            //show error message from backend, or a generic one
            setError(err.response?.data?.message || 'Registration Failed.Please try again')
        }finally{
            setLoading(false)
        }
    }

    return (
<div className="min-h-screen bg-page-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-surface-muted-bg rounded-2xl mb-4 border border-surface-muted-fg/20">
            <span className="text-3xl">🎓</span>
          </div>
          <h1 className="text-3xl font-bold text-page-fg">
            Join StudyHub 🚀
          </h1>
          <p className="text-surface-muted-fg mt-2">
            Start your journey to academic excellence
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-surface-bg rounded-2xl p-8 shadow-xl border border-surface-muted-bg">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Error Message */}
            {error && (
              <div className="bg-danger-color/10 border border-danger-color/30 text-danger-color px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-surface-fg mb-1.5">
                👤 Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface-muted-bg text-surface-fg border border-surface-muted-fg/30 focus:border-accent-bg focus:ring-1 focus:ring-accent-bg outline-none transition-all placeholder:text-surface-muted-fg/50"
                placeholder="Choose a cool username"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-surface-fg mb-1.5">
                📧 Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface-muted-bg text-surface-fg border border-surface-muted-fg/30 focus:border-accent-bg focus:ring-1 focus:ring-accent-bg outline-none transition-all placeholder:text-surface-muted-fg/50"
                placeholder="you@university.edu"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-surface-fg mb-1.5">
                🔒 Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface-muted-bg text-surface-fg border border-surface-muted-fg/30 focus:border-accent-bg focus:ring-1 focus:ring-accent-bg outline-none transition-all placeholder:text-surface-muted-fg/50"
                placeholder="At least 6 characters"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold bg-accent-bg text-accent-fg hover:bg-primary-bg hover:text-primary-fg transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span> Creating account...
                </>
              ) : (
                '✨ Create Account'
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-surface-muted-fg">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-accent-bg font-semibold hover:text-primary-bg transition-colors"
              >
                Login here 🔑
              </Link>
            </p>
          </div>
        </div>

        {/* Fun stats footer */}
        <div className="flex justify-center gap-6 mt-8 text-xs text-surface-muted-fg/60">
          <span>📝 Unlimited Notes</span>
          <span>🍅 Pomodoro Timer</span>
          <span>🏆 Leaderboard</span>
        </div>
      </div>
    </div>
 
    )
}