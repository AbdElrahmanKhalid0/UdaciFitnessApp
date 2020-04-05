import React, { Component } from 'react';
import { View,Text,ActivityIndicator,StyleSheet,Platform,TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { purple, white } from '../utils/colors';

export default class Live extends Component{
    state={
        coords:null,
        status:'denied',
        direction:'',
    }
    askPermission = () => {

    }
    render(){
        const {coords,status,direction} = this.state;

        if(status === null){
            return (
                <ActivityIndicator style={{marginTop:30}}/>
            )
        };

        if(status === 'denied'){
            return (
                <View style={styles.center}>
                    <Ionicons style={{margin:10}} name={Platform.OS === 'ios' ? 'ios-warning' : 'md-warning'} size={50} color={purple}/>
                    <Text style={{textAlign:'center'}}>
                        You denied to give the application the location permission. You can fix this by visiting
                        your settings and enabling location services for this applicaiton.
                    </Text>
                </View>
            )
        };

        if(status === 'undetermined'){
            return (
                <View style={styles.center}>
                    <Ionicons style={{margin:10}} name={Platform.OS === 'ios' ? 'ios-warning' : 'md-warning'} size={50} color={purple}/>
                    <Text>You need To give us permission to use the App.</Text>
                    <TouchableOpacity style={styles.button} onPress={this.askPermission}>
                        <Text style={styles.buttonText}>Enable</Text>
                    </TouchableOpacity>
                </View>
            )
        };

        return (
            <View>
                <Text>Live</Text>
                <Text>{JSON.stringify(this.state)}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:15,
    },
    button:{
        backgroundColor:purple,
        width:100,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        margin:10,
        borderRadius: Platform.OS === 'ios' ? 8 : 3,
    },
    buttonText:{
        fontSize:20,
        color:white,
    }
});