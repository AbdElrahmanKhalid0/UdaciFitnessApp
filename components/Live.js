import React, { Component } from 'react';
import { View,Text,ActivityIndicator,StyleSheet,Platform,TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { purple, white } from '../utils/colors';

export default class Live extends Component{
    state={
        coords:null,
        status:'success',
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
            <View style={styles.container}>
                <View style={[styles.center,{flex:1}]}>
                    <Text style={styles.headingText}>You're heading</Text>
                    <Text style={styles.direction}>North</Text>
                </View>
                <View style={[styles.center,styles.footer]}>
                    <View style={styles.subContainer}>
                        <Text style={[styles.headingText,{color:white}]}>Altitude</Text>
                        <Text style={styles.metricText}>{200} Feet</Text>
                    </View>
                    <View style={styles.subContainer}>
                        <Text style={[styles.headingText,{color:white}]}>Speed</Text>
                        <Text style={styles.metricText}>{300} MPH</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    subContainer:{
        flex:1,
        backgroundColor:'#464280', //lighter that the purble a little bit
        height:70,
        justifyContent:'center',
        alignItems:'center',
        margin:5,
    },
    headingText:{
        fontSize:25
    },
    metricText:{
        fontSize:18,
        color:white
    },
    footer:{
        backgroundColor:purple,
        height:100,
        flexDirection:"row",
        padding:15,
    },
    direction:{
        fontSize:60,
        color:purple
    },
    center:{
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