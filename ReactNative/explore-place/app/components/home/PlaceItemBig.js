import { View, Text, Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

export default function PlaceItem({ place }) {
  let colorAnswer
  if (place.estado == 'pendiente') {
    colorAnswer = '#ff7676'
  } else if (place.estado == 'proceso') {
    colorAnswer = '#d29e00'
  } else {
    colorAnswer = '#5ccb5f'
  }

  return (
    <View style={{
      width: '90%',
      height: 110,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center ',
      justifyContent: 'space-around',
      marginBottom: 10,
      marginTop: 8,
      borderBottomWidth: 2,
      paddingBottom:8,
    }}>
      <Image
        source={require('../../../assets/images/basurero.jpg')}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 8,
          borderWidth: 2,
        }}
      />
      {/* <View style={{
        width:'60%',
        height: '100%',
        display: 'flex',
        flexDirection: 'col',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
        <Text style={{
          fontSize: 13,
        }}>{place.nombre}</Text>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
          <Text style={{
            fontSize: 13,
            marginRight: 8,
          }}>{place.peticiones}</Text>
          <MaterialIcons name="groups" size={18} color="black" />
        </View>
        <View style={{
          padding: 8,
          backgroundColor: 'white',
          borderRadius: 15,
          borderWidth:1,
        }}>
          <Text style={{ color: colorAnswer }}>{place.estado}</Text>
        </View>

      </View> */}
    </View>

  )
}