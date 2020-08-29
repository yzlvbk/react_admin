import React, { Component } from 'react'
import './login.less'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin} from '../../api/api.js'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router';

export default class Login extends Component {

    // 点击登录按钮
    onFinish = async values => {
        const { username, password } = values
            //请求成功
            const data  = await reqLogin(username, password)
            if(data.status === 0) {
                // 登录成功
                message.success('登录成功')

                // 保存user
                const user = data.data
                memoryUtils.user = user // 保存在内存中
                storageUtils.saveUser(user)


                // 跳转到管理页面(不需要在回退到登陆页) replace
                this.props.history.replace('/')
            }else {
                // 登录失败
                message.error(data.msg)
            }
            console.log(this.props)

        
      };

    render() {
        // 如果用户已经登陆，自动跳转到管理页面
        const user = memoryUtils.user
        if(user._id) {
            return <Redirect to="/" />
        }

        return (
            <div className="login">
                <header className="login-header">
                    <h1>后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, whitespace: true, message: '请输入用户名' },
                                { min: 4, message: '用户名至少4位' },
                                { max: 12, message: '用户名最多12位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名由有数字、字母、下划线组成' }
                              ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, whitespace: true, message: '请输入密码' },
                                { min: 4, message: '密码至少4位' },
                                { max: 16, message: '密码最多16位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '密码由有数字、字母、下划线组成' }
                              ]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}