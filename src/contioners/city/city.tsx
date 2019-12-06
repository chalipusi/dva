import React, { Component } from 'react';
import { getCarCity, getCarCityAuto, getCarCityRight } from '../../api/index';
import '@/assets/css/city.less';
import { Drawer } from 'antd';

export class city extends Component<any> {
    state = {
        autoCity: '',
        cittList: [],
        visible: false,
        MarRight: [],
    };
    componentDidMount() {
        getCarCity().then(res => {
            this.setState({
                cittList: res.data.data,
            });
        });
        getCarCityAuto().then(res => {
            this.setState({
                autoCity: res.data.data.CityName,
            });
        });
    }
    showDrawer = (val: any) => {
        this.setState({
            visible: true,
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    getCityShi(id: number) {
        getCarCityRight(Number(id)).then(res => {
            this.setState({
                visible: true,
                MarRight: res.data.data,
            });
        });
    }
    pitchCity(e: any) {
        let { id } = this.props.history.location.state.state;
        var objs = {
            'name': e.CityName,
            'id': e.CityID,
            'carid': id,
        };
        localStorage.setItem('obj', JSON.stringify(objs));
        this.props.history.go(-1);
    }
    render() {
        let { autoCity, cittList, MarRight } = this.state;
        return (
            <div className="city_box">
                <div className="cityTop">
                    <span>自动定位</span>
                    <p>
                        <span>{autoCity}</span>
                        <span>></span>
                    </p>
                </div>
                <div className="cityBot">
                    <span>省市</span>
                    {cittList.length &&
                        cittList.map((item: any, index: number) => {
                            return (
                                <p
                                    key={index}
                                    onClick={() => {
                                        this.getCityShi(item.CityID);
                                    }}
                                >
                                    <span>{item.CityName}</span>
                                    <span>></span>
                                </p>
                            );
                        })}
                </div>
                <Drawer
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <div className="right_box">
                        {MarRight.length &&
                            MarRight.map((item: any, index: number) => {
                                return (
                                    <p
                                        key={index}
                                        onClick={(e: any) => {
                                            this.pitchCity(item);
                                        }}
                                    >
                                        {item.CityName}
                                    </p>
                                );
                            })}
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default city;
