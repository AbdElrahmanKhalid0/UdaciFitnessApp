import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

export default function UdaciStepper ({value,onIncrement,onDecrement,unit}) {
    return (
        <View>
            <View>
                <TouchableOpacity onPress={onDecrement}>
                    <Entypo name='minus' size={30} color='black'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onIncrement}>
                    <Entypo name='plus' size={30} color='black'/>
                </TouchableOpacity>
            </View>
            <View>
                <Text>{value}</Text>
                <Text>{unit}</Text>
            </View>
        </View>
    )
}