import React, { Component } from 'react';
import { 
    Form,
    Select,
    Input
 } from 'antd'

class AddForm extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        // 创建form上下文
        this.formRef = React.createRef()
        // 将form通过setForm()传递给父组件
        this.props.setForm(this.formRef)
        console.log(this.formRef, '---')
    }

    componentWillReceiveProps() {
        /* antd中inintialValue在初始化时生效，后面值发生变化将不会更改，需要resetFields重置表单 */
        this.formRef.current.resetFields()
    }

    render() {
        const { categorys, parentId } = this.props

        return (
            <Form
                ref={this.formRef}
            >
                <Form.Item
                    name="category"
                    initialValue='0'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        }
                    ]}>
                    <Select>
                        <Select.Option value='0'>一级分类</Select.Option>
                        {
                            categorys.map((item) => <Select.Option value={item._id}>{item.name}</Select.Option>)
                        }
                    </Select>
                </Form.Item>
                
                <Form.Item
                    name="categoryName"
                    initialValue=''
                    rules={[
                        {
                            required: true,
                            message: '请输入分类名称'
                        }
                    ]}>
                    <Input placeholder="请输入分类名称"></Input>
                </Form.Item>
            </Form>
        );
    }
}

export default AddForm;