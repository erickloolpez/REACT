import { View, Text, Image } from 'react-native'
import React from 'react'

export default function CategoryItem({ category }) {
  return (
    <View
      style={{
        padding: 5,
        margin: 5,
        width: 150,
        height: 65,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        gap: 4
      }}

    >
      <Image
        source={category.icon}
        style={{
          width: 50,
          height: 50,
          objectFit:'contain',
        }}

      />
      <View style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'space-around',
      }}>
        <Text
          style={{
            fontSize: 13
          }}
        >{category.name}</Text>
        <Text style={{fontSize:11, marginTop:5}}>{category.reportes} Reportes</Text>
      </View>
    </View>
  )
}