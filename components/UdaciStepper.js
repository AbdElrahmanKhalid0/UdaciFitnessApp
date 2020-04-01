import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet, Platform} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {gray, purple, white} from '../utils/colors'

export default function UdaciStepper ({value,onIncrement,onDecrement,unit}) {
    return (
        <View style={styles.stepperContainer}>
            {Platform.OS === 'ios' ? (
                <View style={styles.row}>
                    <TouchableOpacity onPress={onDecrement} style={[styles.iosBtn,{borderTopRightRadius:0,borderBottomRightRadius:0}]}>
                        <Entypo name='minus' size={35} color={purple}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onIncrement} style={[styles.iosBtn,{borderTopLeftRadius:0,borderBottomLeftRadius:0}]}>
                        <Entypo name='plus' size={35} color={purple}/>
                    </TouchableOpacity>
                </View>
                ) : (
                <View style={styles.row}>
                    <TouchableOpacity onPress={onDecrement} style={styles.androidBtn}>
                        <FontAwesome name='minus' size={30} color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onIncrement} style={styles.androidBtn}>
                        <FontAwesome name='plus' size={30} color='white'/>
                    </TouchableOpacity>
                </View>
                )}
            <View style={{marginRight:10}}>
                <Text style={styles.metric}>{value}</Text>
                <Text style={styles.unit}>{unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stepperContainer:{
        flex:1,
        flexDirection:'row'
    },
    row:{
        flex:1,
        flexDirection:'row',
        marginLeft:20,
    },
    metric:{
        textAlign:'center',
        fontSize:20,
    },
    unit:{
        textAlign:"center",
        fontSize:14,
        color:gray
    },
    androidBtn:{
       width:50,
       height:50,
       backgroundColor:purple,
       marginRight:10,
       borderRadius:3,
       justifyContent:"center",
       alignItems:"center",
    },
    iosBtn:{
        height:50,
        width:80,
        backgroundColor:white,
        borderColor:purple,
        borderWidth:2,
        borderRadius:5,
        justifyContent:"center",
        alignItems:"center",
    }
});