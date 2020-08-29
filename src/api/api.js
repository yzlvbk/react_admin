import http from './http'

/* 登录 */
export const reqLogin = (username, password) => http('/login', { username, password}, 'POST')

/* 添加用户 */
export const reqAddUser = (user) => http('/manage/user/add', user, 'POST')

/* 获取一级/二级分类的列表 */
export const reqCategory = (parentId) => http('/manage/category/list', { parentId }, 'GET')

/* 添加分类 */
export const reqAddCategory = (categoryName, parentId) => http('/manage/category/add', { categoryName, parentId }, 'POST')

/* 更新分类 */
export const reqUpdateCategory = (categoryId, categoryName) => http('/manage/category/update', { categoryId, categoryName }, 'POST')