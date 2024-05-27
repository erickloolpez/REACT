import { View, Text } from 'react-native'
import React from 'react'
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack'
import Home from '../screens/home'
import PlaceDetail from '../components/PlaceDetail/PlaceDetail'
import Map from '../components/home/Map'

export default function HomeNavigation() {
    const isAndroid = true
    const Stack = createStackNavigator()
  return (
    <Stack.Navigator 
      screenOptions={{
        gestureEnabled: true,
      }}
    >
        <Stack.Screen name='home' component={Home} options={{headerShown:false}} />
        <Stack.Screen name='place-detail' component={PlaceDetail} options={{headerShown:false,presentation:'modal',...(isAndroid&&TransitionPresets.ModalPresentationIOS)}}/>
        <Stack.Screen name='map-complete' component={Map} options={{title:'',headerShown:false}}/>
    </Stack.Navigator>
  )
}