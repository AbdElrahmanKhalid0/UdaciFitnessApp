import React from 'react';
import {View,StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { white,red, orange, blue, lightPurp, pink } from './colors';


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