import { images } from '@/constants'
import React from 'react'
import { ImageBackground, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Dictionary() {
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground source={images.bgDictionary} className="flex-1 justify-center items-center">
        <Text>Notes</Text>
      </ImageBackground>
    </SafeAreaView>
  )
}