import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'
/* 
应用的根组件
*/

export default class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/admin" component={ Admin }></Route>
                    <Route path="/" component={ Login }></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}