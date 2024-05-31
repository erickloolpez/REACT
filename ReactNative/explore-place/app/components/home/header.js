import { View, Text, TextInput, Image, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React from 'react'

export default function Header() {
    return (
        <View style={{
            width: '90%',
            height: 124, 
            display:'flex'
        }}>
            <View style={{
                width: '100%',
                height: '45%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../../assets/images/usuario.png')}
                        style={styles.logo}
                    />
                    <Text style={{ marginLeft: 10 }}>Hola, Criatura!</Text>
                </View>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>
            <View style={{
                width: '100%',
                height: '55%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems:'center', borderWidth: 2, width:'98%', height:42, borderRadius:8,paddingLeft:10, marginTop:14}}>
                    <AntDesign name="search1" size={24} color="black" />
                    <TextInput placeholder='Busqueda de Reportes' placeholderTextColor={'gray'}
                        style={styles.searchBar}
                    />
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 50,
    },
    searchBar: {
        borderColor: '#000',
        padding: 4,
        borderRadius: 50,
        paddingLeft: 10,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 100
    }
})