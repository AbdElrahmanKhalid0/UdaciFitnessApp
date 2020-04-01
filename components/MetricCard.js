import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { getMetricMetaInfo } from '../utils/helpers';
import { gray } from '../utils/colors';
import DateHeader from './DateHeader';

export default function MetricCard ({metrics,date}) {
    return (
        <View>
            {date && <DateHeader date={date}/>}
            {Object.keys(metrics).map(metric => {
                const {displayName,unit,getIcon} = getMetricMetaInfo(metric);
                const value = metrics[metric];

                return (
                    <View style={styles.metric}>
                        {getIcon()}
                        <Text style={{fontSize:18}}>{displayName}</Text>
                        <Text style={{fontSize:12,color:gray}}>{value} {unit}</Text>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    metric:{
        flex:1,
        flexDirection:'row',
    }
});