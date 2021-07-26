import GitalkComponent from "gitalk/dist/gitalk-component";
export function Comments(){
    return <div className="demo">

        <GitalkComponent

            options={{
                clientID: '4130193c6f320ad17823', // 上面申请到的
                clientSecret: 'b7ee9b950aba49adf47cab15c6cb6fabbfc02d70',
                repo: 'edc.github.io', //存放评论的仓库名称，可以是随便一个仓库，这里就用博客仓库好了。
                owner: 'edcjian', //github用户名
                admin: ['edcjian'], //这博客仓库可以操作的用户名
                // proxy:'https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token',
                createIssueManually:true,
                id: 'comments', //唯一值，用来标记是哪个页面的评论，可以用window.location.pathname,我这里用到的地方不多，所以就为每个页面手动设置了
            }}
        />

    </div>
}
