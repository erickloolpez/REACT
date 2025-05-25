import { images } from '@/constants'
import React from 'react'
import { ImageBackground, Text } from 'react-native'

const Home = () => {
  return (
    <ImageBackground source={images.bgHome} className="flex-1 justify-center items-center">
      <Text>Home</Text>
    </ImageBackground>
  )
}

export default Home