import React from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import { purple } from '../utils/colors';

export default function TextButton({children,onPress,styles={}}){
    return (
        <TouchableOpacity onPress={onPress}>
            {/* children is for the children of the component it self when calling
                so in this case it will be the text inside the called component itself */}
            <Text style={[{color:purple},styles]}>{children}</Text>
        </TouchableOpacity>
   )
}