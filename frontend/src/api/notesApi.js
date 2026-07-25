import API from './authApi'

export const notesApi = {
  getAll: async () => {
    const res = await API.get('/notes')
    return res.data
  },

  getById: async (id) => {
    const res = await API.get(`/notes/${id}`)
    return res.data
  },

  create: async (note) => {
    const res = await API.post('/notes', note)
    return res.data
  },

  update: async (id, note) => {
    const res = await API.put(`/notes/${id}`, note)
    return res.data
  },

  delete: async (id) => {
    const res = await API.delete(`/notes/${id}`)
    return res.data
  },

  search: async (query) => {
    const res = await API.get(`/notes/search?q=${query}`)
    return res.data
  },
}