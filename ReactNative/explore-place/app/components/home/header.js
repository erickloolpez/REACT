import {View, TextInput, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

export default function Header(){
    return(
        <View style={{
            width:'100%',
            height:'10%',
            display: 'flex',
             flexDirection:'row',
             justifyContent:'space-evenly',
             gap:10,
             alignItems: 'center'
             }}>
            <Image source={require('../../../assets/images/usuario.png')}
            style={styles.logo}
            
            />
            <View>
                <TextInput placeholder='Busqueda de Reportes' placeholderTextColor={'gray'}
                style={styles.searchBar}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    logo:{
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius:50,
    },
    searchBar:{
        borderWidth: 1,
        borderColor: '#000',
        padding:4,
        borderRadius: 50,
        paddingLeft: 10,
        width:Dimensions.get('screen').width*0.7
    },
    userImage:{
        width: 50,
        height: 50,
        borderRadius: 100
    }
})