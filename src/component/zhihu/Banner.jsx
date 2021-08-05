import React from 'react';
import {Dropdown, Input, Menu, Tabs} from "antd";
import './header.scss'

import ring from '../../img/ring.png'
import log from '../../img/log.png'
import img from '../../img/img.png'

export const Banner =()=>{
    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            </Menu.Item>
            <Menu.Item  disabled>
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item (disabled)
                </a>
            </Menu.Item>
            <Menu.Item disabled>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item (disabled)
                </a>
            </Menu.Item>
            <Menu.Item danger>a danger item</Menu.Item>
        </Menu>
    );
    return      <div className="myHeader">
        <Input
            placeholder="input search text"
            enterButton="Search"
            style={{width: 300, height: 40}}
            // onSearch={}
        />
      <div className="sub">
          <Dropdown  overlay={menu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  Hover me
              </a>
          </Dropdown>
      </div>
    </div>
}
