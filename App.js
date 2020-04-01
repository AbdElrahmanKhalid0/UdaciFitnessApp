import React from 'react';
import { View } from 'react-native';
import AddEntry from './components/AddEntry';
import History from './components/History';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{flex:1}}>
        <View style={{height:20}}/> {/* this is for the upper nav bar */}
        <History/>
      </View>
    </Provider>
  );
}