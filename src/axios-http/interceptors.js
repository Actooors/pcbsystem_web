import axios from 'axios'

axios.interceptors.request.use((config)=>{
  console.log("config",config)
  return config
},(error)=>{
  console.log("error",error)
  return Promise.reject(error)
})
