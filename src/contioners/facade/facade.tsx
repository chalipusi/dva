import React, { Component } from 'react';
import '@/assets/css/facade.less';
export class facade extends Component<any> {
    componentDidMount() {}

    render() {
        let { item } = this.props.history.location.state;
        console.log(item);
        return (
            <div className="facade_box">
                <header>
                    <span>全部颜色 v</span>
                    <span>全部车款 v</span>
                </header>
                <main>
                    <div className="img_box_top">
                        {item.map((item: any, index: number) => {
                            return (
                                <div className="bufen" key={index}>
                                    <div className="posi_frist">
                                        <p>
                                            <span>{item.Name}</span>
                                            <span>{item.Count}张></span>
                                        </p>
                                    </div>
                                    {item.List.map((ite: any, ind: number) => {
                                        return <img key={ind} src={ite.Url} alt="" />;
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>
        );
    }
}

export default facade;
