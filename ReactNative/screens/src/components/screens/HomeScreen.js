import React from 'react'
import {View, Text, Button, SafeAreaView} from 'react-native'

export default function HomeScreen(props){
    console.log(props)//We use this to see all the things we could do with this props

    const{navigation} = props;

    const goToSettings = () =>{
        navigation.navigate('Settings')
    }
    return (
        <SafeAreaView>
            <Text>Estamos en Home Screen</Text>
            <Text>Estamos en Home Screen</Text>
            <Text>Estamos en Home Screen</Text>
            <Text>Estamos en Home Screen</Text>
            <Text>Estamos en Home Screen</Text>
            <Text>Estamos en Home Screen</Text>
            <Text>Estamos en Home Screen</Text>
            <Text>Estamos en Home Screen</Text>
            <Text>Estamos en Home Screen</Text>
            <Button onPress={goToSettings} title='Ir a Ajustes'/>
        </SafeAreaView>
    )
}