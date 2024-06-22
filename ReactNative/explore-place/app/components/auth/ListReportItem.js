import { View, Text,Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

export default function ListReportItem({reporte}) {
    let bgColor = ''

    if (reporte.estado == 'pendiente') {
      bgColor = '#ff7676'
    } else if (reporte.estado == 'proceso') {
      bgColor = '#ffff77'
    } else {
      bgColor = '#5ccb5f'
    }
    return (
        <View style={{ width: 200, height: 100 }}>
            <View style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', zIndex: 2, backgroundColor: 'white', position: 'absolute', borderWidth: 1, borderRadius: 8 }}>
                <View style={{ width: '25%', height: '75%' }}>
                    <Image source={{uri:reporte.imagen}} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text>{reporte.nombre}</Text>
                    <MaterialIcons name="groups" size={18} color="black" />
                </View>

            </View>
            <View style={{ width: '97%', height: '100%', display: 'flex', zIndex: 1, backgroundColor: bgColor, position: 'absolute', top: 4, left: 4, borderWidth: 1, borderRadius: 10 }}>

            </View>

        </View>
    )
}