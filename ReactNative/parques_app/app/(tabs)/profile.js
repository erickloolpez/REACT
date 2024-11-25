import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faComment, faCrown, faGem, faRightFromBracket, faTree } from '@fortawesome/free-solid-svg-icons'
import CountryFlag from 'react-native-country-flag'
import { LinearGradient } from 'expo-linear-gradient'

import { images } from '../../constants'
import Review from '../../components/Comment'
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons'

const Profile = () => {

  return (
    <SafeAreaView className="h-full bg-primary" edges={['top']}>
      <View className="w-full h-[60%] items-center py-2 relative">
        <LinearGradient className="absolute w-full h-[90%] rounded-xl" colors={['#093028', '#237A57']}/>
        {/* <Image source={images.ruins} resizeMode="cover" className="absolute w-full h-full" /> */}
        <View className="w-full h-[10%] items-end justify-center ">
          <View className=" w-10 h-10 mr-2 rounded-lg items-center justify-center ">
            <FontAwesomeIcon icon={faRightFromBracket} color='#ef4444' size={32} />
          </View>
        </View>

        <View className="w-full h-[50%] items-center justify-around ">
          <View className="w-32 h-32  rounded-full overflow-hidden ">
            <Image source={images.avatar} resizeMode="cover" className="w-full h-full" />
          </View>

          <View className="items-center">
            <View className="h-10 rounded-lg items-center justify-center">
              <Text className="text-white font-semibold text-2xl">Monica Perez</Text>
            </View>

            <View className="">
              <Text className="text-blue-400">monica@gmail.com</Text>
            </View>
          </View>
        </View>

        <View className="w-[90%] h-[15%] flex-row items-center bg-white rounded-t-xl mt-7 ">
          <View className="w-1/2 h-full flex-row items-center justify-center ">
            <FontAwesomeIcon icon={faGem} color='#93c5fd' size={32} />
            <Text className="ml-2">120 puntos</Text>
          </View>
          <View className="w-1/2 h-full flex-row items-center justify-center ">
            <FontAwesomeIcon icon={faTree} color='#22c55e' size={32} />
            <Text className="ml-2">Visitados: 3</Text>
          </View>
        </View>
        <View className="w-[90%] h-[15%] flex-row items-center bg-white rounded-b-xl">
          <View className="w-1/2 h-full flex-row items-center justify-center">
            <CountryFlag isoCode="de" size={25} />
            <Text className="ml-2">Alemania</Text>
          </View>
          <View className="w-1/2 h-full flex-row items-center justify-center ">
            <FontAwesomeIcon icon={faCommentAlt} color='black' size={32} />
            <Text className="ml-2">Reseñas: 3</Text>
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