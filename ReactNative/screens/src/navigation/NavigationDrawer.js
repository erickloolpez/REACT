import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import HomeScreen from '../components/screens/HomeScreen'
import SettingsScreen from '../components/screens/SettingsScreen'

const Drawer = createDrawerNavigator()

export default function NavigationDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='Home' component={HomeScreen} />
            <Drawer.Screen name='Settings' component={SettingsScreen} />
        </Drawer.Navigator>
    )
}