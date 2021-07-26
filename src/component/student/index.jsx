import React from 'react';
import Sider from "antd/es/layout/Sider";
import {List, Menu} from "antd";
import {Link, useHistory} from "react-router-dom";
import Layout, {Content, Header} from "antd/es/layout/layout";
import '../sty.scss'
import Search from "antd/es/input/Search";

const {SubMenu} = Menu;

export const StudentIndex = (s) => {
    console.log(s)
    const his = useHistory()
    const menus = [
        {index: "我的试卷", path: '/paper'},
        {index: "我的练习", path: '/'},
        {index: "我的分数", path: '/'},
        {index: "给我留言", path: '/'},
        {index: "待定", path: '/'},
    ]
    const exams = [
        {
            name: '计算机网络',
            detail: '计算机网络-2019年上期期末考试',
            status: {
                time: "2019 - 03 - 21",
                longs: 120,
                score: 100

            }
        }


    ]
    return <Layout>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}>
                <Menu mode="horizontal">
                    {menus.map(it => (

                        <Menu.Item key="1">

                            <Link to={it.path}>
                                {it.index}
                            </Link>
                        </Menu.Item>
                    ))
                    }
                </Menu>
            </Header>
            <Content

            >
                <div className="exam">
                    {/*<div className="header">
试卷列表
    <div><Search
    placeholder="input search text"
    enterButton="Search"
    size="small"
    className="width:300px"
/>
    </div>

</div>*/}
                    <div className="con">
                        {exams.map(it => (

                            <div className="card">

                                <div>{it.name}</div>
                                <div>{it.detail}</div>
                                {/*<div>{it.status}</div>*/}
                                <Link to={{
                                    pathname:'/exams',
                                    state:it
                                }}>
                                    hello
                                </Link>
                            </div>


                        ))
                        }
                    </div>
                </div>
                Content
            </Content>
        </Layout>
    </Layout>
}

    function Topic() {
        return <div className="topic">

        </div>
    }
