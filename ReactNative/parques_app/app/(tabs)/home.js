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
    <SafeAreaView className="h-full bg-[#fbeecc]">
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <View className="w-[94%] h-[80px] relative bg-yellow-500">
          <Text className='absolute bg-red-400 w-[45%] h-16  left-0 mt-2 text-xl font-bold'>
            Explora los parques con{' '}
            <Text>Gea</Text>
          </Text>
          <SearchInput />
        </View>

        <View className="w-[94%] h-[20vh] bg-[#B2A1FF] rounded-2xl justify-center overflow-hidden relative">

          <View className="w-[60%] h-full overflow-hidden justify-center z-10">

            <View className=" bg-blue-600  ">
              <Text className="text-2xl">Noticia del Dia</Text>
            </View>
            <View className="">
              <Text>Hoy en dia se entregara mas de dos pollitos pio en la entrada del parque.</Text>
            </View>
            <View className="flex-row bg-green-400 relative w-full h-12">
              {followers.map((follower, index) => (
                <FollowingIcon key={index} follower={follower} index={index} />
              ))}
            </View>

          </View>

          <Image source={images.cotopaxi} className="w-[100%] h-full absolute right-[-140px] z-0 " resizeMode="cover" />

        </View>

        <View className="w-[94%] h-[10vh] bg-orange-400 flex-row items-center justify-around">
          {days.map((day, index) => (
            <DayIcon key={index} date={day} />
          ))}
        </View>

        <View className="w-[94%] bg-pink-400">
          <Text className="text-2xl">Parques</Text>
        </View>

        <View className="w-[94%] bg-green-900 flex-row justify-between">
          <View className="w-[48%]">
            {parks.filter((_, index) => index % 2 === 0 && index !== 10).map((park, index) => (
              <View key={index} className="mb-4 bg-blue-300">
                <Image source={park.image} className="w-full h-auto rounded-lg" resizeMode="cover" />
              </View>
            ))}
          </View>
          <View className="w-[48%]">
            {parks.filter((_, index) => index % 2 !== 0 || index == 10).map((park, index) => (
              <View key={index} className="mb-4 bg-blue-300 relative">
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