import se from "../../img/se.png";
import like from "../../img/like.png";
import fen from "../../img/fen.png";
import shou from "../../img/shou.png";
import {Link} from "react-router-dom";
import pinlun from '../../img/pinlun.png'
import './content.scss'
import {Action} from "./Action";


export function Answer({id,  content,comment, anumber, problemId: {title},userId:{name,intro}}) {
    const links = `https://www.zhihu.com/question/476259609/answer/${id}`

    function show() {

    }

    return   <div className="content">
            <div className="title">
                {/*<img src={se} alt=""/>*/}
                <div>
                    <div>{name}</div>
                    <div> {intro}</div>

                </div>
            </div>

            <div className="article">

                <div>{content}</div>
                <div></div>
                <Link to='/detail'>阅读全文</Link>
            </div>

            <Action anumber={anumber} comment={123}/>


        </div>

}
