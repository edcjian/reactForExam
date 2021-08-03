import {useReactive} from "ahooks";
import request from "../request";
import {message, Tag} from "antd";
import {useEffect} from "react";
import {Content} from "./Content";
import {Banner} from "./Banner";
import './problem.scss'

export function Problem({problem, match}) {
    let state = useReactive({
            answer: [],
            problem: '',
            hasMore: false,
            loading: false,

        }
    )
    const {id} = match.params

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await request.get('/problem?id=eq.' + id)

                state.problem = res[0]

                const ans = await request.get(`/answer?problemId=eq.${res?.[0]?.id}`)

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
        <Banner/>
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
                state.answer.map(it =>
                    <Content {...it}/>
                )
            }
        </div>

    </div>
}
