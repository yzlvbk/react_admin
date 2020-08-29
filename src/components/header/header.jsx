import React, { Component } from 'react';
import './header.less'
import { formateDate } from '../../utils/dateUtils'
import { withRouter } from 'react-router';
import menuList from '../../config/menuConfig'
import { Modal } from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

const { confirm } = Modal;

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTime: formateDate(Date.now()), // 当前时间字符串
        }
    }

    getTime() {
        this.invervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({
                currentTime
            })
        }, 1000)
    }

    getTitle() {
        let title
        menuList.forEach((item) => {
            if(item.key === this.props.location.pathname) {
                title= item.title
            }else if(item.children) {
                // 在所有子item中查找匹配
                const cItem = item.children.find((cItem => cItem.key === this.props.location.pathname))
                if(cItem) {
                    title= cItem.title
                }
            }
        })
        return title
    }

    logout = () => {
        confirm({
            title: '确定退出么?',
            onOk: () => {
                // 删除保存的user数据
                storageUtils.removeUser()
                memoryUtils.user = {}

                // 跳转到login
                this.props.history.replace('/login')
            }
          });
    }
    /* 
    第一次render()之后执行一次
    一般在此执行异步操作: 发ajax请求/启动定时器
    */
    componentDidMount() {
        // 获取当前时间
        this.getTime()

    }

    /* 
    当前组件卸载之前调用
    */
    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.invervalId)
    }

    render() {
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎,admin</span>
                    <a href="#!" onClick={this.logout}>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                    <span>{this.state.currentTime}</span>
                        <img src="" alt=""/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header)
