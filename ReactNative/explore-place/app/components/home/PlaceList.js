import { View, Text, FlatList } from 'react-native'
import React from 'react'
import PlaceItem from './PlaceItem'

export default function PlaceList({placeList}) {
  return (
    <View>
      <Text style={{
        fontSize:20,
        marginTop: 10

      }}>
        Found {placeList.length} places</Text>

      <FlatList
        data={placeList}
        renderItem={({item})=>{
            <PlaceItem place={item} />
        }}
      
      />
    </View>
  )
}