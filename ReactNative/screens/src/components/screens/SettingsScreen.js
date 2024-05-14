import React from 'react'
import {View, Text, Button, SafeAreaView} from 'react-native'

export default function SettingScreen(props) {

    const{navigation} = props

    const goToHome = (pageName) =>{
        navigation.navigate(pageName);
    }

    return (
        <SafeAreaView>
            <Text>Estamos en Settings Screen</Text>
            <Text>Estamos en Settings Screen</Text>
            <Text>Estamos en Settings Screen</Text>
            <Text>Estamos en Settings Screen</Text>
            <Text>Estamos en Settings Screen</Text>
            <Text>Estamos en Settings Screen</Text>
            <Text>Estamos en Settings Screen</Text>
            <Text>Estamos en Settings Screen</Text>
            <Text>Estamos en Settings Screen</Text>
            <Button onPress={()=>goToHome('Home')} title='Ir a Home' />
        </SafeAreaView>
    )
}