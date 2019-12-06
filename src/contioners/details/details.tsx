import React, { Component } from 'react';
import '@/assets/css/details.less';
import { getCarPhoto } from '../../api/index';

export class details extends Component<any> {
    state = {
        data: this.props.history.location.state.item.list,
        indexs: 0,
        aui: 0,
    };
    componentDidMount() {
        localStorage.clear();
    }

    getPhotoImg(id: number) {
        getCarPhoto(id).then((res: any) => {
            this.props.history.push({
                pathname: `/facade/:${id}`,
                state: {
                    item: res.data.data,
                },
            });
        });
    }
    switch(ind: number, e: any) {
        if (e.target.innerHTML === '全部') {
            this.setState({
                data: this.props.history.location.state.item.list,
                indexs: ind,
            });
        } else {
            let a = this.props.history.location.state.item.list.filter(
                (item: any, index: number) => {
                    return Number(item.market_attribute.year) === Number(e.target.innerHTML);
                }
            );
            this.setState({
                indexs: ind,
                data: a,
            });
        }
    }
    goFloor(item: any, index: any) {
        this.props.history.push({
            pathname: `/floor/:${item.SerialID}`,
            state: {
                item: item,
                index: index !== 0 ? index : this.state.aui,
            },
        });
    }
    render() {
        let { item } = this.props.history.location.state;
        let { indexs, data, aui } = this.state;
        console.log(item);
        let uio: any = Array.from(
            new Set(
                item.list.map((ite: any) => {
                    return ite.market_attribute.year;
                })
            )
        );
        let header_data = ['全部'].concat(uio);
        return (
            <div className="details_box">
                <main>
                    <div className="img_top" onClick={() => this.getPhotoImg(item.SerialID)}>
                        <img src={item.CoverPhoto} alt="" />
                        <button className="btn_pre">{item.pic_group_count}张图片</button>
                    </div>
                    <div className="deta_price">
                        <div>
                            <span>{item.market_attribute.dealer_price}</span>
                            <span>指导价：{item.market_attribute.official_refer_price}</span>
                        </div>
                        <button
                            onClick={() => {
                                this.goFloor(item, aui);
                            }}
                        >
                            询问低价
                        </button>
                    </div>
                    <div className="deta_filter">
                        {header_data.map((item: any, index: number) => {
                            return (
                                <span
                                    key={index}
                                    className={indexs === index ? 'active' : ''}
                                    onClick={e => {
                                        this.switch(index, e);
                                    }}
                                >
                                    {item}
                                </span>
                            );
                        })}
                    </div>
                    <div className="displace_box">
                        {data.map((items: any, index: number) => {
                            return (
                                <div className="eve_car">
                                    <p>
                                        <span>{items.exhaust_str}</span>/
                                        <span>{items.max_power_str}</span>
                                        <span>{items.inhale_type}</span>
                                    </p>
                                    <p>
                                        <span>{items.market_attribute.year} 款 </span>
                                        <span>{items.car_name}</span>
                                    </p>
                                    <p>
                                        <span>
                                            {items.horse_power}马力{items.gear_num}双离合
                                        </span>
                                    </p>
                                    <p>
                                        <span>
                                            指导价
                                            {items.market_attribute.official_refer_price}
                                        </span>
                                        <span>
                                            {items.market_attribute.dealer_price_min
                                                ? items.market_attribute.dealer_price_min + `起`
                                                : '暂无'}
                                        </span>
                                    </p>
                                    <button
                                        onClick={() => {
                                            this.goFloor(item, index);
                                        }}
                                    >
                                        询问底价
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </main>
                <footer
                    onClick={() => {
                        this.goFloor(item, aui);
                    }}
                >
                    <span>询问底价</span>
                    <span>本地经销商为你报价</span>
                </footer>
            </div>
        );
    }
}

export default details;
