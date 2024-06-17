import request from './http'

/**
 * @description 获取用户信息
 */
export function getUserInfo() {
  return request.get('/auth/get_profile')
}

/**
 * @description 修改密码
 */
export function changePassword<T>(data: T) {
  return request.post('/auth/change_password', data)
}

/**
 * 修改个人信息
 */
export function changeProfile<T>(data: T) {
  return request.post('/auth/edit_profile', data)
}

/**
 * 上传头像
 */
export function uploadAvatar<T>(data: T) {
  return request.post_img('/upload/upload_img', data)
}