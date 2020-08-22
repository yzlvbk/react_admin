import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.less'
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'

// 读取local中保存user, 保存到内存中
memoryUtils.user = storageUtils.getUser()

ReactDOM.render(<App />, document.getElementById('root'))