import React, { Component } from 'react'
import './login.less'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default class Login extends Component {

    onFinish = values => {

        console.log('发送ajax请求', values);
      };

    render() {
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
                                { min: 6, message: '密码至少6位' },
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