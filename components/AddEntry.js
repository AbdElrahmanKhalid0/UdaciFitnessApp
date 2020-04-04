import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar} from 'react-native';
import { getMetricMetaInfo, timeToString, getDailyReminderMessage } from '../utils/helpers';
import UdaciStepper from './UdaciStepper';
import UdaciSlider from './UdaciSlider';
import DateHeader from './DateHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import TextButton from './TextButton';
import { submitEntry, removeEntry } from '../utils/api';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import { purple, white } from '../utils/colors';

const SubmitBtn = ({onPress}) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}


class AddEntry extends Component{
    state = {
        run:0,
        bike:0,
        swim:0,
        sleep:0,
        eat:0
    }
    increment = metric => {
        const { step,max } = getMetricMetaInfo(metric);

        this.setState(state => {
            const count = state[metric] + step;
            return {
                ...state,
                [metric]: count > max ? max : count
            }
        });
    }
    decrement = metric => {
        this.setState(state => {
            const count = state[metric] - getMetricMetaInfo(metric).step;
            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        });
    }
    slide = (metric,value) => {
        this.setState({
            [metric]:value
        });
    }
    submit = () => {
        // this gets the now day and sets it as a key to the data
        const key = timeToString()
        const entry = this.state

        // ----TODO LIST----
        // navigate the user to home
        // clear the notification that wants the user to enter the day data
        
        // save the data to the database(AsyncStorage)
        submitEntry({key,entry});
        
        // update the redux store
        this.props.dispatch(addEntry({
            [key]:entry
        }))

        this.setState({
            run:0,
            bike:0,
            swim:0,
            sleep:0,
            eat:0
        })
    }
    reset = () => {
        const key = timeToString()

        // ----TODO LIST----
        // navigate the user to home
        
        // update the redux store
        this.props.dispatch(addEntry({
            [key]: getDailyReminderMessage()
        }))

        // ramove the data from the database
        removeEntry(key);
    }
    render(){
        const metaInfo = getMetricMetaInfo();
        if(this.props.alreadyLogged){
            return(
                <View style={styles.alreadyLoggedView}>
                    {Platform.OS === 'ios' ? (<SimpleLineIcons style={{marginBottom:10}} name='emotsmile' size={100} color='black'/>) :
                    (<FontAwesome name='smile-o' size={100} color='black'/>)}
                    <Text>you have already logged information for this day</Text>
                    <TextButton onPress={this.reset}>
                        reset
                    </TextButton>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <DateHeader date={new Date().toLocaleDateString()}/>
                {Object.keys(metaInfo).map(key => {
                    const { type,getIcon,...rest } = metaInfo[key];
                    const value = this.state[key];
                    
                    return(
                        <View key={key} style={styles.row}>
                            {getIcon()}
                            {type === 'slider' ? (
                                <UdaciSlider
                                    value={value}
                                    onChange={(value) => this.slide(key,value)}
                                    {...rest}
                                />
                            ) : (
                                <UdaciStepper
                                    value={value}
                                    onIncrement = {() => this.increment(key)}
                                    onDecrement = {() => this.decrement(key)}
                                    {...rest}
                                />
                            )}
                        </View>
                        )
                })}
                <SubmitBtn onPress={this.submit}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:5,
    },
    row:{
        flexDirection:'row',
        flex:1,
        alignItems:"center"
    },
    iosSubmitBtn:{
        backgroundColor:purple,
        borderRadius:10,
        marginRight:40,
        marginLeft:40,
        height:45,
        padding:5,
    },
    androidSubmitBtn:{
        backgroundColor:purple,
        borderRadius:5,
        marginRight:10,
        marginLeft:150,
        height:45,
    },
    submitBtnText:{
        color:white,
        fontSize:25,
        textAlign:'center'
    },
    alreadyLoggedView:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
})


const mapStateToProps = state => {
    const key = timeToString();
    
    return {
        alreadyLogged: state[key] && !state[key].today
    }
}

export default connect(mapStateToProps)(AddEntry);