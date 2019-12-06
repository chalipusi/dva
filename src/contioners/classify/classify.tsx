import React, { Component } from 'react';
import BScroll from 'better-scroll';
import '@/assets/css/classify.less';
import { getCarList, getCarRight, getCarDetails } from '../../api/index';
import { Drawer } from 'antd';
import { connect } from 'dva';
let num: any = null;
@connect((store: any) => {
    return store.home;
})
class classify extends Component<any> {
    state = {
        leftData: [],
        visible: false,
        MasterValue: [],
    };
    componentDidMount() {
        getCarList().then((res: any) => {
            this.setState({
                leftData: res.data.data,
            });
        });
        num = new BScroll('.classLeft', {
            click: true,
            scrollbar: true,
        });
    }
    toEle(index: number) {
        num.scrollToElement(this.refs[index], 1000);
    }
    showDrawer = (val: any) => {
        this.setState({
            visible: true,
        });
        getCarRight(val.MasterID).then(res => {
            this.setState({
                MasterValue: res.data.data,
            });
            new BScroll('.right_iop', {
                click: true,
                scrollbar: true,
            });
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    goDetails(item: any) {
        getCarDetails(Number(item.SerialID)).then(res => {
            this.props.history.push({
                pathname: `/details/:${item.SerialID}`,
                state: {
                    item: res.data.data,
                },
            });
        });
    }
    render() {
        let { leftData, MasterValue } = this.state;
        let leftHead: any =
            leftData.length &&
            Array.from(
                new Set(
                    leftData.map((item: any, index: number) => {
                        return item.Spelling.substr(0, 1);
                    })
                )
            );
        return (
            <div className="classify_box">
                <div className="classLeft">
                    <div>
                        {leftHead.length &&
                            leftHead.map((item: any, index: number) => {
                                return (
                                    <div className="eveDiv" key={index} ref={`${index}`}>
                                        <h4>{item}</h4>
                                        {leftData.map((val: any, ind: number) => {
                                            return item === val.Spelling.substr(0, 1) ? (
                                                <p
                                                    key={ind}
                                                    onClick={() => {
                                                        this.showDrawer(val);
                                                    }}
                                                >
                                                    <img src={val.CoverPhoto} alt="" />
                                                    <span>{val.Name}</span>
                                                </p>
                                            ) : (
                                                ''
                                            );
                                        })}
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <ol className="ols">
                    {leftHead.length &&
                        leftHead.map((item: any, index: number) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => {
                                        this.toEle(index);
                                    }}
                                >
                                    {item}
                                </li>
                            );
                        })}
                </ol>
                <div></div>);
                <div>
                    <Drawer
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <div className="right_iop">
                            <div>
                                {MasterValue.length &&
                                    MasterValue.map((ite: any, ind: number) => {
                                        return (
                                            <div key={ind} className="rightBox">
                                                <p>{ite.GroupName}</p>
                                                {ite.GroupList.map((item: any, index: number) => {
                                                    return (
                                                        <dl
                                                            key={index}
                                                            onClick={() => {
                                                                this.goDetails(item);
                                                            }}
                                                        >
                                                            <dt>
                                                                <img src={item.Picture} alt="" />
                                                            </dt>
                                                            <dd>
                                                                <p>{item.AliasName}</p>
                                                                <p>{item.DealerPrice}</p>
                                                            </dd>
                                                        </dl>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </Drawer>
                </div>
            </div>
        );
    }
}

export default classify;
