import React, { Component } from 'react';
import {View,Text,StyleSheet, Platform, TouchableOpacity} from 'react-native';
import { fetchCalendarResults } from '../utils/api';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderMessage } from '../utils/helpers';
import UdaciFitnessCalendar from 'udacifitness-calendar-fix';
import { white } from '../utils/colors';
import DateHeader from './DateHeader';

class History extends Component{
    componentDidMount(){
        const {dispatch} = this.props
        fetchCalendarResults()
            .then(entries => dispatch(receiveEntries(entries)) )
            // the next is the result of the dispatch witch is the object which contains a type of RECEIVE_ENTRIES
            // and the entries
            .then(({entries}) => {
                // this checks if there is entry for this day and if there isn't
                // it returns the reminder message to appear on that entry
                console.log(entries)
                if(!entries[timeToString()]){
                    dispatch(addEntry({
                        [timeToString()]: getDailyReminderMessage()
                    }))
                }
            })
    }
    renderItem = ({today, ...metrics},formattedDate,key) => (
        <View style={styles.day}>
            {console.log(formattedDate)}
            {today 
                ? <View>
                    <DateHeader date={formattedDate}/>
                    <Text style={styles.noDataText}>{today}</Text>
                  </View>
                : <TouchableOpacity>
                    <DateHeader date={formattedDate}/>
                    <Text>{JSON.stringify(metrics)}</Text>
                  </TouchableOpacity>}
        </View>
    )
    renderEmptyDate = (formattedDate) => {
        return (
            <View style={styles.day}>
                <DateHeader date={formattedDate}/>
                <Text style={styles.noDataText}>No Data for This day</Text>
            </View>
        )
    }
    render(){
        return (
            <View style={{flex:1}}>
                <UdaciFitnessCalendar 
                    items={this.props.entries}
                    renderItem={this.renderItem}
                    renderEmptyDate={this.renderEmptyDate}
                />
            </View>
        );
    }
}

const mapStateToProps = (entries) => {
    return {
        entries
    }
}

export default connect(mapStateToProps)(History);

const styles = StyleSheet.create({
    day:{
        backgroundColor:white,
        borderRadius:Platform.OS === 'ios' ? 12 : 3,
        margin:5,
        padding:10,
    },
    noDataText:{
        fontSize:18,

    }
});