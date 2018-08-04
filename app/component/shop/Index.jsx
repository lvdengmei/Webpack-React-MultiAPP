import React from 'react';
import '../../pub/css/cmmon.pcss';
import '../../pub/css/shop.pcss';

class Index extends React.Component {
    render(){
        return (
            <div className="cont">
                <div className="top">
                    <div>这是头部</div>
                    <div>
                        <i className="logo"/>
                    </div>
                   <div className="nav">
                       <a href="/index.html">首页</a>
                       <a href="/shop.html">商城</a>
                   </div>
                </div>
                <div className="shop">
                    这是商城
                </div>
                <div className="bottom">
                    这是底部
                </div>
            </div>
        );
    }
}

export default Index;