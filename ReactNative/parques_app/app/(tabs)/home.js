import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'

import SearchInput from '../../components/SearchInput'
import { icons, images, parks } from '../../constants'
import FollowingIcon from '../../components/FollowingIcon'
import { router } from 'expo-router'
import ActivityIcon from '../../components/ActivityIcon'


const Home = () => {
  const followers = [
    { icon: icons.avatarOne, margin: 0 },
    { icon: icons.avatarTwo, margin: 38 },
    { icon: icons.avatarThree, margin: 68 },
    { icon: "+4", margin: 98 },
  ]

  const activities = [
    { name: 'Senderismo', image: icons.senderismo },
    { name: 'Fotografia', image: icons.camara },
    { name: 'Montar a caballo', image: icons.caballo },
    { name: 'Buceo', image: icons.buceo },
    { name: 'Camping', image: icons.camping },
    { name: 'Ciclismo', image: icons.ciclismo },
    { name: 'Canotaje', image: icons.canotaje },
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

        {/*
         <View className="w-[94%] min-h-[25vh] h-[25vh] bg-[#17301A] rounded-2xl justify-around overflow-hidden relative">
          <View className="w-[60%] h-full p-2 overflow-hidden justify-around z-10">
            <View className="">
              <Text className="text-2xl text-white font-bold ">Noticia del Dia</Text>
            </View>
            <View className="">
              <Text className=" text-white">Hoy en dia se entregara mas de dos pollitos pio en la entrada del parque.</Text>
            </View>
            <View className="flex-row relative w-full h-14">
              {followers.map((follower, index) => (
                <FollowingIcon key={index} follower={follower} index={index} />
              ))}
            </View>
          </View>
          <Image source={images.coto} className="w-[100%] h-full absolute top-8 right-[-180px] z-0 " resizeMode="cover" />
        </View>
        */}


        {/*
         <View className="w-[94%]  mt-4 ">
          <Text className="text-2xl font-bold text-[#CF613C]">Parques</Text>
        </View> 
        */}
        <View className="w-[94%] h-[18vh] min-h-[18vh] flex-wrap flex-row items-center justify-around mt-2  content-center oveflow-hidden ">
          {activities.map((activity, index) => (
            <ActivityIcon key={index} name={activity.name} image={activity.image} />
          ))}
        </View> 


        <View className="w-[94%]  flex-row justify-between">
          <View className="w-[48%]">
            {parks.filter((_, index) => index % 2 === 0 && index !== 10).map((park, index) => (
              <TouchableOpacity key={index} onPress={() => router.push(`/modals/${park.name}`)}>
                <View className="mb-4 relative ">
                  <Image source={park.image} className="w-full h-auto rounded-lg" resizeMode="cover" />
                  <Image source={park.logo} className="w-[85%] absolute top-[-45px] left-2" resizeMode="contain" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View className="w-[48%]">
            {parks.filter((_, index) => index % 2 !== 0 || index == 10).map((park, index) => (
              <TouchableOpacity key={index} onPress={() => router.push(`/modals/${park.name}`)}>
                <View className="mb-4 relative ">
                  <Image source={park.image} className="w-full h-auto rounded-lg" resizeMode="cover" />
                  <Image source={park.logo} className="w-[85%] absolute bottom-[-45px] left-2" resizeMode="contain" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home