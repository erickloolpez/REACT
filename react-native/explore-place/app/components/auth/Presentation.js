import { View, Text, Image, TouchableOpacity, ImageBackground,Modal} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import React, {useState} from 'react'
import Report from '../../screens/report'

export default function Presentation() {
    const navigator = useNavigation()
    const [openModal, setOpenModal] = useState(false)

    const goToLogin = ()=>{
        navigator.navigate('Profile')
    }

    const closeModalTicket = ()=>{
        setOpenModal(false)
    }

    const openModalTicket =()=>{
        setOpenModal(true)
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../../../assets/images/confetti.jpg')} style={{}}>

                <View style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{width:'70%', height:30,position:'absolute',top:50,borderWidth:2,borderStyle:'dotted', backgroundColor: 'white', borderTopRightRadius: 40, zIndex:1}}/>
                        <View style={{width:'75%', height:30,position:'absolute',top:57,borderWidth:2,borderStyle:'dotted', backgroundColor: 'white', borderTopRightRadius: 40, zIndex:1}}/>
                    <View style={{ width: '80%', height: '80%', borderWidth: 2, borderTopRightRadius: 50, borderBottomRightRadius: 50, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', backgroundColor: 'white', marginTop:60,zIndex:2}}>
                        <Text style={{ fontWeight: 600, fontSize: 24, paddingHorizontal: 14, marginBottom: 20 }}>Hola
                            <Text style={{ fontWeight: 'light' }}> hermoso/hermosa gusto en verte de nuevo!</Text>
                        </Text>
                        <Text style={{ paddingLeft: 14, paddingRight: 23 }}>Con el fin de proporcionar informacion sobre ti y tus reportes necesitaremos que inicies sesion justo ahora</Text>
                        <TouchableOpacity style={{ position: 'absolute', bottom: -21, left: 0, display: 'flex', flexDirection: 'row', width: '68%', backgroundColor: '#D4ECEA', justifyContent: 'space-between', alignItems: 'center', height: '20%', borderTopRightRadius: 50, borderBottomRightRadius: 50, paddingHorizontal: 20, borderWidth: 2, borderLeftWidth:0 }}
                        // onPress={()=>openModalTicket()
                        onPress={()=>goToLogin()}
                        >
                            <Text style={{ fontWeight: 500 }}>Hagamoslo Ahora</Text>
                            <View style={{ borderRadius: 50, backgroundColor: 'black' }}>
                                <AntDesign name="arrowright" size={28} color="white" />
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>
                <View style={{ width: '100%', height: '50%', position:'relative', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../../assets/images/copyWaves.png')} style={{ width: '100%', height: '70%', objectFit: 'cover', position: 'absolute', bottom:0}} />
                    <Image source={require('../../../assets/images/being-happy.png')} style={{ objectFit:'cover'}} />
                </View>
                <Report openModal={false} stateModal={openModal} closeModalTicket={closeModalTicket} />
            </ImageBackground>
        </View>
    )
}