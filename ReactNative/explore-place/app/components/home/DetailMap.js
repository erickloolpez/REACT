import { View, Text, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

export default function DetailMap({place}) {
    return (
        <View style={{ width: 120, height: 120, position: 'relative', marginBottom: 25 }}>
            <View style={{ width: '100%', height: '100%', backgroundColor: 'yellow', zIndex: 2, borderRadius: 10, borderWidth: 1 }}>
                <Image source={{uri:place.imagen}} style={{width:'100%',height:'100%', objectFit:'cover', borderRadius:10}}/>
            </View>
            <View style={{ width: '110%', height: '100%', backgroundColor: 'white', zIndex: 1, position: 'absolute', top: 23, left: -6, borderRadius: 10, borderWidth: 1 }}>
                <View style={{ width: '100%', position: 'absolute', bottom: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 4 }}>
                    <Text numberOfLines={1} style={{height:20,width:95}}>{place.nombre}</Text>
                    <AntDesign name="arrowright" size={24} color="black" />
                </View>

            </View>

        </View>

    )
}