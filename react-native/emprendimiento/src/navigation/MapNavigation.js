import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import mapScreen from '../screens/Map'

const Stack = createStackNavigator()
export default function AccountNavigation(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Account' component={mapScreen} options={{title:"", headerTransparent:true}}/>
        </Stack.Navigator>
    )
}