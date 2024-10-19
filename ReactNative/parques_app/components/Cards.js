import { View, Image, Text } from 'react-native'
import React from 'react'

const Cards = ({data}) => {
  return (
    <View className="w-24 h-[85%] bg-green-400 mr-5 rounded-lg overflow-hidden">
        <Image source ={data.image} className="w-full h-full" resizeMode="cover"/>
    </View>
  )
}

export default Cards