import React, {useEffect} from 'react';
import {Table} from "antd";
import {useRequest} from "ahooks";
import request from "../request";
import {MyTable} from "../admin/MyTable";
export const ScoreTable =()=>{
    const columns = [
        {
            title: 'id', dataIndex: 'scoreId',
            editable: (text, record, index) =>  index !== 0
        },
        {title: 'answerDate', dataIndex: 'answerDate',},
        {title: 'subject', dataIndex: 'subject',},
        {title: 'etScore', dataIndex: 'etScore',},

        ]
/*    const {data} = useRequest(()=>request.get('/teacher'))
    useEffect(() => {
        console.log(data)
        if (data !== undefined) {
            state.dataSource = data
        }
    }, [data]);*/
    return      <div>
<MyTable link={'score'} column={columns}/>
    </div>
}
