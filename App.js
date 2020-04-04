import React from 'react';
import { View, StatusBar } from 'react-native';
import AddEntry from './components/AddEntry';
import History from './components/History';
import EntryDetails from './components/EntryDetails';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { purple, gray } from './utils/colors';

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const TabsNavigatorContainer = () => {
  return (
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
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={createStore(reducer)}>
      <View style={{flex:1}}>
        <StatusBar backgroundColor={purple} barStyle='light-content'/>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={TabsNavigatorContainer} options={{headerShown:false}}/>
          <Stack.Screen name='Entry Details' component={EntryDetails}/>
        </Stack.Navigator>
      </View>
    </Provider>
    </NavigationContainer>
  );
}