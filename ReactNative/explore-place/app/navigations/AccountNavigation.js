import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginForm from '../components/auth/LoginForm'
import UserRegister from '../components/auth/UserRegister'
import UserData from '../components/auth/UserData'

export default function AccountNavigation() {
     const Stack = createStackNavigator()
  return (
    <Stack.Navigator 
        screenOptions={{
            gestureEnable: true,
        }}
    >
        <Stack.Screen name='login' component={LoginForm} options={{title:'',headerShown: false}}/>
        <Stack.Screen name='register' component={UserRegister} options={{title:"",headerTransparent:true}}/>
        <Stack.Screen name='userData' component={UserData} options={{title:"",headerShown:false}}/>
    </Stack.Navigator>
  )
}