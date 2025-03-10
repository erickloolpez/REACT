import { View, Text, TextInput, Image, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react'
import useLocation from '../../hooks/useLocation'
import useAuth from '../../hooks/useAuth'

export default function Header() {
    const { depureListSearchBar } = useLocation()
    const { auth } = useAuth()
    const [searchValue, setSearchValue] = useState('')
    return (
        <View style={{
            width: '90%',
            height: 124,
            display: 'flex'
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
                    <Text style={{ marginLeft: 10 }}>Hola, {auth ? auth.username : 'wap@'}!</Text>
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
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '98%', height: 42, marginTop: 14,}}>
                    <View style={{width:'100%', height:'100%',display:'flex',flexDirection:'row',alignItems:'center',zIndex:2,backgroundColor:'white', borderRadius:8,borderWidth:2}}>
                        <View style={{width:'13%',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                        <AntDesign name="search1" size={24} color="black"/>
                        </View>
                        <TextInput placeholder='Busqueda de Reportes' placeholderTextColor={'gray'}
                            style={styles.searchBar}
                            onChangeText={(value) => setSearchValue(value)}
                            onSubmitEditing={() => {
                                console.log('Ingresa', searchValue)
                                depureListSearchBar(searchValue)
                            }}
                        />
                    </View>
                <View style={{ width: '100%', height: '100%', backgroundColor: 'green', position: 'absolute', borderWidth: 1, top: 4,left:3,borderRadius:8 ,zIndex: 1 }} />
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
        width:'87%'
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 100
    }
})