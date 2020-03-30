import React from 'react';
import { View,StyleSheet,Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import AddEntry from './components/AddEntry';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <AddEntry/> */}
      <TouchableNativeFeedback onPress={() => {console.log('this is working')}}>
        <View style={styles.btn}>
          <Text>hola niggas</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginLeft:10,
    marginTop:10,
    justifyContent:'center',
    alignItems:"center"
  },
  btn:{
    backgroundColor:'lightgreen',
    padding:10,
    borderRadius:20,
    width:150,
    alignItems:'center'
  }
})