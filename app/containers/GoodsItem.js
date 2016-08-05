/**
 * GoodsItem.js
 *
 * @Author: jruif
 * @Date: 16/7/29 上午11:15
 */
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, Image, AlertIOS,
    Dimensions, TouchableHighlight } from 'react-native';
import scale from '../util/scale';
let { height, width } = Dimensions.get('window');

class GoodsItem extends Component{
    constructor(props, context) {
        super(props, context);
    }

    render(){
        let { dataSource, style, title } = this.props;
        return (
            <View style={[style,styles.wrap]}>
                <View style={styles.head}>
                    <Text style={styles.headText}>{title}</Text>
                </View>
                <View style={styles.box}>
                {
                    dataSource.map( (item,i) => (
                        <TouchableHighlight style={[styles.item,i % 2 && styles.item2n]} key={i}
                            underlayColor="#fff" onPress={() => {}}>
                            <View style={{flex:1}}>
                                <Image style={styles.img} source={{ uri: item.img}}/>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.price}>{item.price}</Text>
                            </View>
                        </TouchableHighlight>
                    ))
                }
                </View>
            </View>
        )
    }
}

GoodsItem.propType = {
    dataSource: PropTypes.array,
    style: PropTypes.number,
    title: PropTypes.string,
};

const styles = scale({
    wrap:{
        flex: 1
    },
    head:{
        height: 70,
        paddingHorizontal: 12,
        paddingVertical: 20,
        borderTopColor: '#fe8501',
        borderTopWidth: 2,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2',
    },
    headText:{
        fontSize: 30,
    },
    box:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item:{
        width: '0.5',
        height: 300,
        paddingHorizontal: 20,
        paddingTop: 20,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2',
    },
    item2n:{
        borderStyle: 'solid',
        borderLeftWidth: 1,
        borderLeftColor: '#e2e2e2',
    },
    img:{
        //height: 186,
        resizeMode: Image.resizeMode.contain,
        flex:1
    },
    title: {
        fontSize: 26,
        paddingTop: 5,
        paddingBottom: 5,
    },
    price: {
        fontSize: 24,
        paddingTop: 5,
        paddingBottom: 5,
        color: '#E10000',
    },
});

export default GoodsItem;
