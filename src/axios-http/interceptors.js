import axios from 'axios'

axios.interceptors.request.use((config) => {
  // console.log("config", config)
  let token = localStorage.getItem('token')
  if (token)
    config.headers.Authorization = token
  return config
}, (error) => {
  console.log("error", error)
  return Promise.reject(error)
})

axios.interceptors.response.use((res) => {
  if (res.status === 401) {
    localStorage.removeItem('token')
    location.path = '/login'
  }
  return res
}, err => {
  console.log("ResponseError", err)
  return Promise.reject(err)
})
