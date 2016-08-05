/**
 * Slide.js
 *
 * @Author: jruif
 * @Date: 16/7/28 下午12:17
 */

import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, ListView, PanResponder,
    Image, Dimensions, Animated, TouchableHighlight } from 'react-native';

let { height, width } = Dimensions.get('window');

class ImageSlider extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            left: new Animated.Value(0),
            index: 0,       // 当前焦点
            direction: 1    // 方向, 1 / -1
        };
        this._move = this._move.bind(this);
        this._clearTimer = this._clearTimer.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let { dataSource, time } = nextProps;
        if (dataSource.length) {
            this.timer = setTimeout(
                () => this._move(this.state.index + this.state.direction),
                time
            );
        }
    }

    componentWillMount() {
        let release = (e, gestureState) => {
            let { dataSource } = this.props;
            let relativeDistance = gestureState.dx / width; // 从触摸操作开始时的累计横向路程 / 屏幕宽
            let vx = gestureState.vx; // 当前的横向移动速度
            let change = 0;

            if (relativeDistance < -0.5 || (relativeDistance < 0 && vx <= 0.5)) {
                change = 1;
            } else if (relativeDistance > 0.5 || (relativeDistance > 0 && vx >= 0.5)) {
                change = -1;
            }
            if (this.state.index === 0 && change === -1 || this.state.index + change >= dataSource.length) {
                change = 0;
            }
            this._move(this.state.index + change);
        };

        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            //onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
            // 一般来说这意味着一个手势操作已经成功完成。
            onPanResponderRelease: release,
            // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            onPanResponderTerminate: release,
            // 最近一次的移动距离为gestureState.move{X,Y}
            // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
            onPanResponderMove: (e, gestureState) => {
                let dx = gestureState.dx;
                this._clearTimer();
                this.state.left.setValue(-(this.state.index * width) + Math.round(dx));
            }
        });
    }

    componentWillUnmount() {
        this._clearTimer();
    }

    _clearTimer() {
        // 如果存在this.timer，则使用clearTimeout清空。
        this.timer && clearInterval(this.timer);
    }

    _move(index) {
        let { dataSource, time } = this.props;
        let direction = this.state.direction;
        this._clearTimer();
        Animated.spring(this.state.left, {
            toValue: index * -width, friction: 10, tension: 20
        }).start();
        if (index <= 0) {
            direction = 1;
        } else if (index >= dataSource.length - 1) {
            direction = -1;
        }
        this.setState({
            index,
            direction
        });
        this.timer = setTimeout(
            () => this._move(this.state.index + this.state.direction),
            time
        );
    }

    render() {
        let { style, dataSource } = this.props;
        return (<View style={[{height:200,width:width}, style]}>
            <Animated.View style={[styles.imgList,{
                width: width * dataSource.length,
                transform: [{translateX: this.state.left}]
            }]} {...this._panResponder.panHandlers}>
                {
                    dataSource.map((item, i) =>
                        <TouchableHighlight key={i} style={styles.imgTouch}
                            underlayColor="#fff" onPress={() => console.log(i)}>
                            <Image source={{uri: item.uri}} style={styles.img} />
                        </TouchableHighlight>
                    )
                }
            </Animated.View>
            <View style={styles.text}>
                {
                    dataSource.map((item, i) =>
                        <TouchableHighlight key={i}
                            underlayColor="#fff"
                            style={[styles.button, this.state.index === i && styles.selected]}
                            onPress={() => this._move(i)}>
                            <View />
                        </TouchableHighlight>
                    )
                }
            </View>
        </View>)
    }
}
const styles = StyleSheet.create({
    imgList: {
        flexDirection: 'row',
        flex: 1,
    },
    imgTouch:{
        flex: 1,
        backgroundColor: '#f60',
    },
    img: {
        //width: width,
        flex: 1,
        resizeMode: Image.resizeMode.contain,
    },
    text: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        right: 20,
        padding: 5,
        borderRadius: 10,
        opacity: 0.8,
    },
    button: {
        width: 5,
        height: 5,
        marginLeft: 3,
        marginRight: 3,
        borderRadius: 4,
        backgroundColor: '#333',
        opacity: 0.9,
    },
    selected: {
        opacity: 1,
        backgroundColor: '#fff',
    }
});

ImageSlider.propTypes = {
    style: PropTypes.number,
    dataSource: PropTypes.array,
    time: PropTypes.number,
};

ImageSlider.defaultProps = {
    dataSource: [],
    time: 3000
};
export default ImageSlider;
