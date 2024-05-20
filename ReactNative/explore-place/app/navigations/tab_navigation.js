import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeNavigation from '../navigations/HomeNavigation'
import AccountNavigation from '../navigations/AccountNavigation'
import ReportNavigation from '../navigations/ReportNavigation'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function Tab_Navigation(){
    const Tab = createBottomTabNavigator()
    return(
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name='Report' component={ReportNavigation} options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({color, size})=>(
                    <Ionicons name="document-text-outline" size={24} color="black" />
                )
            }} />
            <Tab.Screen name='Home' component={HomeNavigation} options={{
                tabBarLabel: 'Home',
                tabBarIcon:({color, size})=>(
                    <Ionicons name="home-outline" size={24} color="black" />
                )
            }}/>
            <Tab.Screen name='Profile' component={AccountNavigation} options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({color, size})=>(
                    <AntDesign name="user" size={24} color="black" />
                )
            }} />
        </Tab.Navigator>
    )
}