/* 
封装axio请求函数模块
1.优化: 统一处理请求异常
    在外层包一个自己创建的promise对象
    在请求出错时，不reject(error), 而是显示错误提示
*/

import axios from 'axios'
import { message } from 'antd'

export default function http(url, data={}, type='GET') {
    return new Promise((resolve, reject) => {
        
            let promise

            // 1.执行异步ajax请求
            if(type === 'GET') {
                promise = axios.get(url, {
                    params: data // 指定请求参数
                })
            }
        
            if(type === 'POST') {
                promise = axios.post(url, data)
            }
            
            
            promise.then(response => {
                // 2.如果成功了，调用resolve
                resolve(response.data)
            }).catch(error => {
                // 3.如果失败了，不调用reject，而是显示异常信息
                message.error('请求出错:' + error.message)
            })
    }) 

}