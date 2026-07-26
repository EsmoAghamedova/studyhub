import API from './AuthApi'

export const sessionsApi = {
  create: async (session) => {
    const res = await API.post('/sessions', session)
    return res.data
  },

  getAll: async () => {
    const res = await API.get('/sessions')
    return res.data
  },

  getLeaderboard: async () => {
    const res = await API.get('/leaderboard')
    return res.data
  },
}