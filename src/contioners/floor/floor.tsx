import React, { Component } from 'react';
import '@/assets/css/floor.less';
import { getCarDetails, getCarCityLookFor, getAutoCity, getCarZui } from '../../api/index';
import { Checkbox } from 'antd-mobile';
import { Toast } from 'antd-mobile';

let cityid: any;
let num: any;
let numName: any;

export class floor extends Component<any> {
    state = {
        fot_data: [],
        name: '',
        tel: '',
    };
    async componentDidMount() {
        let loca: any = localStorage.getItem('obj');
        let locaJson = JSON.parse(loca);
        let { item, index } = this.props.history.location.state;
        num = Number(item.list[index ? index : 0].car_id);

        cityid = await getAutoCity();
        numName = locaJson === null ? cityid && cityid.data.data.CityName : locaJson.name;
        getCarCityLookFor(
            locaJson === null
                ? Number(item.list[index ? index : 0].car_id)
                : Number(locaJson.carid),
            locaJson === null ? Number(cityid.data.data.CityID) : Number(locaJson.id)
        ).then(res => {
            res.data.data.length === 0
                ? this.setState({
                      fot_data: [],
                  })
                : this.setState({
                      fot_data: res.data.data.list,
                  });
            console.log(res);
        });
    }
    onChange = (val: any) => {
        console.log(val);
    };
    showCity(id: number) {
        this.props.history.push('/city', { state: { id } });
    }
    car_L(id: number) {
        getCarDetails(Number(id)).then((res: any) => {
            this.props.history.push({
                pathname: `/model/:${id}`,
                state: {
                    item: res.data.data.list,
                },
            });
        });
        console.log(id);
    }
    successToast(con: any) {
        Toast.success(`${con}`, 1.5);
    }
    failToast(con: any) {
        Toast.fail(`${con}`, 1.5);
    }
    lookFor(name: string, tel: any) {
        getCarZui(name, tel, num, numName, Number(201)).then((res: any) => {
            Number(res.data.code) === 1
                ? this.successToast(res.data.data)
                : this.failToast(res.data.data);
        });
    }
    changEname(e: any) {
        this.setState({
            name: e.target.value,
        });
    }
    changEtel(e: any) {
        this.setState({
            tel: e.target.value,
        });
    }
    render() {
        let { item, index } = this.props.history.location.state;
        console.log(item);
        let { fot_data, name, tel } = this.state;
        let loca: any = localStorage.getItem('obj');
        let locaJson = JSON.parse(loca);
        return (
            <div className="floor_box">
                <header>可向多个商家咨询最低价，商家即使回复</header>
                <main>
                    <div
                        className="top_mess"
                        onClick={() => {
                            this.car_L(item.SerialID);
                        }}
                    >
                        <p>
                            <img src={item.Picture} alt="" />
                        </p>
                        <p>
                            <span>{item.AliasName}</span>
                            <span>
                                {item.list[index].market_attribute.year}款
                                {item.list[index].car_name}
                            </span>
                        </p>
                        <p>></p>
                    </div>
                    <div className="pim">
                        <p>个人信息</p>
                        <p>
                            <span>姓名</span>
                            <input
                                type="text"
                                value={this.state.name}
                                onInput={e => {
                                    this.changEname(e);
                                }}
                            />
                        </p>
                        <p>
                            <span>手机</span>
                            <input
                                type="text"
                                value={this.state.tel}
                                onInput={e => {
                                    this.changEtel(e);
                                }}
                            />
                        </p>
                        <p
                            onClick={() => {
                                this.showCity(item.list[index].car_id);
                            }}
                        >
                            <span>城市</span>
                            <input type="text" />
                            {locaJson === null
                                ? cityid && cityid.data.data.CityName
                                : locaJson.name}
                        </p>
                        <button
                            onClick={() => {
                                this.lookFor(name, tel);
                            }}
                        >
                            寻最低价
                        </button>
                    </div>
                    <div className="dress_city">
                        <p>选择报价经销商</p>
                        {fot_data.length === 0 ? (
                            <p className="zanNode">暂无经销商</p>
                        ) : (
                            fot_data.map((item: any, index: number) => {
                                return (
                                    <div className="eve_carAdress">
                                        <Checkbox checked={true}></Checkbox>
                                        <div>
                                            <p>{item.dealerShortName}</p>
                                            <p>{item.address}</p>
                                        </div>
                                        <div>
                                            <p>
                                                {Number(item.promotePrice) === 0
                                                    ? '暂无'
                                                    : item.promotePrice + `万`}
                                            </p>
                                            <p>{item.saleRange}</p>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </main>
            </div>
        );
    }
}
export default floor;
