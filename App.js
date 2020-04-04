import React from 'react';
import { View } from 'react-native';
import AddEntry from './components/AddEntry';
import History from './components/History';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { purple, gray } from './utils/colors';

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={createStore(reducer)}>
      <View style={{flex:1}}>
        <View style={{height:20}}/>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon:({focused,size,color}) => {
              let iconName;
              if (route.name==='History') {
                iconName = focused ? 'bookmark' : 'bookmark-o';
              } else if (route.name==='Add Entry') {
                iconName = focused ? 'pluscircle' : 'pluscircleo';
              };

              return route.name==='History' ? <FontAwesome name={iconName} size={size} color={color}/>
                        : <AntDesign name={iconName} size={size} color={color}/>
            }
          })}
          tabBarOptions={{
            activeTintColor:purple,
            inactiveTintColor:gray
          }}
        >
          <Tab.Screen name='History' component={History}/>
          <Tab.Screen name='Add Entry' component={AddEntry}/>
        </Tab.Navigator>
      </View>
    </Provider>
    </NavigationContainer>
  );
}