import {View } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'
import UserData from '../components/auth/UserData'
import LoginForm from '../components/auth/LoginForm'

export default function Profile(){
    const {auth} = useAuth
    return(
        <View>
            {auth ? <UserData/> : <LoginForm/>}
        </View>
    )
}