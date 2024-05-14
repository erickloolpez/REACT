import React from 'react'
import {View, Text} from 'react-native'
import LoginForm from '../components/Auth/LoginForm'
import UserData from '../components/Auth/UserData'
import useAuth from '../hooks/useAuth'

export default function Accounts(){
    const {auth} = useAuth()
    return (
        <View>
            {auth ? <UserData /> : <LoginForm/>}
        </View>
    )
}