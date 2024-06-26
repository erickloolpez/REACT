import { View, Text } from 'react-native'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import UserData from './UserData'
import LoginForm from './LoginForm'

export default function ExistLogin() {
    const{auth} = useAuth()

  return (
    <View style={{flex:1}}>
        {auth ? <UserData/> : <LoginForm />}
    </View>
  )
}