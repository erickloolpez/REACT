import BannerShape from '@/components/BannerShape'
import { images } from '@/constants'
import React from 'react'
import { ImageBackground } from 'react-native'

const Home = () => {
  return (
    <ImageBackground source={images.bgHome} className="flex-1">
      <BannerShape
        width={250}
        height={80}
        fillColor="#f0c000" // Un amarillo similar al de tu imagen
        strokeColor="#1e609e" // Un azul similar al de tu imagen
        strokeWidth={6}
        cornerRadius={10}
        vNotchDepth={30}
      />
    </ImageBackground>
  )
}

export default Home