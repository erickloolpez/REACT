import React from 'react'
import {Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FavoriteNavigation from '../navigation/FavoriteNavigation'
import PokedexNavigation from '../navigation/PokedexNavigation'
import AccountNavigation from '../navigation/AccountNavigation'

const Tab = createBottomTabNavigator();
export default function Navigation() {
    return (
        <Tab.Navigator initialRouteName='Pokedex'>
            <Tab.Screen name='Favorite' component={FavoriteNavigation} options={{
                tabBarLabel: "Favoritos",
                // tabBarIcon: () =>
                //     <Icon name='heart' color='black' size={20} />
                tabBarIcon: ({color, size}) => <Icon name='heart' color ={color} size={size} />
            }} />
            <Tab.Screen name='Pokedex' component={PokedexNavigation} options = {{
                tabBarLabel: "",
                tabBarIcon: () => renderPokeBall()
            }} />
            <Tab.Screen name='Account' component={AccountNavigation} options ={{
                tabBarLabel: "Mi cuenta",
                tabBarIcon: ({color, size}) => <Icon name='user' color={color} size ={size}/>
            }} />
        </Tab.Navigator>

    )
}

function renderPokeBall() {
    return(
        <Image source={require('../assets/ball.png')}
        style={{width:75, height: 75, top: -15}}/>
    )
}