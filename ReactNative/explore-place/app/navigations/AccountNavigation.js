import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserRegister from '../components/auth/UserRegister'
import Profile from '../screens/profile'

export default function AccountNavigation() {
     const Stack = createStackNavigator()
  return (
    <Stack.Navigator 
        screenOptions={{
            gestureEnable: true,
        }}
    
    >
        <Stack.Screen 
            name='account'
            component={Profile}
            options={{
                title:'',
                headerShown: false
            }}
            
        />
        <Stack.Screen 
            name='register'
             component={UserRegister}
             options={{
                title:"",
             }}
        />
    </Stack.Navigator>
  )
}