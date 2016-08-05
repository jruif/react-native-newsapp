/**
 * TabBar.js
 *
 * @Author: jruif
 * @Date: 16/8/4 下午9:36
 */

import React, { Component, PropTypes } from 'react';
import { View, TouchableHighlight, Text, Image } from 'react-native';
import scale from '../util/scale';

class TabBar extends Component {
    constructor(props, context) {
        super(props, context);
        let { index } = this.props;
        this.state = {
            selectedTab: index,
            notifCount: 0,
            presses: 0,
        };
        this._onPressTabItem = this._onPressTabItem.bind(this);
    }

    _onPressTabItem(index) {
        let { routes, switchTab } = this.props;
        switchTab(routes[index]);
        //this.setState({selectedTab: index})
    }

    componentWillReceiveProps(nextProps){
        this.setState({selectedTab: nextProps.index})
    }

    render() {
        let { routes } = this.props;
        return (
            <View style={styles.tabBar}>
                {
                    routes.map(item => {
                        let selected = this.state.selectedTab === item.index;
                        return (
                            <TouchableHighlight style={ styles.tabBox } key={item.index} underlayColor="#f2f2f2"
                                onPress={ () => this._onPressTabItem(item.index)}>
                                <View style={styles.tabStyle}>
                                    <Image style={styles.icon} source={require('../image/tab_1.png')}/>
                                    <Text style={[styles.titleStyle, selected && styles.selectedTitleStyle]}>
                                        {item.name}
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        )
                    })
                }
            </View>
        )
    }
}

const styles = scale({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: "#f2f2f2",
        height: 100,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        borderStyle: 'solid',
    },
    tabBox:{
        flex: 1,
    },
    tabStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 45,
        height: 45,
        resizeMode: 'contain',
    },
    titleStyle: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        alignSelf: 'stretch',
        marginTop: 10,
    },
    selectedTitleStyle: {
        color: '#e10000',
    }
});

TabBar.propTypes = {
    routes: PropTypes.array,
    switchTab: PropTypes.func
};
export default TabBar;
