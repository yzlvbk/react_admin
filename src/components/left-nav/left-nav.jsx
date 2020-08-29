import React, { Component } from 'react';
import './left-nav.less'
import logo from '../../assets/image/logo.png'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;
/* 
左侧导航的组件
*/
class LeftNav extends Component {

    /* 
    根据menu的数据数组动态生成对应的标签数组
    */
    getMenuNodes = (menuList) => {
        return menuList.map((item) => {
            if(!item.children) {
               return (
                <Menu.Item key={item.key}>
                    <Link to={item.key}>{item.title}</Link>
                </Menu.Item>
               )
            }else {
                // 得到当前请求的路由路径
                const path = this.props.location.pathname

                const cItem = item.children.find((cItem) => cItem.key === path)
                // 如果存在，说明item'的子列表需要展开
                if(cItem) {
                    this.openKey = item.key
                }
                return (
                    <SubMenu key={item.key} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    /* 
    在第一次render()之前执行一次
    为第一个render()准备数据(同步的)
    */
    UNSAFE_componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {

        // 得到当前请求的路由路径
        const path = this.props.location.pathname
        // 得到需要打开菜单项的key
        const openKey = this.openKey

        return (
            <div className="left-nav">
                <Link to='/'>
                    <header className="left-nav-header">
                        <img src={logo} alt=""/>
                        <h2>后台管理</h2>
                    </header>
                </Link>

                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                    >
                    {this.menuNodes}

                </Menu>
                
                
            </div>
        );
    }
}
export default withRouter(LeftNav)
