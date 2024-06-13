import request from './http'

/**
 * @description 登录
 * @returns 
 */
export function login<T>(data: T) {
  return request.post('/auth/login', data)
}

/**
 * @description 注册
 * @returns 
 */
export function register<T>(data: T) {
  return request.post('/auth/register', data)
}

/**
 * @description 发送验证码
 */

export function sendCode<T>(data: T) {
  return request.post('/auth/send_email', data)
}

/**
 * @description 退出登录
 */
export function logout() {
  return request.post('/auth/logout')
}