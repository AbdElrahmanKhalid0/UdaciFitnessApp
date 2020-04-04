import React, { Component } from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import MetricCard from './MetricCard';
import TextButton from './TextButton';
import { addEntry } from '../actions';
import { timeToString, getDailyReminderMessage } from '../utils/helpers';
import { removeEntry } from '../utils/api';

class EntryDetails extends Component {
    componentDidMount(){
        const date = new Date(this.props.route.params.id)
        
        const year = date.getFullYear()
        const month = date.getMonth() + 1 // As it returns the index of the month not the actual number
        const day = date.getDate()

        const title = `${day}/${month}/${year}`;

        this.props.navigation.setOptions({title});
    }
    reset = () => {
        const {remove,goHome} = this.props;
        console.log('herre')
        remove();
        goHome();
        removeEntry(this.props.route.params.id);
    }
    shouldComponentUpdate(nextProps){
        // this makes sure that the component won't update unless there is a metrics property and 
        // if there was a metrics ensures that it doesn't have today property in its metrics
        return nextProps.metrics && !nextProps.metrics.today;
    }
    render(){
        return (
            <View style={styles.container}>
                <MetricCard metrics={this.props.metrics}/>
                <TextButton onPress={this.reset} styles={{textAlign:'center',marginTop:30}}>
                    RESET
                </TextButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:15,
    }
});

const mapStateToProps = (state,{route}) => {
    const {id} = route.params;
    console.log('here')
    console.log(state[id])
    return {
        metrics:state[id],
    }
};

const mapDispatchToProps = (dispatch,{navigation,route}) => {
    const {id} = route.params;
    return {
        remove: () => dispatch(addEntry({
            // this checks if the day was today so it will set it to the reminder message other than 
            // that it will set it to null
            [id]: timeToString() === id ? getDailyReminderMessage() : null
        })),
        goHome: () => navigation.goBack(),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EntryDetails);