import React from 'react';
import {Input, Tabs} from "antd";
import './header.scss'
import se from '../../img/se.png'
const {TabPane} = Tabs;
export const Banner =()=>{
    return      <div className="myHeader">
        <Tabs defaultActiveKey="1">
            <TabPane tab="Tab 1" key="1">
                Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
                Content of Tab Pane 2
            </TabPane>
        </Tabs>

        <Input
            placeholder="input search text"
            enterButton="Search"
            style={{width: 300, height: 40}}
            // onSearch={}
        />
        <img src={se} alt="" className="sub"/>
        <img src={se} alt="" className="sub"/>
        <img src={se} alt="" className="sub"/>
    </div>
}
