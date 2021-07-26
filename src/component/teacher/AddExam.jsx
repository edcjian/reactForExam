import React from 'react';
import {MyForm} from "../common/MyForm";
import request from "../request";
export const AddExam =({history})=>{
    const finish=async val =>{
        try {
            await request.post('/exam_manage', val)
            history.push('/selectExam')
        }catch (e){
            console.log(e)
        }
    }
    const  formData=[
        {name: "description"},
        {name: "source"},
        {name: "paperId"},
        {name: "examDate"},
        {name: "totalTime"},
        {name: "grade"},
        {name: "term"},
        {name: "major"},
        {name: "institute"},
        {name: "totalScore"},
        {name: "type"},
        {name: "tips"}
    ]
    return <MyForm formData={formData} finish={finish}/>
}
