import React from 'react';
import {Action} from "./Action";
import './page.scss'
import {Link} from "react-router-dom";
export const Page =({text,problemId:{title,id},userId:{name}})=>{

    return <div className="page">
        <Link to={"/problem/"+id}> {title} </Link>
        <div>
            {name}: {text}
        </div>
          {/*<Action/>*/}

    </div>
}
