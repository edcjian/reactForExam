import React from 'react';
import {MyForm} from "../common/MyForm";
import request from "../request";
import {message} from "antd";

export const AddTeacher =({history})=>{
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
    const  formData=[
        {name:"id"},
        {name:"name"},
    ]
return <MyForm formData={formData} finish={finish}/>

}
