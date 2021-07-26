import React, {useEffect, useState} from 'react';
import Layout, {Content, Header} from "antd/es/layout/layout";
import '../sty.scss'
import {Button, Form, Menu, Tree} from "antd";
import Sider from "antd/es/layout/Sider";
import "draft-js/dist/Draft.css";
import {useHistory} from "react-router-dom";
const {SubMenu} = Menu;
export const Home = ({history}) => {

    const menus = [{
        key: '1',
        title: '考试管理',

        children: [
            {title: '功能介绍', key: '1-1', path: '/examDescription'},
            {title: '考试查询', key: '1-2', path: 'selectExam'},
            {title: '添加考试', key: '1-3', path: '/stu'}],
    },
        {
            key: '2',
            title: '题库管理',

            children: [{title: '功能介绍', key: '2-1', path: '/answerDescription'},
                {title: '所有题库', key: '2-2', path: '/selectAnswer'},
                {title: '增加题库', key: '2-3', path: '/addTeacher'},
                {title: '添加', key: '2-4', path: '/addAnswer'}],
        },
        {
            key: '3',
            title: '成绩查询',

            children: [
                {title: '学生成绩查询', key: '3-1', path: '/addExam'},
                {title: '分数', key: '3-2', path: '/scoreTable'},
                {title: '成绩分段查询', key: '3-3', path: '/addStudent'},
                {title: '成绩部分', key: '3-4', path: '/teacherManage'}],
        },
        {
            key: '4',
            title: '学生管理',

            children: [
                {title: '学生管理', key: '4-1', path: '/studentManage'},
                {title: '添加学生', key: '4-2', path: '/addStudent'}],
        }]
    const [data, setData] = useState(false);

    return <Layout>
        <Sider trigger={null} collapsible collapsed={data}>
            <div className="logo"/>
            <Tree
                showIcon
                defaultExpandAll
                defaultSelectedKeys={['1-1']}
                treeData={menus}
                onSelect={(selectedKeys, {node: {path}}) => history.push(path)}
/>
</Sider>
<Layout className="site-layout">
    <Header className="site-layout-background" style={{padding: 0}}>

    </Header>
    <Content
        className="site-layout-background"
        style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
        }}
    >
        Content
    </Content>
</Layout>
</Layout>
}




