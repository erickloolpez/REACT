import { images } from '@/constants'
import React from 'react'
import { ImageBackground, Text } from 'react-native'

const Notes = () => {
  return (
    <ImageBackground source={images.bgNotes} className="flex-1 justify-center items-center">
      <Text>Notes</Text>
    </ImageBackground>
  )
}

export default Notes