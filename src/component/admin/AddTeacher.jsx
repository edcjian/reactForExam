import React from 'react';
import {Form, message,Input, Button, Select} from "antd";
import useForm from "antd/es/form/hooks/useForm";
import {Option} from "antd/es/mentions";
import request from "../request";
export const AddTeacher =({history})=>{
    const [form] = useForm();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
const finish=async val => {
    try {
        console.log(val)
        val.role = 2
        let res = await request.post('teacher', val)
        console.log(res)
        message.info('数据添加成功')
        history.push('/teacherManage')
    } catch (err) {
        console.log('request failed')
    }
}
    return     <Form {...layout} form={form} name="control-hooks" onFinish={finish}>
        <Form.Item name="teacherName" label="teacherName" rules={[{ required: true }]}>
            <Input />
        </Form.Item>

        <Form.Item name="institute" label="institute" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item name="sex" label="sex" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item name="tel" label="tel" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item name="pwd" label="password" rules={[{ required: true }]}>
            <Input />
    </Form.Item>
        <Form.Item name="cardId" label="cardId" rules={[{ required: true }]}>
            <Input />
    </Form.Item>
      
        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            <Button htmlType="button" onClick={()=>form.resetFields()}>
                Reset
            </Button>
            <Button type="link" htmlType="button" >
                Fill form
            </Button>
        </Form.Item>

    </Form>

}
