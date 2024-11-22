import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCrown, faGem, faRightFromBracket, faTree } from '@fortawesome/free-solid-svg-icons'
import CountryFlag from 'react-native-country-flag'

import { images } from '../../constants'
import Review from '../../components/Comment'

const Profile = () => {

  return (
    <SafeAreaView className="h-full bg-primary" edges={['top']}>
      <View className="w-full h-[60%] items-center">
        <Image source={images.ruins} resizeMode="cover" className="absolute w-full h-full" />
        <View className="w-full h-[10%] items-end justify-center ">
          <View className=" w-10 h-10 bg-white mr-2 rounded-lg items-center justify-center ">
            <FontAwesomeIcon icon={faRightFromBracket} color='#ef4444' size={32} />
          </View>
        </View>

        <View className="w-full h-[70%] items-center justify-around ">
          <View className="w-36 h-36  rounded-full overflow-hidden ">
            <Image source={images.avatar} resizeMode="cover" className="w-full h-full" />
          </View>

          <View className="w-32 h-10 rounded-lg items-center justify-center bg-white">
            <Text>Monica Perez</Text>
          </View>

          <View className=" w-36 h-10 flex-row items-center justify-center rounded-lg bg-white">
            <CountryFlag isoCode="de" size={25} />
            <Text className="ml-2">Alemania</Text>
          </View>
        </View>

        <View className="w-[90%] h-[20%] border-t-2 border-b-2 flex-row items-center bg-white ">
          <View className="w-1/2 h-[80%] flex-row items-center justify-center border-r-2">
            <FontAwesomeIcon icon={faGem} color='#93c5fd' size={32} />
            <Text className="ml-2">120 puntos</Text>
          </View>
          <View className="w-1/2 h-full flex-row items-center justify-center ">
            <FontAwesomeIcon icon={faTree} color='#22c55e' size={32} />
            <Text className="ml-2">Visitados: 3</Text>
          </View>
        </View>

      </View>

      <View className="w-full h-[40%]">
        <View className="w-full h-[20%] justify-end">
          <Text className="font-semibold text-lg ml-2 text-terciary">Tus reseñas</Text>
        </View>
        <View className="w-full h-[80%] items-center justify-center">
          <Review />
        </View>
      </View>

    </SafeAreaView>
  )
}

export default Profile