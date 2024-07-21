import request from './http'

/**
 * @description 获取消息
 * @param user_id 用户id
 * @param friend_id 接收者id
 * @param page 页码
 * @param per_page 每页数量
 */
export const getChatHistory = (params: any) => {
  return request.get('/chat/get_history', params)
}