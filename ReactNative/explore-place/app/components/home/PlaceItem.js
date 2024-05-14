import { View, Text } from 'react-native'
import React from 'react'

export default function PlaceItem({place}) {
  return (
    <View>
        <Image 
        source={require('../../../assets/images/placeholder.jpg')}
        style={{
            width: 120,
            height: 120
        }}
        />
        <Text>{place.name}</Text>
        <Text>{place.vicinity}</Text>
    </View>
  )
}