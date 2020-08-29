import React, { Component } from 'react';
import {
    Form,
    Input
} from 'antd'

class UpdateForm extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    componentWillMount() {
        // 创建form上下文
        this.formRef = React.createRef()
        // 将form通过setForm()传递给父组件
        this.props.setForm(this.formRef)
    }

    componentWillReceiveProps () {
        /* antd中inintialValue在初始化时生效，后面值发生变化将不会更改，需要resetFields重置表单 */
        this.formRef.current.resetFields()
    }

    render() {
        const categoryName = this.props.categoryName
        return (
            <Form
                ref={this.formRef}
            >
                <Form.Item
                    shouldUpdate
                    name="categoryName"
                    initialValue={categoryName}
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

export default UpdateForm;