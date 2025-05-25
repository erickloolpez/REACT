import { images } from '@/constants'
import React from 'react'
import { ImageBackground, Text } from 'react-native'

export default function Dictionary() {
  return (
    <ImageBackground source={images.bgDictionary} className="flex-1 justify-center items-center">
      <Text>Notes</Text>
    </ImageBackground>
  )
}