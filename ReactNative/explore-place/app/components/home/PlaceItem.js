import { View, Text, Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

export default function PlaceItem({ place }) {
  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center ',
      width: '100%',
      justifyContent: 'space-around',
      marginBottom: 10,
      marginTop: 8,
      height: 110
    }}>
      <Image
        source={require('../../../assets/images/basurero.jpg')}
        style={{
          width: 120,
          height: '100%',
          borderRadius: 4
        }}
      />
      <View style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'col',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
        <Text style={{
          fontSize: 18,
        }}>{place.nombre}</Text>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: 100
        }}>
          <Text style={{
            fontSize: 18
          }}>{place.peticiones}</Text>
          <MaterialIcons name="groups" size={24} color="black" />
        </View>
        <View style={{
          padding: 8,
          backgroundColor: 'green',
          borderRadius: 15,
        }}>
          <Text style={{color: 'white'}}>{place.estado}</Text>
        </View>

      </View>
    </View>

  )
}