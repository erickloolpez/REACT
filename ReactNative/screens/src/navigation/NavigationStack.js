import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from '../components/screens/HomeScreen'
import SettingsScreen from '../components/screens/SettingsScreen'

const Stack = createStackNavigator();

export default function NavigationStack() {
    return(
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Settings" component={SettingsScreen}/>
        </Stack.Navigator>
    )
}