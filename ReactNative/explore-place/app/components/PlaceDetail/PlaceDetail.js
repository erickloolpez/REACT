import { View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import {useRoute} from '@react-navigation/native'
import PlaceDetailItem from './PlaceDetailItem'

export default function PlaceDetail() {
  const params = useRoute().params

  // //en caso de que queramos hacer un cambio a un estado esta el useEffect
  // useEffect(()=>{
  // },[])

  return (
    <ScrollView style={{backgroundColor:'white'}}>
      <PlaceDetailItem  place={params.place}/>
    </ScrollView>
  )
}