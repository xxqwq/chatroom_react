import { message } from 'antd'
import axios, { AxiosInstance } from 'axios'

class HttpRequest {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://127.0.0.1:5000',
      timeout: 10 * 1000
    })
    this.interceptors()
  }

  interceptors() {
    this.instance.interceptors.request.use((config) => {
      if(localStorage.getItem('access_token')){
        config.headers['Authorization'] = 'Bearer '+ localStorage.getItem('access_token')
      }
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    this.instance.interceptors.response.use((res) => {
      if (res.data.code == '200') {
        message.success(res.data.message)
      }else{
        message.error(res.data.message)
      }
      return res.data
    }, (error) => {
      return Promise.reject(error)
    })
  }

  get<T>(url: string, params?: T): Promise<any> {
    return this.instance.get(url, {
      params
    })
  }

  post<T>(url: string, data?: T): Promise<any> {
    return this.instance.post(url, data)
  }

  put<T>(url: string, data?: T): Promise<any> {
    return this.instance.put(url, data)
  }

  delete<T>(url: string,data:T): Promise<any> {
    return this.instance.delete(url,data)
  }
}

export default new HttpRequest()