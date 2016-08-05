/**
 * wel.js
 *
 * @Author: jruif
 * @Date: 16/7/27 下午9:52
 */

import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, AlertIOS,
    Dimensions, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Action from '../action/app';
import scale from '../util/scale';

import ImageSlider from '../common/ImageSlider';
import GoodsItem from './GoodsItem';

const styles = scale({
    container: {
        backgroundColor: '#F5FCFF',
    },
    content: {
        height: 250,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#e2e2e2',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    twoView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#e2e2e2',
        marginBottom: 10,
        height: 120,
    },
    twoButton: {
        flex: 1,
        height: 120,
    },
    buttonChild:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 84,
        height:  84,
        marginRight:8,
    },
    image: {
        backgroundColor: '#F50000',
        height: 200
    },
    borderLeft:{
        borderLeftWidth: 1,
        borderStyle: 'solid',
        borderColor: '#e2e2e2'
    },
    btnText:{
        fontSize: 30,
    },
    twoText:{
        flexDirection: 'column',
        justifyContent: 'center',
    },
    tip:{
        fontSize: 22,
        color: '#aaa',
        marginTop: 5,
    },
    goods:{
        marginBottom: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#e2e2e2',
    }
});

class Welcome extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSource: []
        };
        this.onSetupOrLogin = this.onSetupOrLogin.bind(this);
        //this._onForward = this._onForward.bind(this);
        //this._onBack = this._onBack.bind(this);
    }

    /*_onForward(){
     let { navigator } = this.props;
     navigator.pop();
     }
     _onBack(){
     let { navigator } = this.props;
     //navigator.push(nextRoute);
     }*/
    componentDidMount() {
        let url = 'https://placeholdit.imgix.net/~text?txtsize=35&txt=375%C3%97145&w=375&h=145';
        console.log(url);
        this.timer = setTimeout(
            () => this.setState({
                dataSource: [
                    {uri: url, title: '1'},
                    {uri: url, title: '2'},
                    {uri: url, title: '3'},
                    {uri: url, title: '4'}
                ]
            }), 1000
        );
    }

    onSetupOrLogin(){
        let { routes, jumpTo } = this.props;
        AlertIOS.alert(
            '参与赢积分抢大礼',
            '尼玛还不快去登陆!',
            [
                {text: '取消', onPress: () => console.log('Cancel Pressed')},
                {text: '前往', onPress: () => jumpTo(routes[3]) },
            ]
        );
    }

    render() {
        let { app } = this.props;
        let img = 'https://placeholdit.imgix.net/~text?txtsize=26&txt=280%C3%97186&w=280&h=186';
        return (
            <ScrollView style={styles.container}>
                <ImageSlider style={styles.content} dataSource={ this.state.dataSource }/>
                <View style={styles.twoView}>
                    {
                        [{
                            icon: require('../image/shop.png'),
                            btnText: '我的商场',
                            tip:'立即登陆查看',
                            onPress: this.onSetupOrLogin
                        },{
                            icon: require('../image/sign.png'),
                            btnText: '每日签到',
                            tip:'100% 中奖'
                        }].map((item,i) =>
                            <TouchableHighlight style={[styles.twoButton, i > 0 && styles.borderLeft]}
                                underlayColor="#fff" key={i} onPress={ item.onPress } >
                                <View style={styles.buttonChild}>
                                    <Image source={ item.icon } style={styles.icon}/>
                                    <View style={styles.twoText}>
                                        <Text style={styles.btnText}>{item.btnText}</Text>
                                        <Text style={styles.tip}>{item.tip}</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )
                    }
                </View>
                <GoodsItem dataSource={[
                    { img, title:'有情怀', price:'2999金币 + 8元'},
                    { img, title:'有底线', price:'2999金币 + 8元'},
                    { img, title:'有度量', price:'2999金币 + 8元'},
                    { img, title:'有胸襟', price:'2999金币 + 8元'}
                ]} title="模糊定义检验真爱" style={styles.goods}/>
                <TouchableHighlight style={{height:200}} onPress={() => console.log(1)}>
                    <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                        style={styles.image}
                    />
                </TouchableHighlight>
                <Text>{app.name}</Text>
            </ScrollView>
        )
    }
}

Welcome.propTypes = {
    navigator: PropTypes.object,
    app: PropTypes.object,
    actions: PropTypes.object
};

export default connect(
    state => ({
        app: state.app
    }),
    dispatch => ({
        actions: bindActionCreators(Action, dispatch)
    })
)(Welcome);
//export default Welcome;
