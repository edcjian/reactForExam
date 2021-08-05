import React, {Fragment,useContext,useState} from 'react';
import like from "../../img/like.png";
import pinlun from "../../img/pinlun.png";
import fen from "../../img/fen.png";
import shou from "../../img/shou.png";
import './content.scss'
import {Button, Collapse, Form} from "antd";
import _ from "lodash";
import Modal from "antd/es/modal/Modal";
import {myContext} from "./Problem";
import {useReactive, useRequest} from "ahooks";
import request from "../request";
import TextArea from "antd/es/input/TextArea";


const {Panel} = Collapse;
const Editor = ({uid,parentId,answerId}) => {
    const state=useReactive({
        form:{}
        })

    function save(e) {
        let s={}
        s.text=e.target.value
        s.parentId=parentId
        s.userId=uid
        s.answerId=1
        state.form=s
    }
console.log(answerId)
    return  <>
        <Form.Item>
        <TextArea rows={4}  onChange={save}/>
</Form.Item>
<Form.Item>
<Button htmlType="submit"   type="primary" onClick={()=>request.post(`comment`,state.form)}>
Add Comment
</Button>
</Form.Item>
</>
}

function MyComment({comment,depth=0}) {
    if (!comment || !comment.length) {
        return null
    }
    return comment.map(({parentId,answerId,userId:{name},text,children}) => (
        <Fragment >
            <div style={{ paddingLeft: depth * 15 }}
                onClick={()=>  Modal.info({
                        content: (
                      <Editor uid={parentId} parentId={parentId} answerId={answerId}/>
                        )})}
            >{name}{parentId} {text}</div>

            <MyComment comment={children} depth={depth + 1} />
        </Fragment>
    ))
}

export const Action = ({anumber}) => {
    function callback(key) {
        console.log(key);
    }

    const comment=useContext(myContext)
    let a=_.cloneDeep(comment)
    function children(arg){
let arr=[]
        for (let i = 0; i <a.length ; i++) {
            if(a[i].parentId===arg){
                arr.push(a[i])
                a[i].children=children(a[i].id)
            }
        }
        return arr
    }

  const [ state, setstate] = useState(false);
console.log(children(null))
    return <div className="action">
        <Modal title="Basic Modal"
               visible={state}
               onOk={()=>setstate(false)}>
<MyComment comment={children(null)}/>
        </Modal>
        <div className="icon">赞同{anumber}</div>
        <div className="icon"><img src={like} alt=""/></div>
<div className="icon"><img src={pinlun} alt="" onClick={()=>setstate(true)}/></div>
        <div className="icon"><img src={fen} alt=""/></div>
        <div className="icon"><img src={shou} alt=""/></div>
    </div>
}
