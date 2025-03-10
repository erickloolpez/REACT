import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// import Presentation from '../components/auth/Presentation'
import Exist from '../components/auth/Exist'
import Report from '../screens/report'

export default function ReportNavigation() {
    const Stack= createStackNavigator()
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
        <Stack.Screen name ='news' component={Exist}/>
        <Stack.Screen name='report' component={Report}/>
    </Stack.Navigator>
  )
}