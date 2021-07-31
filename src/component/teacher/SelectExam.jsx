import React, {useEffect} from 'react';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import {useReactive} from "ahooks";
export const SelectExam =()=>{
const state=useReactive({
    editorState: BraftEditor.createEditorState(null)
})


    async function saveEditorContent(htmlContent) {
    console.log(htmlContent)

    }

    const  submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = state.editorState.toHTML()
        console.log(htmlContent)
        await saveEditorContent(htmlContent)
    }


  const  handleEditorChange = (editorState) => {
    state.editorState=editorState
  }

    const editorProps = {
        value:state.editorState,
        onChange:handleEditorChange,
        onSave:submitContent,
        height: 500,
        excludeControls:['media']


    }


        return <div>
        <BraftEditor
            {...editorProps} />
        </div>
}
