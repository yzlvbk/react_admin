import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect, Route, Switch } from 'react-router'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const {  Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        // 如果内存没有存储user ==> 当前没有登录
        if(!user._id) {
            // 自动跳转到登录
            return <Redirect to="/login" />

        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header></Header>
                    <Content style={{backgroundColor:"#fff"}}>
                        <Switch>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/category' component={Category}></Route>
                            <Route path='/product' component={Product}></Route>
                            <Route path='/role' component={Role}></Route>
                            <Route path='/user' component={User}></Route>
                            <Route path='/charts/bar' component={Bar}></Route>
                            <Route path='/charts/line' component={Line}></Route>
                            <Route path='/charts/pie' component={Pie}></Route>
                            <Redirect to="/home" />
                        </Switch>

                    </Content>
                    <Footer style={{textAlign: 'center', color: '#ccc'}}>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}