import React from 'react';
import {MyForm} from "../common/MyForm";
import request from "../request";
export const StudentManager =()=>{
    const finish=async val =>{
try {
   await request.patch(`/student?studentId=eq.12`, {
        pwd: val.pass
    })
}catch (e){
    console.log(e)
}
    }
    return <div>
        <h3>修改你的密码</h3>
        <MyForm formData={[{name:"pass"},{name:"checkPass"}]} finish={finish}/>
    </div>
}
