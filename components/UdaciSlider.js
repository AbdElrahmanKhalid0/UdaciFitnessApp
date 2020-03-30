import React from 'react';
import {View,Text,Slider} from 'react-native';

export default function UdaciSlider ({value,onChange,unit,max,step}) {
    return (
        <View>
            <Slider
                step={step}
                value={value}
                maximumValue={max}
                minimumValue={0}
                onValueChange={onChange}
            />
            <Text>{value}</Text>
            <Text>{unit}</Text>
        </View>
    )
}