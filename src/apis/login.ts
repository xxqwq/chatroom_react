import request from './http'

export function login<T>(data: T) {
  return request.post('/auth/login', data)
}

export function register<T>(data: T) {
  return request.post('/auth/register', data)
}

export function sendCode<T>(data: T) {
  return request.post('/auth/send_email', data)
}