import React, { Component } from 'react';
import {View,Text} from 'react-native';
import { fetchCalendarResults } from '../utils/api';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderMessage } from '../utils/helpers';
import UdaciFitnessCalendar from 'udacifitness-calendar-fix';

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
                if(!entries[timeToString()]){
                    dispatch(addEntry({
                        [timeToString()]: getDailyReminderMessage()
                    }))
                }
            })
    }
    renderItem = ({today, ...metrics},formattedDate,key) => (
        <View>
            {today 
                ? <Text>{JSON.stringify(today)}</Text>
                : <Text>{JSON.stringify(metrics)}</Text>}
        </View>
    )
    renderEmptyDate = (formattedDate) => {
        return (
            <View>
                <Text>No Data for This day</Text>
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