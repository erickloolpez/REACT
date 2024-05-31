import {View } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'
import UserData from '../components/auth/UserData'
import LoginForm from '../components/auth/LoginForm'
import Presentation from '../components/auth/Presentation'

export default function Profile(){
    const {auth} = useAuth()
    return(
        <View style={{
            flex: 1
        }}>
            {auth ? <UserData/> : <Presentation/>}
        </View>
    )
}