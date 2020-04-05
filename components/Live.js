import React, { Component } from 'react';
import { View,Text,ActivityIndicator,StyleSheet,Platform,TouchableOpacity,Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { purple, white } from '../utils/colors';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { calculateDirection } from '../utils/helpers';

export default class Live extends Component{
    state={
        coords:null,
        status:null,
        direction:'',
        bounceValue: new Animated.Value(1),
    }
    componentDidMount(){
        this.askPermission(); // this asks for the Location permission once the component mounts
        Permissions.getAsync(Permissions.LOCATION)
            .then(({status}) => {
                if (status === 'granted') {
                    this.setState({status})
                    return this.setLocation() // if there is a LOCAITON permission it will call the setLocation func
                }
                // other than that it will just update the status in the state
                this.setState({status})
            })
            .catch(err => {
                this.setState({status:'undetermined'});
                console.warn('There was an error in getting the Location Permission: ', err);
            })
    }
    askPermission = () => {
        Permissions.askAsync(Permissions.LOCATION)
            .then(({status}) => {
                if (status === 'granted') {
                    this.setState({status})
                    return this.setLocation() // if there is a LOCAITON permission it will call the setLocation func
                }
                // other than that it will just update the status in the state
                this.setState({status})
            })
            .catch(err => {
                this.setState({status:'undetermined'});
                console.warn('There was an error in asking the Location Permission: ', err);
            })
    }
    setLocation = () => {
        Location.watchPositionAsync({
            accuracy:Location.Accuracy.BestForNavigation,
            timeInterval:1, // in milliseconds
            distanceInterval:1, // in meters
        },({coords}) => {
            const newDirection = calculateDirection(coords.heading);
            const {direction,bounceValue} = this.state;

            if(direction !== newDirection){
                Animated.sequence([
                    Animated.timing(bounceValue,{toValue:1.04,duration:200}),
                    Animated.spring(bounceValue,{toValue:1,friction:4})
                ]).start()
            }

            this.setState({
                coords,
                status:'granted',
                direction:newDirection,
            })
        })
    }
    render(){
        const {coords,status,direction,bounceValue} = this.state;

        if(status === null){
            return (
                <View style={[styles.center,{flex:1}]}>
                    <ActivityIndicator size={50}/>
                </View>
            )
        };

        if(status === 'denied'){
            return (
                <View style={[styles.center,{flex:1}]}>
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
                <View style={[styles.center,{flex:1}]}>
                    <Ionicons style={{margin:10}} name={Platform.OS === 'ios' ? 'ios-warning' : 'md-warning'} size={50} color={purple}/>
                    <Text>You need To give us permission to use the App.</Text>
                    <TouchableOpacity style={styles.button} onPress={this.askPermission}>
                        <Text style={styles.buttonText}>Enable</Text>
                    </TouchableOpacity>
                </View>
            )
        };

        if(!coords) {
            return (
                <View style={[styles.center,{flex:1}]}>
                    <ActivityIndicator size={50}/>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={[styles.center,{flex:1}]}>
                    <Text style={styles.headingText}>You're heading</Text>
                    <Animated.Text style={[styles.direction,{transform:[{scale:bounceValue}]}]}>{direction}</Animated.Text>
                </View>
                <View style={[styles.center,styles.footer]}>
                    <View style={styles.subContainer}>
                        <Text style={[styles.headingText,{color:white}]}>Altitude</Text>
                        <Text style={styles.metricText}>{coords.altitude} Meters</Text>
                    </View>
                    <View style={styles.subContainer}>
                        <Text style={[styles.headingText,{color:white}]}>Speed</Text>
                        <Text style={styles.metricText}>{coords.speed.toFixed(1)} Meters/sec</Text>
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
        fontSize:70,
        color:purple,
        textAlign:'center',
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