import React, {useEffect} from 'react';
import {Button, Collapse, Input, Modal, Radio} from "antd";
import {useHistory} from "react-router-dom";
import {getTime, range} from "../../tool";
import request from "../request";
import {useReactive} from "ahooks";
import '../sty.scss'

const {Panel} = Collapse;
export const Exam = ({location}) => {

    const {state} = location
    console.log(state)
    const his = useHistory()
    return <div className="exams">

        <div className="information">
            <div>{state.name}</div>
            <div>{state.detail} </div>
            <div>考生须知</div>
        </div>
        <div className="course">
            <div className="header">
                <div>
                    {state.name}{state.status.score}/{state.status.longs}<Button>开始答题</Button>
                </div>

                <div><Button onClick={() => {
                    his.push('/answer/' + 20190001)
                }}>点击查看试题详情</Button></div>
            </div>
            <div className="data">
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="state is panel header 1" key="1">
                        <p>选择题 (共{}题 共计{}分)</p>
                    </Panel>
                    <Panel header="state is panel header 2" key="2">
                        <p>填空题 (共{}题 共计{}分)</p>
                    </Panel>
                    <Panel header="state is panel header 3" key="3">
                        <p>判断题 (共{}题 共计{}分)</p>
                    </Panel>
                </Collapse>
            </div>
        </div>
    </div>
}

export function Answer({match}) {
    const examCode = match.params.id
    const his = useHistory()
    const state = useReactive({
        tech: false,
        startTime: null, //考试开始时间
        endTime: '', //考试结束时间
        time: null, //考试持续时间
        reduceAnswer: [],  //vue官方不支持3层以上数据嵌套,如嵌套则会数据渲染出现问题,此变量直接接收3层嵌套时的数据。
        answerScore: 0, //答题总分数
        bg_flag: false, //已答标识符,已答改变背景色
        isFillClick: false, //选择题是否点击标识符
        slider_flag: true, //左侧显示隐藏标识符
        flag: range(20).fill(false), //个人信息显示隐藏标识符
        currentType: 1, //当前题型类型  1--选择题  2--填空题  3--判断题
        radio: [], //保存考生所有选择题的选项
        title: "请选择正确的选项",
        index: 0, //全局index
        color: range(20).fill(true),
        userInfo: { //用户信息
            name: null,
            id: null
        },
        topicCount: [],//每种类型题目的总数
        score: [],  //每种类型分数的总数
        examData: { //考试信息
            // source: null,
            // totalScore: null,
        },
        topic: [],
        showQuestion: [], //当前显示题目信息
        showAnswer: {}, //当前题目对应的答案选项
        number: 1, //题号
        part: null, //填空题的空格数量
        fillAnswer: [[]], //二维数组保存所有填空题答案
        judgeAnswer: [], //保存所有判断题答案
        topic1Answer: [],  //学生选择题作答编号,
        rightAnswer: ''
    })
    useEffect(() => {
        getExamData()
    }, []);

    async function getExamData() {
        let date = new Date()
        state.startTime = getTime(date)
        const res = await request.get(`exam_manage?examCode=eq.${examCode}`)
        console.log(res[0])
        state.examData = res[0]
        let paperId = state.examData.paperId
        console.log(paperId)
        // const result = await request.get(`paper/${paperId}`)
        const res1 = await request.get(`rpc/get_multi_question?p_id=${paperId}&q_type=1`)
        const res2 = await request.get(`rpc/get_fill_question?p_id=${paperId}&q_type=3`)
        const res3 = await request.get(`rpc/get_judge_question?p_id=${paperId}&q_type=2`)
        const result = [res1, res2, res3]
        state.topic = result
        state.reduceAnswer.data = state.topic[state.index]
        let ma = 0
        state.topic.forEach(e =>{
            state.topicCount.push(e.length)
            ma += e.map((it) => it.score).reduce((x, y) => x + y)
        })

        let len = state.topicCount[1]
        let father = []
        for (let i = 0; i < len; i++) { //根据填空题数量创建二维空数组存放每道题答案
            let children = [null, null, null, null]
            father.push(children)
        }
        state.fillAnswer = father
        let dataInit = state.topic[1]
        state.number = 1
        state.showQuestion = dataInit[0].question
        state.showAnswer = dataInit[0]
    }


    function previous() { //上一题
        state.index--
        switch (state.currentType) {
            case 1:
                change(state.index)
                break
            case 2:
                fill(state.index)
                break
            case 3:
                judge(state.index)
                break
        }
    }

    function next() { //下一题
        state.index++
        switch (state.currentType) {
            case 1:
                change(state.index)
                break
            case 2:
                fill(state.index)
                break
            case 3:
                judge(state.index)
                break
        }
    }

    function change(index) { //选择题
        console.log(state)
        state.index = index
        console.log(index)
        state.reduceAnswer = state.topic[0][state.index]
        state.isFillClick = true
        state.currentType = 1
        let len = state.topic[0].length
        if (state.index < len) {
            if (state.index <= 0) {
                state.index = 0
            }
            console.log(`总长度${len}`)
            console.log(`当前index:${index}`)
            state.title = "请选择正确的选项"
            let Data = state.topic[0]
            // console.log(Data)
            // state.topic[2][index].isMark = true
            state.showQuestion = Data[state.index].question //获取题目信息
            state.showAnswer = Data[state.index]
            state.number = state.index + 1

        } else if (state.index >= len) {
            state.index = 0
            fill(state.index)
        }
    }

    function fill(index) { //填空题
        let len = state.topic[1].length
        state.currentType = 2
        state.index = index
        if (index < len) {
            if (index < 0) {
                index = state.topic[0].length - 1
                change(index)
            } else {
                console.log(`总长度${len}`)
                console.log(`当前index:${index}`)
                state.title = "请在横线处填写答案"
                let Data = state.topic[1]
                console.log(Data)
                state.showQuestion = Data[index].question //获取题目信息
                //根据题目中括号的数量确定填空横线数量
                state.part = state.showQuestion.split("()").length - 1
                state.number = state.topicCount[0] + index + 1
            }
        } else if (index >= len) {
            state.index = 0
            judge(state.index)
        }
    }

    function judge(index) { //判断题
        let len = state.topic[2].length
        state.currentType = 3
        state.index = index
        if (state.index < len) {
            if (state.index < 0) {
                state.index = state.topic[1].length - 1
                fill(state.index)
            } else {
                console.log(`总长度${len}`)
                console.log(`当前index:${state.index}`)
                state.title = "请作出正确判断"
                let Data = state.topic[2]
                console.log(Data)
                state.showQuestion = Data[index].question //获取题目信息
                state.number = state.topicCount[0] + state.topicCount[1] + index + 1
            }
        } else if (state.index >= len) {
            state.index = 0
            change(state.index)
        }
    }

    async function commit() { //答案提交计算分数
        /* 计算选择题总分 */
        let topic1Answer = state.topic1Answer
        let finalScore = 0
        topic1Answer.forEach((element, index) => { //循环每道选择题根据选项计算分数
            let right = null
            if (element != null) {
                switch (element) { //选项1,2,3,4 转换为 "A","B","C","D"
                    case 1:
                        right = "A"
                        break
                    case 2:
                        right = "B"
                        break
                    case 3:
                        right = "C"
                        break
                    case 4:
                        right = "D"
                }
                if (right === state.topic[0][index].rightAnswer) { // 当前选项与正确答案对比
                    finalScore += state.topic[0][index].score // 计算总分数
                }
                console.log(right, state.topic[0][index].rightAnswer)
            }
            // console.log(topic1Answer)
        })

        let fillAnswer = state.fillAnswer
        fillAnswer.forEach((element, index) => { //此处index和 state.index数据不一致，注意
            element.forEach((inner) => {
                if (state.topic[1][index].answer.includes(inner)) { //判断填空答案是否与数据库一致
                    console.log("正确")
                    finalScore += state.topic[1][state.index].score
                }
            })
        });
        /** 计算判断题总分 */
        let topic3Answer = state.judgeAnswer
        topic3Answer.forEach((element, index) => {
            let right = null
            switch (element) {
                case 1:
                    right = "T"
                    break
                case 2:
                    right = "F"
            }
            if (right === state.topic[2][index].answer) { // 当前选项与正确答案对比
                finalScore += state.topic[2][index].score // 计算总分数
            }
        })
        console.log(`目前总分${finalScore}`)
        if (state.time !== 0) {
            try {
        let res=    await Modal.confirm({
                title: '友情提示',
                content: '考试结束时间未到,是否提前交卷',
                okText: '立即交卷',
                cancelText: '再检查一下',
            })

            console.log("交卷")
            let date = new Date()
            state.endTime = getTime(date)
            let answerDate = state.endTime.substr(0, 10)
            const data = {
                examCode: state.examData.examCode, //考试编号
                studentId: 20, //学号
                subject: state.examData.source, //课程名称
                etScore: finalScore, //答题成绩
                scoreId:55
                // answerDate: answerDate, //答题日期
            }

              let re=  await request.post('/score_copy1', data)
                console.log(re)
                const query = {

                    score: finalScore,
                    startTime: state.startTime,
                    endTime: state.endTime
                }
                his.push({path: '/studentScore', state: query})

            } catch (e) {
                console.log("继续答题")
            }


        }

        function showTime() { //倒计时
            setInterval(() => {
                state.time -= 1
                if (state.time === 10) {
                    Modal.confirm({
                        title: '友情提示',
                        content: '考生注意,考试时间还剩10分钟！！！',
                        okText: '立即交卷',
                        cancelText: '再检查一下',
                    })
                    if (state.time === 0) {
                        console.log("考试时间已到,强制交卷。")
                    }
                }
            }, 1000 * 60)
        }
    }

    function fillBG() { //填空题已答题目 如果已答该题目,设置第四个元素为true为标识符
        if (state.fillAnswer[state.index][0] != null) {
            state.fillAnswer[state.index][3] = true
        }
    }

    const getJudgeLabel = e => {  //获取判断题作答选项
        let val = e.target.value
        state.judgeAnswer[state.index] = val
        if (val) {

            state.bg_flag = true
            state.topic[2][state.index].isClick = true
        }
        state.topic1Answer[state.index] = val
    }


    const getChangeLabel = e => { //获取选择题作答选项
        const val=e.target.value
        console.log(val)
        state.radio[state.index] = val //当前选择的序号
        if (val) {
            let data = state.topic[1]
            state.bg_flag = true
            state.topic[0][state.index]["isClick"] = true
        }
    }
    const choose = <Radio.Group onChange={getChangeLabel}>
        <Radio value={1}>{state.showAnswer.answerA}</Radio>
        <Radio value={2}>{state.showAnswer.answerA}</Radio>
        <Radio value={3}>{state.showAnswer.answerA}</Radio>
        <Radio value={4}>{state.showAnswer.answerA}</Radio>
    </Radio.Group>
    const input =  range(state.part)?.map((it, currentIndex) =>
        <div key={currentIndex}>
            <Input placeholder="Basic usage" onBlur={fillBG} onChange={(e) => {
                state.fillAnswer[state.index][currentIndex] = e.target.value
            }}
            />
        </div>
    )
    const judges = <Radio.Group onChange={getJudgeLabel}>
        <Radio value={1}>正确</Radio>
        <Radio value={2}>错误</Radio>
    </Radio.Group>

    return <div className="answer">
        <div className="topic">
            <ul className="header">
                <li>
                    <div className="dot">当前</div>
                </li>
                <li>
                    <div className="dot">未答</div>
                </li>
                <li>
                    <div className="dot">已答</div>
                </li>
                <li>
                    <div className="dot">标记</div>
                </li>
            </ul>
            <div>
                <div>
                    <div>选择题部分</div>
                    <div className="choose">
                        {state.topic[0]?.map((it, index) =>
                            <li><a href="javascript:;"
                                   onClick={() => change(index)}
                                // style={{ ' border-radius':'50px'}}
                                   style={{
                                       borderRadius:
                                           state.index === index && state.currentType === 1 ? '0px' : '50px',
                                       display: 'flex',
                                       width: '40px',
                                       height: '40px',
                                       backgroundColor:
                                           state.bg_flag && state.topic[0][index]?.isClick === true ? 'blue' : 'black'
                                   }}
                            >
                                <span className={state.tech === false ? 'mark' : 'none'}/>
                                {index + 1}
                            </a>
                            </li>
                        )}
                    </div>
                </div>
                <div>
                    <div>填空题部分</div>
                    <div className="choose">
                    {state.topic[1]?.map((it, index) =>
                        <a href="javascript:;" onClick={() => fill(index)}
                           style={{
                               borderRadius:
                               state.index === index && state.currentType === 2? '0px' : '50px',
                               display: 'flex',
                               width: '40px',
                               height: '40px',
                               backgroundColor:
                                   state.fillAnswer[index]?.[3] === true ? 'blue' : 'black'
                           }}
                        >
                                 <span className={state.tech === false ? 'mark' : 'none'}>
                            </span>{state.topicCount[0]+index + 1}
                        </a>)}
                </div>
                </div>
                <div>
                    <div>判断题部分</div>
                    <div className="choose">
                        {state.topic[2]?.map((it, index) =>
                            <a href="javascript:;" onClick={() => judge(index)}
                               style={{
                                   borderRadius:
                                       state.index === index && state.currentType === 3 ? '0px' : '50px',
                                   display: 'flex',
                                   width: '40px',
                                   height: '40px',
                                   backgroundColor:
                                       state.bg_flag && state.topic[2][index]?.isClick === true ? 'blue' : 'black'
                               }}
                            >
                                 <span className={state.tech === false ? 'mark' : 'none'}>
                            </span>{state.topicCount[0]+state.topicCount[1]+index+1}
                            </a>)}
                    </div>
                </div>
                <div onClick={commit}>结束考试</div>
            </div>
        </div>
        <div className="content">
            <div className="header">1</div>
            <div className="middle">
                <p class="text"><span class="number">{state.number}</span>{state.showQuestion}</p>
                {(state.currentType === 1) ? choose : (state.currentType === 2) ? input : judges}
            </div>
            <div className="bottom">
                <ul className="ul">
                    <li onClick={() => previous()}><span>上一题</span></li>
                    {/*<li onClick={() => mark()}><span>标记</span></li>*/}
                    <li onClick={() => next()}><span>下一题</span></li>
                </ul>
            </div>
        </div>

    </div>
}




