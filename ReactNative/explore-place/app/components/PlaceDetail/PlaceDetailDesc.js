import { View, Text, Image } from 'react-native'
import React from 'react'

export default function PlaceDetailDes({ place }) {
  return (
    <View style={{
      marginTop: 30,
      paddingLeft: 7
    }}>
      <Text style={{ fontSize: 20 }}>Descripcion</Text>
      <View style={{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
      }}>
        <Text style={{ fontWeight: 'bold' }}>Tipo: </Text>
        <Text>{place.tipo}</Text>
      </View>
      <View style={{
        marginTop: 10
      }}>
        <Text>{place.descripcion}</Text>
      </View>
      <View style={{
        marginTop: 10
      }}>
        <Image source ={require('../../../assets/images/basurero.jpg')}/>
      </View>

    </View>
  )
}