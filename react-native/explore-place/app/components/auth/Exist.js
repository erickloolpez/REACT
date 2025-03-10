import { View, Text } from 'react-native'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import ListReports from './ListReports'
import Presentation from './Presentation'

export default function Exist() {
    const {auth} = useAuth()
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
        {auth ? <ListReports/> : <Presentation/>}
    </View>
  )
}