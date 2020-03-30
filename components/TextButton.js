import React from 'react';
import {View,TouchableOpacity,Text} from 'react-native';

export default function TextButton({children,onPress}){
    return (
        <TouchableOpacity onPress={onPress}>
            {/* children is for the children of the component it self when calling
                so in this case it will be the text inside the called component itself */}
            <Text>{children}</Text>
        </TouchableOpacity>
   )
}