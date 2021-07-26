import {Button, Form} from "antd";
import {useReactive, useRequest} from "ahooks";
import request from "../request";
import Modal from "antd/es/modal/Modal";
import {EditableProTable} from "@ant-design/pro-table";
import {useEffect, useState} from "react";


export const EditTable =()=>{
    const [form] = Form.useForm();
    const records = useReactive({
        isVisible: false,
        editableKeys: [],
        dataSource:[{
            // key: '1',
            id: 1,
            data: 1,
            range: 32,
            normal: '西湖区湖底公园1号',
        }]
    })
    const fetch = async () => {
        return await request.get('/teacher')
    }
    const modal = {
        visible: records.isVisible,
        onOk: () => {
            records.isVisible = false
        },
        onCancel: () => {
            records.isVisible = false
        },
    }
    const {data, error, loading} = useRequest(fetch)
    useEffect(() => {
        console.log(data)
        if (data !== undefined) {
            records.dataSource = data
            // setDataSource(data)
        }
    }, [data]);
   const s= {
        "teacherName": "adas",
        "cardId": "223445",
        "institute": "软件工程学院",
        "pwd": "123456",
        "role": 2,
        "sex": "男",
        "tel": "1359845844"
    }
    const column = [
        {
            title: 'id', dataIndex: 'teacherId', editable: (text, record, index) => {
                return index !== 0;
            },
        },
        {title: 'teacherName"', dataIndex: 'teacherName"',},
        {title: 'institute', dataIndex: 'institute',},
        {title: 'pwd', dataIndex: 'pwd',},
        {title: 'role', dataIndex: 'role',},
        {title: 'sex', dataIndex: 'sex',},
        {title: 'tel', dataIndex: 'tel',},
        {
            title: 'opera', valueType: 'option', render: (text, record, _, action) => [
                <a key="editable" onClick={() => {
                    console.log(record.id)
                    action?.startEditable?.(record.id);
                }}>编辑</a>,
                <a key="delete" onClick={async () => {
                    try {
                        console.log("del")
                        let res = await request.delete(`/sensor?id=eq.${record.id}`)
                        // setDataSource(records.dataSource.filter((item) => item.id !== record.id))
                        records.dataSource= records.dataSource.filter((item) => item.id !== record.id)

                    } catch (e) {
                        console.log(e)
                    }
                }}>删除</a>,
            ],
        }
    ]
    const edit = {
        // editableKeys:  record.editableKeys,
        maxLength: 10,
        columns: column,
        /*        onChange: async (rowKey, datas, row)=>{
              /!*      console.log(row)
                   console.log(records.dataSource[rowKey])*!/

        records.dataSource[rowKey]=datas
            },*/
        rowKey: "id",//todo 绷不住了
        /*        pagination:{
                    pageSize:5
                },*/
        editable: {
            // type:'multiple',

            onSave: async (rowKey, datas, row) => {
                delete datas.id
                delete datas.index
                /*       console.log(rowKey)
                       console.log(datas)*/
                try {
                    let res = await request.patch(`/sensor?id=eq.${rowKey}`, datas)
                    // let res = await request.post('/sensor', datas)
                    // records.dataSource = [...records.dataSource, datas]

                } catch (err) {
                    console.log(err)
                }
            },
            // onChange: (rowKey, datas, row) => console.log(rowKey, datas, row)

        }
    }
    return <div className="table">
        <div className="two">
            <Button onClick={() => {
                records.isVisible = true
            }}>添加</Button>
            传感器
            <Modal title="Basic Modal" {...modal} >
                <Form form={form} name="control-hooks">

                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </Modal>
            <EditableProTable
                // rowKey="id"

                value={records.dataSource}
                headerTitle="可编辑表格"
                // request={fetch()}
                {...edit}
                onChange={(value)=>{records.dataSource=value}}


            />
        </div>

    </div>

}
