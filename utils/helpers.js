import React from 'react';
import {View,StyleSheet, AsyncStorage} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { white,red, orange, blue, lightPurp, pink } from './colors';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

const NOTIFICATION_KEY = 'Udacifitness:notifications';

export function isBetween (num, x, y) {
    if (num >= x && num <= y) {
      return true
    }
  
    return false
  }
  
  export function calculateDirection (heading) {
    let direction = ''
  
    if (isBetween(heading, 0, 22.5)) {
      direction = 'North'
    } else if (isBetween(heading, 22.5, 67.5)) {
      direction = 'North East'
    } else if (isBetween(heading, 67.5, 112.5)) {
      direction = 'East'
    } else if (isBetween(heading, 112.5, 157.5)) {
      direction = 'South East'
    } else if (isBetween(heading, 157.5, 202.5)) {
      direction = 'South'
    } else if (isBetween(heading, 202.5, 247.5)) {
      direction = 'South West'
    } else if (isBetween(heading, 247.5, 292.5)) {
      direction = 'West'
    } else if (isBetween(heading, 292.5, 337.5)) {
      direction = 'North West'
    } else if (isBetween(heading, 337.5, 360)) {
      direction = 'North'
    } else {
      direction = 'Calculating'
    }
  
    return direction
  }
  
  export function timeToString (time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
  }

  export function getMetricMetaInfo (metric){
    const info = {
      run:{
        displayName:'run',
        max:50,
        unit:'miles',
        step:1,
        type:'steppers',
        getIcon(){
          return (
            <View style={[styles.iconContainer,{backgroundColor:red}]}>
              <MaterialCommunityIcons
                name='run'
                color={white}
                size={30}
              />
            </View>
          )
        }
      },
      bike:{
        displayName:'bike',
        max:100,
        unit:'miles',
        step:1,
        type:'steppers',
        getIcon(){
          return (
            <View style={[styles.iconContainer,{backgroundColor:orange}]}>
              <MaterialCommunityIcons
                name='bike'
                color={white}
                size={30}
              />
            </View>
          )
        }
      },
      swim:{
        displayName:'swim',
        max:9900,
        unit:'meters',
        step:100,
        type:'steppers',
        getIcon(){
          return (
            <View style={[styles.iconContainer,{backgroundColor:blue}]}>
              <MaterialCommunityIcons
                name='swim'
                color={white}
                size={30}
              />
            </View>
          )
        }
      },
      sleep:{
        displayName:'sleep',
        max:24,
        unit:'hours',
        step:1,
        type:'slider',
        getIcon(){
          return (
            <View style={[styles.iconContainer,{backgroundColor:lightPurp}]}>
              <FontAwesome
                name='bed'
                color={white}
                size={30}
              />
            </View>
          )
        }
      },
      eat:{
        displayName:'eat',
        max:10,
        unit:'rating',
        step:1,
        type:'slider',
        getIcon(){
          return (
            <View style={[styles.iconContainer,{backgroundColor:pink}]}>
              <MaterialCommunityIcons
                name='food'
                color={white}
                size={30}
              />
            </View>
          )
        }
      }
    }

    return metric ? info[metric] : info;
  };

  export function getDailyReminderMessage (){
    return {
      today:"👋 Don't forget to Log your data today"
    } 
  }
  
const styles = StyleSheet.create({
  iconContainer:{
    width:50,
    height:50,
    borderRadius:10,
    justifyContent:"center",
    alignItems:'center',
    margin:10,
  }
})

export function clearLocalNotification(){
  return AsyncStorage.removeItem(NOTIFICATION_KEY);
}

export function setLocalNotification(){
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse) //this pases the result to the parse method and returns the json data
    .then(data => {
      if (data === null){
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if(status === 'granted'){
              
              Notifications.cancelAllScheduledNotificationsAsync(); //this is in case the notification was already set

              let tomorrow = new Date();
              // in the previous I used getDay() instead of getDate() and the deference that the first one
              // returns the day index of the current week so sunday will be 0, monday will be 1, and like that
              // but the second one returns as expected the current day of the current month.
              tomorrow.setDate(tomorrow.getDate() + 1) //this sets the date for tomorrow day
              tomorrow.setHours(20,0,0) //this sets the time for the notification of tomorrow day to 8 P.M

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time:tomorrow,
                  repeat:'day'
                }
              )

              // this sets the NOTIFICATION_KEY value in the AsyncStorage to true as the notification
              // schedule has been set
              AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true));
            }
          })
      }
    })
}

export function setLocalNotificationForToday(){
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse) //this pases the result to the parse method and returns the json data
    .then(data => {
      if (data === null){
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if(status === 'granted'){
              
              Notifications.cancelAllScheduledNotificationsAsync(); //this is in case the notification was already set

              let today = new Date();
              today.setHours(20,0,0) //this sets the time for the notification of today day to 8 P.M

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time:today,
                  repeat:'day'
                }
              )

              // this sets the NOTIFICATION_KEY value in the AsyncStorage to true as the notification
              // schedule has been set
              AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true));
            }
          })
      }
    })
}

function createNotification(){
  Notifications.createChannelAndroidAsync('FitnessApp',{
    name:'Fitness App',
    description:'this channel is for the Fitness Application reminding notifications',
    sound:true,
    vibrate:[0,250,250,500],
    priority:'high'
  })

  return {
    title:'Log on the data!!',
    body:"👋 Don't forget to log your stats today!",
    ios:{
      sound:true,
    },
    android:{
      channelId: 'FitnessApp',
      sticky:false,
    }
  }
}