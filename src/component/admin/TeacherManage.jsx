import React from 'react';
import {MyTable} from "./MyTable";

export const TeacherManage =({history})=>{
    const columns = [
        {
            title: 'id', dataIndex: 'teacherId',
            editable: (text, record, index) =>  index !== 0
        },
        {title: 'teacherName', dataIndex: 'teacherName',},
        {title: 'institute', dataIndex: 'institute',},
        {title: 'pwd', dataIndex: 'pwd',},
        {title: 'role', dataIndex: 'role',},
        {title: 'sex', dataIndex: 'sex',},
        {title: 'tel', dataIndex: 'tel',},
    ]
    return <MyTable link={'teacher'} isEditable={true} column={columns}/>
}




