import se from "../../img/se.png";
import like from "../../img/like.png";
import fen from "../../img/fen.png";
import shou from "../../img/shou.png";
import {Link} from "react-router-dom";
import pinlun from '../../img/pinlun.png'
export function Content({id, name, intro, text, anumber, problemId: {title}, comment}) {
    const links = `https://www.zhihu.com/question/476259609/answer/${id}`

    function show() {

    }

    return <div className="content">
        <div className="title">
            <img src={se} alt=""/>
            <div className="ta">
                {name}
                {intro}
            </div>
        </div>

        <div className="introduction">
            <Link to={"/problem/"+1}> {title} </Link>
            <div>{text}</div>
            <Link to='/detail'>阅读全文</Link>
        </div>

        <div className="action">
            <div className="icon">赞同{anumber}</div>
            <div className="icon"><img src={like} alt=""/></div>
            <div className="icon"><img src={pinlun} alt=""/>评论{comment}</div>
            <div className="icon"><img src={fen} alt=""/></div>
            <div className="icon"><img src={shou} alt=""/></div>
        </div>


    </div>;
}
