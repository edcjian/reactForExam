import React from 'react';
import {MyTable} from "../admin/MyTable";

export const AddAnswer = () => {

    const s = [
        {
            title: 'id', dataIndex: "examCode",
            editable: (text, record, index) => index !== 0
        },
        {title: "description", dataIndex: "examCode"},
        {title: "source", dataIndex: "description"},
        {title: "paperId", dataIndex: "source"},
        {title: "examDate", dataIndex: "paperId"},
        {title: "totalTime", dataIndex: "examDate"},
        {title: "grade", dataIndex: "totalTime"},
        {title: "term", dataIndex: "grade"},
        {title: "major", dataIndex: "term"},
        {title: "institute", dataIndex: "major"},
        {title: "totalScore", dataIndex: "institute"},
        {title: "type", dataIndex: "totalScore"},
        {title: "tips", dataIndex: "tips"}

    ]
    return <MyTable column={s} link={'exam_manage'}/>
}
