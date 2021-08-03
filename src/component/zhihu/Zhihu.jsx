import React, {useEffect} from 'react';
import './zhihu.scss'

import {Input, Tabs} from "antd";

import {useReactive} from "ahooks";
import request from "../request";
import '../student/detail.scss'
import {Content} from "./Content";
import {Banner} from "./Banner";







export const Zhihu = () => {
    let onSearch = () => {

    }
    useEffect(() => {
        async function fetchData() {
            const res = await request.get("v4/questions/476259609");
            console.log(res)
        }

        fetchData()
    }, []);
    const problems = useReactive([])
    return <div className="con">

        <div className="center">
            <div className="left">
                <div className="header">
                    <div className="options">关注</div>
                    <div className="options">推荐</div>
                    <div className="options">热榜</div>
                    <div className="options">视频</div>
                </div>
                <Content id={2030714648} problem={problems}>

                </Content>
            </div>
        </div>
    </div>
}
