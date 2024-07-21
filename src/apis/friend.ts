import request from './http'

/**
 * @description 获取好友列表
 * @param page 页码
 * @param per_page 每页数量
 */
export const getFriendList = () => {
  return request.get('/friends/get_friend_list')
}

/**
 * @description 获取好友请求
 */
export const getFriendRequest = () => {
  return request.get('/friends/get_friend_request')
}

/**
 * @description 发送好友请求
 * @param friend_id 好友id
 */
export const sendFriendRequest = (data) => {
  return request.post('/friends/add_friend', data)
}

/**
 * @description 处理好友请求
 * @param sender_id 发送者id
 * @param respond 响应结果
 */
export const handleFriendRequest = (data) => {
  return request.post('/friends/respond_to_friend', data)
}

/**
 * @description 搜索用户
 * @param keyword 关键字
 * @param page 页码
 * @param per_page 每页数量
 */
export const searchPeople = (params) => {
  return request.get('/friends/search_user', params)
}

/**
 * @description 搜索用户
 * @param keyword 关键字
 */
export const searchUser = (params) => {
  return request.get('/friends/search_friend', params)
}

/**
 * @description 获取好友信息
 * @param user_id 用户id
 */
export const getFriendInfo = (user_id:string) => {
  return request.get('/friends/get_friend_info', {
    user_id
  })
}