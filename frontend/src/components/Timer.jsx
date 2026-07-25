import { useState, useEffect, useRef } from 'react'
import { sessionsApi } from '../api/sessionsApi'

export default function Timer() {
  const [mode, setMode] = useState('study') // 'study' | 'break'
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [subject, setSubject] = useState('')
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const intervalRef = useRef(null)

  const STUDY_TIME = 25 * 60
  const BREAK_TIME = 5 * 60

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleTimerEnd()
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning, timeLeft])

  const handleTimerEnd = () => {
    setIsRunning(false)
    if (mode === 'study') {
      setSessionsCompleted((prev) => prev + 1)
      // Log session to API
      if (subject) {
        sessionsApi.create({
          subject: subject,
          duration: 25,
        }).catch(console.error)
      }
      // Switch to break
      setMode('break')
      setTimeLeft(BREAK_TIME)
    } else {
      // Switch back to study
      setMode('study')
      setTimeLeft(STUDY_TIME)
    }
  }

  const toggleTimer = () => setIsRunning(!isRunning)

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(mode === 'study' ? STUDY_TIME : BREAK_TIME)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = mode === 'study'
    ? ((STUDY_TIME - timeLeft) / STUDY_TIME) * 100
    : ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100

  return (
    <div className="card text-center">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        🍅 Pomodoro Timer
      </h3>

      {/* Mode indicator */}
      <div className="flex justify-center gap-2 mb-6">
        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
          mode === 'study'
            ? 'bg-brand-100 text-brand-700'
            : 'bg-green-100 text-green-700'
        }`}>
          {mode === 'study' ? '📖 Study Time' : '☕ Break Time'}
        </span>
      </div>

      {/* Timer circle */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="6"
          />
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke={mode === 'study' ? '#8b5cf6' : '#22c55e'}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-800 font-mono">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Subject input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="What are you studying? 🤔"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="input-field text-center text-sm"
        />
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button
          onClick={toggleTimer}
          className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
            isRunning
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-200'
              : 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-200'
          }`}
        >
          {isRunning ? '⏸ Pause' : '▶ Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-2.5 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all"
        >
          🔄 Reset
        </button>
      </div>

      {/* Sessions counter */}
      <p className="mt-4 text-sm text-gray-500">
        🎯 Sessions completed: <span className="font-bold text-brand-600">{sessionsCompleted}</span>
      </p>
    </div>
  )
}