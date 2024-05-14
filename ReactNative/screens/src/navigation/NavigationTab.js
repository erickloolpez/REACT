import React from 'react'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from '../components/screens/HomeScreen'
import SettingsScreen from '../components/screens/SettingsScreen'

const Tab = createBottomTabNavigator();

export default function NavigationTab() {
    return(
        <Tab.Navigator> 
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Settings' component={SettingsScreen} />

        </Tab.Navigator>
    )
}