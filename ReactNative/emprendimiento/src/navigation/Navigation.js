import React from 'react'
import {Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MapNavigation from './MapNavigation'
import AccountNavigation from './AccountNavigation'
import Report from '../screens/Report'

const Tab = createBottomTabNavigator()
export default function Navigation(){
    return(
        <Tab.Navigator initialRouteName='Map'>
            <Tab.Screen name ='Report' component={Report} options={{
                tabBarLabel:"Reportes",
                tabBarIcon:({color,size})=><Icon name='heart' color={color} size={size}/>
                }}/>
            <Tab.Screen name ='Map' component={MapNavigation} options={{
                tabBarLabel:'',
                tabBarIcon:()=> renderMap()
                }}/>
            <Tab.Screen name ='Account' component={AccountNavigation} options={{
                tabBarLabel:'Cuenta',
                tabBarIcon:({color,size})=><Icon name='user' color={color} size={size}/>
                }}/>
        </Tab.Navigator>
    )
}
 
function renderMap(){
    return(
        <Image source={require('../../assets/map.png')} style={{width:75, height:75, top:-15}}/>
    )
}