import {View, TextInput, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

export default function Header(){
    return(
        <View style={{
            display: 'flex',
             flexDirection:'row',
             justifyContent:'space-evenly',
             gap:10,
             alignItems: 'center'
             }}>
            <Image source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            
            />
            <View>
                <TextInput placeholder='Wenas broer'
                style={styles.searchBar}
                />
            </View>
            <Image source={require('../../../assets/images/user.png')} 
            style={styles.userImage}
            
            />
        </View>

    )
}

const styles = StyleSheet.create({
    logo:{
        width: 50,
        height: 50
    },
    searchBar:{
        borderWidth: 1,
        borderColor: '#000',
        padding:4,
        borderRadius: 50,
        paddingLeft: 10,
        width:Dimensions.get('screen').width*0.6
    },
    userImage:{
        width: 50,
        height: 50,
        borderRadius: 100
    }
})