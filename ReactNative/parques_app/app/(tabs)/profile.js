import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MoreHorizontalCircle01Icon } from 'hugeicons-react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCrown, faTree } from '@fortawesome/free-solid-svg-icons'
import CountryFlag from 'react-native-country-flag'

import { images } from '../../constants'
import Review from '../../components/Comment'

const Profile = () => {

  return (
    <SafeAreaView className="h-full bg-primary" edges={['top']}>
      <View className="w-full h-full items-center">
        <View className="w-full h-[10%] items-end justify-center ">
          <MoreHorizontalCircle01Icon
            className="mr-4"
            size={32}
            color={"#17301A"}
            variant={"stroke"}
          />
        </View>

        <View className="w-full h-[40%] items-center justify-around">
          <View className="w-36 h-36  rounded-full overflow-hidden ">
            <Image source={images.avatar} resizeMode="cover" className="w-full h-full" />
          </View>

          <View className="w-full items-center justify-center">
            <Text>Monica Perez</Text>
          </View>

          <View className="flex-row items-center">
            <CountryFlag isoCode="de" size={25} />
            <Text className="ml-2">Alemania</Text>
          </View>
        </View>

        <View className="w-[90%] h-[10%] border-t-2 border-b-2 flex-row items-center">
          <View className="w-1/2 h-[80%] flex-row items-center justify-center border-r-2">
            <FontAwesomeIcon icon={faCrown} color='#eab308' size={32} />
            <Text className="ml-2">120 puntos</Text>
          </View>
          <View className="w-1/2 h-full flex-row items-center justify-center ">
            <FontAwesomeIcon icon={faTree} color='#22c55e' size={32} />
            <Text className="ml-2">Visitados: 3</Text>
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

      </View>
    </SafeAreaView>
  )
}

export default Profile