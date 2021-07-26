import {useHistory} from "react-router-dom";
import useForm from "antd/es/form/hooks/useForm";
import {Button, Form, Input} from "antd";
import request from "../request";

export function Login() {

    const his =useHistory()
    const [form] = useForm();
    return <div id="login">
        <div className="container">
            <Form   name="control-hooks" onFinish={
                async (values)=>{
                    const {username, password}=values
                    console.log(password)
                    const  res =  await request.get(`login?username=eq.${username}&&password=eq.${password}`)

                    console.log(res)
                    if (!isEmpty(res)) {
                        his.push('/home')
                    }

                }}>
                <Form.Item  name="username" label="用户名" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="密码" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
}
function isEmpty(obj) {
    for(const key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
