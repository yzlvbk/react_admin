import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect } from 'react-router'

export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        // 如果内存没有存储user ==> 当前没有登录
        if(!user._id) {
            // 自动跳转到登录
            return <Redirect to="/login" />

        }
        return (
            <div>
                hello {user.username}
            </div>
        )
    }
}