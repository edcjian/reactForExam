import React, {Component, useState} from 'react';
import {BrowserRouter as Router, Route, Link, Switch, useHistory, BrowserRouter} from 'react-router-dom'
import {Fa, Home, MyEditor, Socket, Test, Tool} from "./common/Home.jsx";
// import "./style.css"
import "./my.css"
import useForm from "antd/es/form/hooks/useForm";
import {Button, Form, Input} from "antd";
import request from "./request";
import {StudentIndex} from "./student";
import {Login} from "./common/Login";
import {Answer, Exam, ExamDetail} from "./student/Exam";
import {range} from "../tool";
import {Comments} from "./common/Comment";
import {AddTeacher} from "./admin/AddTeacher";
import {TeacherManage} from "./admin/TeacherManage";
import {ScoreTable} from "./student/ScoreTable";
import {AddAnswer} from "./teacher/AddAnswer";
import {AddExam} from "./teacher/AddExam";
import {AddStudent} from "./teacher/AddStudent";
import {SelectExam} from "./teacher/SelectExam";
function Fetch(url,params){

    return Request.get(url,params)
}


/*export function Tree({items,depth=0}) {

    const hasChildren = items && items.length
    return hasChildren&&items.map(item=>(<>
           <div style={{paddingLeft:depth*15}}>{item.name}</div>
        <Tree items={item.children} depth={depth+1}/>
    </>)
    )
}*/


export const MyRoute = ({children}) => {
    const info= [
        {name: "/home", component: Home},
        {name: "/addTeacher",component:AddTeacher},
        {name: "/login",component:Login},
        {name: "/stu",component:StudentIndex},
        {name: "/exams",component:Exam},
        {name: "/answer/:id",component:Answer},
        {name: "/teacherManage",component:TeacherManage},
        {name: "/scoreTable",component:ScoreTable},
        {name: "/addAnswer",component:AddAnswer},
        {name: "/addExam",component:AddExam},
        {name: "/addStudent",component:AddStudent},
        {name: "/selectExam",component:SelectExam},

   /*     {name:"/test",component:Test},
        {name:"/tree",component:Tree},
        {name:"/comments",component:Comments},
        {name:"/socket",component:Socket},
        {name:"/fa",component:Fa},
        {name:"/edit",component:MyEditor},
        {name:"/tool",component:Tool},*/
        /*{name: "/",component:},
        {name: "/",component:},*/
    ]
    return <BrowserRouter>
        <Switch>
            {children}
            {info.map((it,index) => (
                <Route path={it.name} key={index} component={it.component}/>))}
        </Switch>
    </BrowserRouter>


}


