import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import PlaceItem from './PlaceItem.js'
import PlaceItemBig from './PlaceItemBig'
import { useNavigation } from '@react-navigation/native'

export default function PlaceList({ placeList }) {
  const navigator = useNavigation()
  const onPlaceClick = (item) => {
    navigator.navigate('place-detail', { place: item })
  }


  return (
    <View style={{ width: '90%' }}>
      <Text style={{
        fontSize: 16,
        marginTop: 4,
        marginLeft: 8,
        marginBottom: 10,
        fontWeight: 600,
      }}>
        Reportes Totales: {placeList.length}</Text>
      <ScrollView style={{
        width: '100%',
        height: 450,
        borderWidth: 2,
        borderRadius: 20,
      }} >

        {placeList.map((item, index) => {
          const PlaceComponent = index % 2 == 0 ? PlaceItem : PlaceItemBig;

          return (
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={index} onPress={() => onPlaceClick(item)}>
              <PlaceComponent place={item} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

    </View>
  )
}