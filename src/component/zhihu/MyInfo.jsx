import React from 'react';
import {Tag} from "antd";

export const MyInfo = () => {
    const data = ['回答问题', '发视频', '写文章', '写想法']
    const icon = ['live', '书店', '圆桌', '专栏', '付费咨询', '百科']
    const menu = [
        '我的收藏',
        '我关注的问题',
        '我的邀请',
        '我的余额',
        '站务中心',
        '帮助中心',
        '版权服务中心']
    return <div className="info">
        {data.map(it => <div className="tag">{it}</div>)}
        <div style={{display: 'flex', height: '50px'}}>
            <div>稍后答</div>
            <div>草稿箱</div>
        </div>
        <div>
            <div>创作中心</div>
            <div>
                <span>
                今日阅读 (播放) 数
                4
                昨日数据
                29
                </span>
                <span>
            今日赞同数
            0
            昨日数据
                0
                </span>
            </div>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {icon.map(it => <Tag color="cyan">
                {it}
            </Tag>)}
        </div>
        <div>
            {menu.map(it=><div>{it}</div>)}
        </div>
    </div>
}
