import React, { Component } from 'react';
import {View,Text} from 'react-native';

export default class EntryDetails extends Component {
    render(){
        return (
            <View>
                <Text>EntryDetails {this.props.route.params.id}</Text>
            </View>
        );
    }
}