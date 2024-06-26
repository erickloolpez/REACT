import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginForm from '../components/auth/LoginForm'
import UserRegister from '../components/auth/UserRegister'
import UserData from '../components/auth/UserData'
import ExistLogin from '../components/auth/ExistLogin'

export default function AccountNavigation() {
     const Stack = createStackNavigator()
  return (
    <Stack.Navigator 
        screenOptions={{
            gestureEnable: true,
        }}
    >
        <Stack.Screen name='existLogin' component={ExistLogin} options={{title:'',headerShown: false}}/>
        {/* <Stack.Screen name='login' component={LoginForm} options={{title:'',headerShown: false}}/> */}
        <Stack.Screen name='register' component={UserRegister} options={{title:"",headerShown:false}}/>
        <Stack.Screen name='userData' component={UserData} options={{title:"",headerShown:false}}/>
    </Stack.Navigator>
  )
}