import http from './http'

// 登录
export const reqLogin = (username, password) => http('/login', { username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => http('/manage/user/add', user, 'POST')