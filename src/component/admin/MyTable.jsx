import {Button, Form} from "antd";
import {useReactive, useRequest} from "ahooks";
import request from "../request";
import Modal from "antd/es/modal/Modal";
import {EditableProTable} from "@ant-design/pro-table";
export const MyTable = ({link,column, isEditable=false}) => {
    const [form] = Form.useForm();

    const edits = (text, record, _, action) => {

        console.log(record.id)

        // action?.startEditable?.(record.id);//todo
    }
    const del = async (text, record, _, action) => {
        try {
            console.log("del")
            let res = await request.delete(`/teacher?id=eq.${record.id}`)
            // setDataSource(state.dataSource.filter((item) => item.id !== record.id))
            state.dataSource = state.dataSource.filter((item) => item.id !== record.id)

        } catch (e) {
            console.log(e)
        }
    }
/*    column.push(        {
        title: 'opera', valueType: 'option', render: (text, record, _, action) => [
            <a key="editable" onClick={() => edits(text, record, _, action)}>编辑</a>,
            <a key="delete" onClick={() => del(text, record, _, action)}>删除</a>,
        ],
    })*/
    const state = useReactive({
        isVisible: false,
        editableKeys: [],
        dataSource: []
    })

    const modal = {
        visible: state.isVisible,
        onOk: () => {
            state.isVisible = false
        },
        onCancel: () => {
            state.isVisible = false
        },
    }

    const edit = {
        // request:async () => await request.get('/teacher'),
        value: state.dataSource,
        headerTitle: "教师",
        // editableKeys:  record.editableKeys,
        maxLength: 10,
        columns: column,
        rowKey: "teacherId",

        pagination: {pageSize: 2},
        onChange: (value) => {
            state.dataSource = value
        },
        request: async () => {
            let data = await request.get(`/${link}`)
            state.dataSource = data
            return {data, success: true}
        }
    }
    if (isEditable === true) {
        edit.editable = {
            onSave: async (rowKey, datas, row) => {
                delete datas.id
                delete datas.index
                try {
                    let res = await request.patch(`/sensor?id=eq.${rowKey}`, datas)
                    // let res = await request.post('/sensor', datas)
                    // state.dataSource = [...state.dataSource, datas]

                } catch (err) {
                    console.log(err)
                }
            },
        }

    }
    return <div className="table">
        <div className="two">
            <Button onClick={() => {
                state.isVisible = true
            }}>添加</Button>

            <Modal title="Basic Modal" {...modal} >
                <Form form={form} name="control-hooks">

                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </Modal>
            <EditableProTable{...edit}


            />
        </div>

    </div>

}
