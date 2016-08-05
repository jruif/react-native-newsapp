/**
 * scale.js
 *
 * @Author: jruif
 * @Date: 16/7/30 上午11:34
 */

import { Dimensions, StyleSheet, PixelRatio } from 'react-native';

let { height, width } = Dimensions.get('window');

/*
 * iphone 5/5s 宽 320
 * iphone 6    宽 375
 *
 * */
let pr = PixelRatio.get(0);
let rate = pr * width / 640; // 640 为设计图宽度;

console.log(width, pr);
function scale(styles) {
    Object.keys(styles).map(item => {
        let target = styles[item];
        Object.keys(target).map(elm => {
            if (elm !== 'flex' && target[elm] === 1) {
                target[elm] = StyleSheet.hairlineWidth;
            } else if (target[elm] === +target[elm]) {
                //target[elm] *= rate ;
                target[elm] = target[elm] / pr;
            } else if(elm === 'width' && typeof target[elm] === 'string'){
                target[elm] = width * ( +target[elm]);
            }
        });
    });
    return StyleSheet.create(styles);
}

export default scale;
