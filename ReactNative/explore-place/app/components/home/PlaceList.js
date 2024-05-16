import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import PlaceItem from './PlaceItem.js'
import { useNavigation } from '@react-navigation/native'

export default function PlaceList({ placeList }) {
  const navigator = useNavigation()
  const onPlaceClick = (item) => {
    navigator.navigate('place-detail', { place: item })
  }


  return (
    <ScrollView >
      <Text style={{
        fontSize: 20,
        marginTop: 10

      }}>
        Found {placeList.length} places</Text>

        {placeList.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => onPlaceClick(item)}>
              <PlaceItem key={index} place={item} />
            </TouchableOpacity>
        ))}

      {/* <FlatList
        data={placeList}
        renderItem={({item})=>(
          <TouchableOpacity onPress={()=>onPlaceClick(item)}>
            <PlaceItem place={item} />
          </TouchableOpacity>
        )}
        horizontal={false}
      /> */}
    </ScrollView>
  )
}