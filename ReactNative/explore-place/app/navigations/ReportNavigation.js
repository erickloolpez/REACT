import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Report from '../screens/report'

export default function ReportNavigation() {
    const Stack= createStackNavigator()
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
        <Stack.Screen name='report' component={Report}/>
    </Stack.Navigator>
  )
}