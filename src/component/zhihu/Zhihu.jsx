import React, {createContext, useEffect} from 'react';
import './zhihu.scss'
import {Input, Tabs} from "antd";
import {useReactive} from "ahooks";
import request from "../request";
import {Answer} from "./Answer";
import {Banner} from "./Banner";
import {Page} from "./Page";
import {Hot} from "./Hot";
import {MyInfo} from "./MyInfo";
const {TabPane} = Tabs;

export const Zhihu = () => {
    let onSearch = () => {

    }
const state=useReactive({
    problems:[],
    answer:[],
    proId:[],
    count:123
})
    useEffect(() => {
        async function fetchData() {
            try {
                const ans = await request.get(
                    `/answer?select=id,anumber,problemId(title,id),userId(name,intro)`)
                state.answer=ans

console.log()
            }
            catch (e){
                console.log(e)
            }
        }
        fetchData()
    }, []);


    return <div className="con">
<Banner/>
        <div className="center">
            <div className="left">
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="关注" key="1">
                        {
                            state.answer.map((it,index) =>
                                    <Answer {...it} key={index}/>
                            )
                        }
                    </TabPane>
                    <TabPane tab="推荐" key="2">
                        {
                            state.answer.map((it,index) =>
                                <Answer {...it} key={index}/>
                            )
                        }
                    </TabPane>
                    <TabPane tab="热榜" key="3">
                        <Hot/>
                    </TabPane>
                    <TabPane tab="视频" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>

            </div>
            <MyInfo/>
        </div>

    </div>

}
