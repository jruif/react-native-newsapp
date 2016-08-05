/**
 * index.jsx
 *
 * @Author: jruif
 * @Date: 16/7/27 下午2:57
 */

import React, { Component, PropTypes } from 'react';
import { Navigator, Text, TouchableHighlight, View, Image } from 'react-native';
import Welcome from './wel.js';
import TabBar from '../common/TabBar';
import scale from '../util/scale';


class Index extends Component {
    constructor(props, context) {
        super(props, context);

        this.routes = [
            {title: '有态度俱乐部',name: '商场', index: 0, component: Welcome },
            {title: 'Second Scene',name: '活动',  index: 1, component: Welcome},
            {title: 'third Scene',name: '商场',  index: 2, component: Welcome},
            {title: 'four Scene',name: '用户中心',  index: 3, component: Welcome},
        ];
        this.state={
            index: this.routes[0].index
        };
        this._switchTab = this._switchTab.bind(this);
    }

    _switchTab( route ){
        let navigator = this.refs.navigator;
        let current = navigator.getCurrentRoutes();
        let filter = current.filter( item => item.index === route.index);
        navigator[!filter.length? 'push' :'jumpTo'](route);
        this.setState({index: route.index});
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Navigator ref="navigator"
                    initialRoute={ this.routes[0] }
                    initialRouteStack={ [this.routes[0]] }
                    renderScene={ (route, navigator) => {
                        let Component = route.component;
                        return <Component route={route} routes={this.routes} jumpTo={this._switchTab}/>;
                    }}
                    style={{flex: 1, paddingTop: 50}}
                    navigationBar={
                        <Navigator.NavigationBar
                            routeMapper={{
                                LeftButton: (route, navigator, index, navState) =>
                                    <Text style={styles.routerBarText}>搜索</Text>,
                                RightButton: (route, navigator, index, navState) =>
                                    <Text style={styles.routerBarText}>用户</Text>,
                                Title: (route, navigator, index, navState) =>
                                    <Text style={styles.routerBarText}>{route.title}</Text>,
                            }}
                            style={{backgroundColor: '#E10000', height: 50,}}
                        />
                    }
                />
                <TabBar routes={ this.routes } switchTab={this._switchTab} index={this.state.index}/>
            </View>
        );
    }
}

const styles = scale({
    routerBarText: {
        color: '#fff',
        paddingVertical: 15,
        fontSize: 30,
        paddingHorizontal: 10,
    }
});

Index.propTypes = {};

export default Index;