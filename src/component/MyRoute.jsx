import React, {Component, useState} from 'react';
import {BrowserRouter as Router, Route, Link, Switch, useHistory, BrowserRouter} from 'react-router-dom'
import {Fa, Home, MyEditor, Socket, Test, Tool} from "./common/Home.jsx";

import "./my.css"

import {StudentIndex} from "./student";
import {Login} from "./common/Login";
import {Exam, ExamDetail} from "./student/Exam";

import {AddTeacher} from "./admin/AddTeacher";
import {TeacherManage} from "./admin/TeacherManage";
import {ScoreTable} from "./student/ScoreTable";
import {AddAnswer} from "./teacher/AddAnswer";
import {AddExam} from "./teacher/AddExam";
import {AddStudent} from "./teacher/AddStudent";
import {SelectExam} from "./teacher/SelectExam";
import { Zhihu} from "./zhihu/Zhihu";
import {Problem} from "./zhihu/Problem";
import {User} from "./zhihu/User";
import {Answer} from "./zhihu/Answer";
import {useRequest} from "ahooks";
import request from "./request";
import {Banner} from "./zhihu/Banner";



/*export function Tree({items,depth=0}) {

    const hasChildren = items && items.length
    return hasChildren&&items.map(item=>(<>
           <div style={{paddingLeft:depth*15}}>{item.name}</div>
        <Tree items={item.children} depth={depth+1}/>
    </>)
    )
}*/



export const MyRoute = ({children}) => {
    const info = [
        {name: "/home", component: Home},
        {name: "/addTeacher", component: AddTeacher},
        {name: "/login", component: Login},
        {name: "/stu", component: StudentIndex},
        {name: "/exams", component: Zhihu},
        // {name: "/answer/:id", component: Answer},
        {name: "/teacherManage", component: TeacherManage},

        {name: "/addAnswer", component: AddAnswer},
        {name: "/addExam", component: Zhihu},
        {name: "/addStudent", component: AddStudent},
        {name: "/problem/:id", component: Problem},
        {name: "/user", component: User},
        {name: "/banner", component:  Banner},

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
            {info.map((it, index) => (
                <Route path={it.name} key={index} component={it.component}/>))}
        </Switch>
    </BrowserRouter>


}


