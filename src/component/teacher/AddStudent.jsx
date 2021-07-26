import React from 'react';
import {MyForm} from "../common/MyForm";
import request from "../request";

export const AddStudent = ({history}) => {
    const finish=async val =>{
        try {
            await request.post('/student', val)
            history.push('/studentManage')
        }catch (e){
            console.log(e)
        }
    }
    const formData = [
        {name: "studentName"},
        {name: "grade"},
        {name: "major"},
        {name: "clazz"},
        {name: "institute"},
        {name: "tel"},
        {name: "email"},
        {name: "pwd"},
        {name: "cardId"},
        {name: "sex"}
    ]
    return <MyForm formData={formData} finish={finish}/>
}
