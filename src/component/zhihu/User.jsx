import React from 'react';
import './user.scss'
import {Link} from "react-router-dom";
import {useReactive, useRequest} from "ahooks";
import {Answer} from "./Answer";
import {Tabs} from "antd";
import request from "../request";

const {TabPane} = Tabs;
export const User = () => {
    const state = useReactive({
        user: []
    })
    const link = `/answer?select=id,text,anumber,comment,problemId(title),userId`
    const {data, error, loading} = useRequest(
        () => request.get(
            link));
    console.log(data)
    return <div>
        <div className="header">
            <img src="" alt="" className="avatar"/>
            <div className="intro">
                <div>
                    闪刀姬 程序员
                </div>
                <div> 计算机软件</div>
                <div>男</div>


                <Link>查看详细资料</Link>
            </div>
        </div>
        <div className="content">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Tab 1" key="1">
                    Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>
            {data?.map(it =>
                <Answer {...it}/>
            )}
        </div>
    </div>
}
