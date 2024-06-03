import { View, Text, Image } from 'react-native'
import React from 'react'

export default function PlaceDetailChat({place}) {
    let respuesta 

    if(place.estado == 'pendiente'){
         respuesta = (
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 8 }}>
                <View style={{ width: '20%', height: 40, borderWidth: 1, marginTop: 4, backgroundColor: 'white', borderTopLeftRadius: 12, borderBottomStartRadius: 12, borderTopRightRadius: 12, }}>
                    <Image source={require('../../../assets/images/cargando.png')} style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopRightRadius: 12, borderBottomStartRadius: 12, borderTopLeftRadius: 12, }} />
                </View>
            </View>
        )
    }else if(place.estado == 'proceso'){
         respuesta = (
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 8 }}>
                <View style={{ width: '48%', height: 64, borderWidth: 1, marginTop: 4, backgroundColor: 'white', borderTopLeftRadius: 12, borderBottomStartRadius: 12, borderTopRightRadius: 12, padding: 2 }}>
                    <Text>Estamos atendiendo el caso, en unos momentos actualizaremos el caso.</Text>
                </View>
            </View>
        )
    }else{
         respuesta = (
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 8 }}>
                <View style={{ width: '48%', height: 40, borderWidth: 1, marginTop: 4, backgroundColor: 'white', borderTopLeftRadius: 12, borderBottomStartRadius: 12, borderTopRightRadius: 12, padding: 2 }}>
                    <Text>Un saludo, este es mi reporte uwu</Text>
                </View>
                <View style={{ width: '40%', height: 180, borderWidth: 1, marginTop: 4, backgroundColor: 'white', borderTopLeftRadius: 12, borderBottomStartRadius: 12, borderTopRightRadius: 12, }}>
                    <Image source={require('../../../assets/images/basurero.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopRightRadius: 12, borderBottomStartRadius: 12, borderTopLeftRadius: 12, }} />
                </View>
            </View>

        )
    }


    return (
        <View style={{ width: '100%', marginTop: 10 ,padding:8, marginBottom:10 }}>
            <Text style={{fontSize:16, fontWeight: 500, marginBottom:10}}>Respuestas:</Text>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 8 }}>
                <View style={{ width: '48%', height: 40, borderWidth: 1, marginTop: 4, backgroundColor: 'white', borderTopRightRadius: 12, borderBottomEndRadius: 12, borderTopLeftRadius: 12, padding: 2 }}>
                    <Text>Un saludo, este es mi reporte uwu</Text>
                </View>
                <View style={{ width: '40%', height: 180, borderWidth: 1, marginTop: 4, backgroundColor: 'white', borderTopRightRadius: 12, borderBottomEndRadius: 12, borderTopLeftRadius: 12, }}>
                    <Image source={{uri:place.imagen}} style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopRightRadius: 12, borderBottomEndRadius: 12, borderTopLeftRadius: 12, }} />
                </View>

            </View>
            {respuesta}

        </View>
    )
}