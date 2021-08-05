import {useReactive} from "ahooks";
import request from "../request";
import {message, Tag} from "antd";
import {createContext, useEffect} from "react";
import {Answer} from "./Answer";
import {Banner} from "./Banner";
import './problem.scss'
export const myContext=createContext(0)
const { Provider }=myContext
export function Problem({problem, match}) {
    let state = useReactive({
            answer: [],
            problem: '',
            hasMore: false,
            loading: false,
        count:1678

        }
    )
    const {id} = match.params

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await request.get('/problem?id=eq.' + id)
                state.problem = res[0]
                const ans = await request.get(
                    `answer?select=id,comment!answerId(id,parentId,text,userId(name,intro)),content,anumber,problemId(title,id),userId(name,intro)`)
               console.log(ans)
                state.answer = ans
            } catch (e) {
                console.log(e)
            }
        }

        fetchData()
    }, []);
    let handleInfiniteOnLoad = () => {
        message.warning('Infinite List loaded all');
        state.loading = true
        if (state.answer.length > 2) {
            state.hasMore = false
            state.loading = false

        }


    }
    return <div className="details">

        <div className="header">
            <div>
                {state.problem.tag?.split(',')?.map(it=>
                    <Tag color="blue">{it}</Tag> )}
            </div>

            <div>{state.problem.title}</div>
            <div>{state.problem.topic}</div>
            <div className="action">
                <div>关注问题</div>
                <div>写回答</div>
                <div>邀请回答</div>
                <div>好问题</div>
                <div>添加评论</div>
                <div>分享</div>
            </div>
        </div>
        <div className="content">
            {
                state.answer.map((it,index) =>
                    <Provider value={it.comment} >
                    <Answer {...it} key={index}/>
                    </Provider>
                )
            }
        </div>

    </div>

}

