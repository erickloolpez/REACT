import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

import SearchInput from '../../components/SearchInput'
import { icons, images } from '../../constants'
import FollowingIcon from '../../components/FollowingIcon'
import DayIcon from '../../components/DayIcon'


const Home = () => {
  const followers = [
    { icon: icons.avatarOne, margin: 0 },
    { icon: icons.avatarTwo, margin: 38 },
    { icon: icons.avatarThree, margin: 68 },
    { icon: "+4", margin: 98 },
  ]

  const days = [
    { name: 'Lun', day: 1 },
    { name: 'Mar', day: 2 },
    { name: 'Mierc', day: 3 },
    { name: 'Juev', day: 4 },
    { name: 'Vier', day: 5 },
    { name: 'Sab', day: 6 },
    { name: 'Dom', day: 7 },
  ]

  const parks = [
    { name: 'Llanganantes', image: images.llanganantes },
    { name: 'Galapagos', image: images.galapagos },
    { name: 'Podocarpus', image: images.podocarpus },
    { name: 'Machalilla', image: images.machalilla },
    { name: 'El cajas', image: images.cajas },
    { name: 'Cayambe Coca', image: images.cayambe },
    { name: 'Sangay', image: images.sangay },
    { name: 'Sumaco', image: images.sumaco },
    { name: 'Yasuni', image: images.yasuni },
    { name: 'Yacuri', image: images.yacuri },
    { name: 'Cotopaxi', image: images.cotopaxi },
  ]

  return (
    <SafeAreaView edges={['top']} className="h-full bg-[#fbeecc]">
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <View className="w-[94%] h-[80px] relative ">
          <View className='absolute w-[45%] h-16  left-0 mt-2 items-center justify-center'>
            <Text className="text-3xl text-[#CF613C] font-bold">Gea</Text>
          </View>
          <Image source={icons.rayita} resizeMode="contain" className="w-14 h-[15px] absolute bottom-4 left-14 " />
          <SearchInput />
        </View>

        <View className="w-[94%] h-[20vh] bg-[#17301A] rounded-2xl justify-center overflow-hidden relative">

          <View className="w-[60%] h-full p-2 overflow-hidden justify-around z-10">

            <View className="">
              <Text className="text-2xl text-white font-bold">Noticia del Dia</Text>
            </View>
            <View className="">
              <Text className="text-white">Hoy en dia se entregara mas de dos pollitos pio en la entrada del parque.</Text>
            </View>
            <View className="flex-row relative w-full h-12">
              {followers.map((follower, index) => (
                <FollowingIcon key={index} follower={follower} index={index} />
              ))}
            </View>

          </View>

          <Image source={images.coto} className="w-[100%] h-full absolute top-8 right-[-180px] z-0 " resizeMode="cover" />

        </View>

        <View className="w-[94%] h-[10vh] flex-row items-center justify-around">
          {days.map((day, index) => (
            <DayIcon key={index} date={day} />
          ))}
        </View>

        <View className="w-[94%] mb-3 ">
          <Text className="text-2xl font-bold">Parques</Text>
        </View>

        <View className="w-[94%]  flex-row justify-between">
          <View className="w-[48%]">
            {parks.filter((_, index) => index % 2 === 0 && index !== 10).map((park, index) => (
              <View key={index} className="mb-4 ">
                <Image source={park.image} className="w-full h-auto rounded-lg" resizeMode="cover" />
              </View>
            ))}
          </View>
          <View className="w-[48%]">
            {parks.filter((_, index) => index % 2 !== 0 || index == 10).map((park, index) => (
              <View key={index} className="mb-4  relative">
                <Image source={park.image} className="w-full h-auto rounded-lg" resizeMode="cover" />
                {/* <View className="w-full bg-green-400 h-full absolute">

                </View> */}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home