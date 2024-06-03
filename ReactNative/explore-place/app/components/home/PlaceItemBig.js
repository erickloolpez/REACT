import { View, Text, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

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
      position: 'relative',
      width: '90%',
      height: 130,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: 8,
      marginBottom: 10,
      borderWidth: 2,
      borderRadius:10
    }}>
      <Image
        source={{uri:place.imagen}}
        style={{
          width: '40%',
          height: '80%',
          borderRadius: 8,
          borderWidth: 1,
        }}
      />
      <View style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text>{place.nombre}</Text>
          <AntDesign name="sharealt" size={24} color="black" />
        </View>
        <Text>Tipo: {place.tipo}</Text>
        <View style={{ width: '44%', padding: 4, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 4 }}>
          <Text>Leer</Text>
        </View>
        <View style={{position: 'absolute',right:-10, bottom:0, width:44, height: 20, backgroundColor:'#232124', display:'flex',flexDirection:'row', justifyContent: 'center', alignItems:'center', borderTopLeftRadius:10, borderBottomRightRadius:10}}>
          <View style={{width:14, height:14,backgroundColor:colorAnswer, borderRadius:50}} />
          <Text style={{marginLeft:4, color:'white'}}>{place.peticiones}</Text>
        </View>

      </View>
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