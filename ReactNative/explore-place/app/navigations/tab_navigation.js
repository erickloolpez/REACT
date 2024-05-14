import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from '../screens/home'
import Fav from '../screens/fav'
import Search from '../screens/search'
import Profile from '../screens/profile'
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function Tab_Navigation(){
    const Tab = createBottomTabNavigator()
    return(
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name='Home' component={Home} options={{
                tabBarLabel: 'Home',
                tabBarIcon:({color, size})=>(
                    <FontAwesome5 name="home" size={24} color="black" />
                )
            }}/>
            <Tab.Screen name='Fav' component={Fav} options={{
                tabBarLabel: 'Favorites',
                tabBarIcon:({color, size})=>(
                    <MaterialIcons name="favorite-border" size={24} color="black" />
                )
            }}/>
            <Tab.Screen name='Search' component={Search} options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({color, size})=>(
                    <FontAwesome5 name="search" size={24} color="black" />
                )
            }} />
            <Tab.Screen name='Profile' component={Profile} options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({color, size})=>(
                    <FontAwesome5 name="user" size={24} color="black" />
                )
            }} />
        </Tab.Navigator>
    )
}