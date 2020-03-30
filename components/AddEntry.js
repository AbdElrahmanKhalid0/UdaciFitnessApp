import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import UdaciStepper from './UdaciStepper';
import UdaciSlider from './UdaciSlider';
import DateHeader from './DateHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TextButton from './TextButton'

const SubmitBtn = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>Submit</Text>
        </TouchableOpacity>
    )
}


export default class AddEntry extends Component{
    state = {
        run:0,
        bike:0,
        swim:0,
        sleep:0,
        food:0
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
        // update the redux store
        // navigate the user to home
        // clear the notification that wants the user to enter the day data
        // save the data to the database

        this.setState({
            run:0,
            bike:0,
            swim:0,
            sleep:0,
            food:0
        })
    }
    reset = () => {
        const key = timeToString()

        // ----TODO LIST----
        // update the redux store
        // navigate the user to home
        // save the data to the database
    }
    render(){
        const metaInfo = getMetricMetaInfo();

        if(this.state.alreadyLogged){
            return(
                <View>
                    <FontAwesome name='smile-o' size={100} color='black'/>
                    <Text>you have already logged information for this day</Text>
                    <TextButton onPress={this.reset}>
                        reset
                    </TextButton>
                </View>
            )
        }
        return (
            <View>
                <DateHeader date={new Date().toLocaleDateString()}/>
                {Object.keys(metaInfo).map(key => {
                    const { type,getIcon,...rest } = metaInfo[key];
                    const value = this.state[key];
                    
                    return(
                        <View key={key}>
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