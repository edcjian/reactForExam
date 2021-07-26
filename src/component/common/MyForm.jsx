import React from 'react';
import {Form, message,Input, Button, Select} from "antd";
import useForm from "antd/es/form/hooks/useForm";

import request from "../request";
export const MyForm =({formData,finish})=>{
    const [form] = useForm();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    return     <Form {...layout} form={form} name="control-hooks" onFinish={finish}>
        {formData.map((it,index)=>
            <Form.Item name={it.name} label={it.name} rules={[{ required: true }]}>
                <Input />
            </Form.Item>)

        }
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
