import React, { Component } from 'react';
import '@/assets/css/model.less';

export class model extends Component<any> {
    render() {
        let { item } = this.props.history.location.state;
        let uio: any = Array.from(
            new Set(
                item.map((ite: any) => {
                    return ite.market_attribute.year;
                })
            )
        );
        console.log(uio);
        return (
            <div className="model_box">
                {uio.map((items: any, index: number) => {
                    return (
                        <div key={index}>
                            <h3>{items}</h3>
                            {item.map((ite: any, indexs: number) => {
                                return Number(ite.market_attribute.year) === Number(items) ? (
                                    <div className="eve_model" key={indexs}>
                                        <p>
                                            {ite.exhaust_str}/{ite.max_power_str}
                                            {ite.inhale_type}
                                        </p>
                                        <p>
                                            <span>
                                                {ite.market_attribute.year}
                                                {ite.car_name}
                                            </span>
                                            <span>{ite.market_attribute.dealer_price_min}</span>
                                        </p>
                                        <p>
                                            <span>
                                                {ite.horse_power}马力{ite.gear_num}
                                                {ite.trans_type}
                                            </span>
                                            <span>
                                                指导价：{ite.market_attribute.official_refer_price}
                                            </span>
                                        </p>
                                    </div>
                                ) : (
                                    ''
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default model;
