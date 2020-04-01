import React from 'react';
import {View,Text,Slider,StyleSheet} from 'react-native';
import { gray, red } from '../utils/colors';

export default function UdaciSlider ({value,onChange,unit,max,step}) {
    return (
        <View style={styles.sliderContainer}>
            <Slider
                style={styles.slider}
                step={step}
                value={value}
                maximumValue={max}
                minimumValue={0}
                onValueChange={onChange}
            />
            <View style={{marginRight:10}}>
                <Text style={styles.metric}>{value}</Text>
                <Text style={styles.unit}>{unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sliderContainer:{
        flex:1,
        flexDirection:"row"
    },
    slider:{
        flex:1,
    },
    metric:{
        textAlign:'center',
        fontSize:20,
    },
    unit:{
        textAlign:"center",
        fontSize:14,
        color:gray
    }
})