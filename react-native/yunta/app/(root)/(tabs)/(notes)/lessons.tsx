import { images } from '@/constants'
import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Lessons = () => {
  const list = [
    { id: 1, title: 'Gramática' },
    { id: 2, title: 'Vocabulario' },
    { id: 3, title: 'Pronunciación' },
    { id: 4, title: 'Conversación' },
  ]
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground source={images.bgLessons} className="flex-1">
        <View className="h-44  justify-end p-4 ">
          <Text className="text-white text-shadow-lg/20 font-BlockHead text-4xl">¿Qué quieres repasar hoy?</Text>
        </View>
        <View className="flex-row flex-wrap gap-4 items-center justify-center p-10">
          {
            list.map((item) => (
              <View className="w-44 h-40 bg-white rounded-lg">

              </View>
            ))
          }
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Lessons