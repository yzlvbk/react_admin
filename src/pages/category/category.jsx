import React, { Component } from 'react';
import './category.less';
import { reqCategory, reqUpdateCategory, reqAddCategory } from '../../api/api'
import { 
    Card,
    Button,
    Table,
    message,
    Modal
 } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddForm from './add-form'
import UpdateForm from './update-form'


export default class Category extends Component {
    constructor (props) {
        super(props)
        this.state = {
            categorys: [], // 一级分类列表
            subCategorys: [], // 二级分类列表
            parentId: '0', // 当前需要显示的分类列表 0 / 1
            parentName: '', // 当前需要显示的分类列表的父分类名称
            loading: false, // 加载状态

            showStatus: 0, // 模态框状态 0:关闭  1:添加模态框  2:修改模态框
        }
    }
    
    /* 初始化table列 */
    initColumns() {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name', // 显示数据对应的属性名
                key: 'name',
            },
            {
                title: '操作',
                width: 200,
                align: 'center',
                render: (category) => ( // 返回需要显示的界面
                    <span>
                        <a href="#!" onClick={() => this.showUpdate(category)}>修改分类</a>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {
                            this.state.parentId === '0' ? <a href="#!" onClick={() => this.showSubCategorys(category)}>查看子分类</a> : null
                        }
                        
                    </span>
                )
            }
        ];

    }

    /* 
    获取一级/二级数据 
    parentId: 如果没有指定滚局状态中parentId请求, 如果指定了根据指定的请求
    */
    async getCategory (parentId) {
        this.setState({ loading: true })
        const parentid = parentId || this.state.parentId
        const data = await reqCategory(parentid)
        this.setState({ loading: false })
        if(data.status !== 0) return message.error('获取分类失败') 

        if (parentid === '0') { // 一级列表
            this.setState({ categorys: data.data }, () => {
            })
        }else { // 二级列表
            this.setState({ subCategorys: data.data })
        }
        
    }
    /* 获取一级分类列表 */
    showCategorys = () => {
        /* 更新为一级列表的状态 */
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
        })
    }

    /* 获取二级分类列表 */
    showSubCategorys (category) {
        this.setState({ 
            parentId: category._id,
            parentName: category.name,
        }, () => { // 在状态更新且重新render()后执行
            /* 获取二级分类 */
            this.getCategory()
        }) 
    }

    /* 响应点击取消: 隐藏模态框 */
    handleCancel = () => {
        this.setState({ showStatus: 0 })
    }

    /* 显示添加模态框 */
    showAdd = () => {
        this.setState({ showStatus: 1 })
        console.log(this.state.parentId)
    }

    /* 添加分类 */
    addCategory = async () => {
        // 进行表单验证 如果添加值存在
        if (this.form.current.getFieldValue('categoryName')) {
            // 1.隐藏模态框
            this.setState({ showStatus: 0 })

            // 2.发送添加请求
            const { category, categoryName } = this.form.current.getFieldValue()
            const data = await reqAddCategory(categoryName, category)
            if (data.status === 0) {

                // 添加的分类就是当前分类列表的分类
                if (category === this.state.parentId) {
                    // 3.重新获取分类列表
                    this.getCategory()
                } else if (category === '0') { // 在二级分类列表下添加一级分类，重新获取一级列表，但不需要显示
                    this.getCategory('0')
                }
            }
        }     
    }

    /* 显示更新模态框 */
    showUpdate = (category) => {
        // 更新状态
        this.setState({ 
            showStatus: 2
        })
        this.category = category
    }

    /* 更新分类 */
    updateCategory = async () => {
        // 进行表单验证 如果修改值存在
        if(this.form.current.getFieldValue('categoryName')) {
            // 1.隐藏模态框
            this.setState({ showStatus: 0 })

            // 2.发请求更新分类
            const categoryId = this.category._id
            const categoryName = this.form.current.getFieldValue('categoryName')
            console.log(this.form.current.getFieldValue('categoryName'))
            const data = await reqUpdateCategory(categoryId, categoryName)
            if (data.status === 0) {
                // 3.重新显示列表
                this.getCategory()
            }
        }
        // antd 中获取到的value是旧值 ---可能是bug
        // this.form.current.validateFields().then(async values => {
            
        // })
        
    }

    /* 为第一次render做准备 */
    componentWillMount () {
        this.initColumns()
    }

    /* 执行异步任务, 发异步ajax请求 */
    componentDidMount () {
        /* 获取table数据 */
        this.getCategory()
    }

    render() {
        /* card 的标题 */
        const title = this.state.parentId === '0' ? '一级分类列表' : (
            <span>
            <a href="#!" onClick={this.showCategorys}>一级分类列表</a>
                <i>&gt;</i>
                <span>{this.state.parentName}</span>
            </span>
        )
        const add = <Button onClick={this.showAdd} type="primary" icon={<PlusOutlined />}>添加</Button>

        
        // 读取指定的分类
        const category = this.category || {}
        

        return (

            <Card title={title} extra={add}>
                <Table 
                bordered
                rowKey='_id'
                loading={this.state.loading}
                dataSource={this.state.parentId === '0' ? this.state.categorys : this.state.subCategorys} 
                columns={this.columns} />
                
                <Modal
                    title="Basic Modal"
                    visible={this.state.showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm
                    categorys={this.state.categorys}
                    parentId={this.state.parentId}
                    setForm={(form) => { this.form = form }}
                    ></AddForm>
                </Modal>

                <Modal
                    title="Basic Modal"
                    visible={this.state.showStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm 
                    categoryName={category.name}
                    setForm={(form) => {this.form = form}}
                    >
                    </UpdateForm>
                </Modal>
            </Card>
        );
    }
}