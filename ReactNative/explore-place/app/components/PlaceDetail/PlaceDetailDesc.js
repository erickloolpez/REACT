import { View, Text, Image } from 'react-native'
import React from 'react'

export default function PlaceDetailDes({ place }) {
  return (
    <View style={{
      marginTop: 4,
      padding:8,
    }}>
      <Text style={{ fontSize: 16, fontWeight:500 }}>{place.nombre}</Text>
      <View style={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'row',
      }}>
      </View>
      <View style={{
        marginTop: 10
      }}>
        <Text>{place.descripcion}</Text>
      </View>
    </View>
  )
}