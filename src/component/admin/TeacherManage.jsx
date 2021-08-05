import React,{useState} from 'react';
import {MyTable} from "./MyTable";
import {Space, Table, Tag} from "antd";
import Modal from "antd/es/modal/Modal";
import {MyForm} from "../common/MyForm";

export const TeacherManage =({history})=>{
    function edits(data) {
        console.log(data)
        console.log(data)
        const key =Object.entries(data)
        console.log(key)

        Modal.info({
            content: (
              <MyForm formData={key} />
            )})}


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={()=>edits(text) }>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
const [state, setState] = useState(false);
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

   return <div>
       <Table dataSource={data} columns={columns}   />

   </div>
}




