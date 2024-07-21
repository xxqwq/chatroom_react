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
      if (localStorage.getItem('access_token')) {
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
      }
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    this.instance.interceptors.response.use((res) => {
      if (res.data.code == 200) {
        if (res.data.message !== '获取成功') message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
      return res.data
    }, (error) => {
      console.log(error);
      let code = error.response.data.code
      let msg = error.response.data.message
      if (!msg) {
        switch (code) {
          case 401:
            message.error('请先登录')
            break
          case 403:
            message.error('权限不足')
            break
          case 404:
            message.error('请求资源不存在')
            break
          default:
            message.error('未知错误')
        }
      }else {
        message.error(msg)
      }
      return Promise.reject(msg)
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

  delete<T>(url: string, data: T): Promise<any> {
    return this.instance.delete(url, data)
  }

  post_img<T>(url: string, data: T): Promise<any> {
    return this.instance.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default new HttpRequest()