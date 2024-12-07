import { View, ScrollView, Image, TouchableOpacity, Text, Touchable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { router } from 'expo-router'
import { useState } from 'react'


import { images, trends } from '../../constants'
import SearchInput from '../../components/SearchInput'
import { faAngleRight, faFireFlameCurved } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { LinearGradient } from 'expo-linear-gradient'


const Search = () => {
  const widthLength = '100%'

  const [openSearch, setOpenSearch] = useState(0)

  const animation = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width:
        animation.value == 1 ? withTiming(widthLength, { duration: 500 }) : withTiming('14%', { duration: 500 }),
    }
  })

  const stylez = useAnimatedStyle(() => {
    return {
      opacity:
        animation.value == 1 ? withTiming(0, { duration: 500 }) : withTiming(1, { duration: 500 })
    }
  })

  const parksCover = [images.llanganantes, images.galapagos, images.machalilla, images.cajas]
  const attractivesCover = [trends.cayambeVolcan, trends.llanganatePisayambo, trends.yacuriBosque, trends.podocarpusCajanuma]

  return (
    <LinearGradient className="w-full h-full" colors={['#5A3F37', '#2C7744']}>
      <SafeAreaView edges={['top']} className="h-full ">
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
          <View className="w-full h-[12vh] relative">
            <View className="w-[94%] h-20 absolute top-4 z-10 ml-3  justify-center ">
              <SearchInput animatedStyle={animatedStyle} setOpenSearch={setOpenSearch} animation={animation} openSearch={openSearch} />
            </View>

            <Animated.View className='absolute h-16 top-4 left-0 mt-2 items-center justify-center z-10' style={stylez}>
              <Text style={{ fontFamily: "Pilowlava-Regular" }} className="text-5xl text-white">GEA</Text>
            </Animated.View>

            {/* <Image source={images.marco} resizeMode='cover' className="w-full h-full rounded-b-3xl" /> */}
          </View>

          <TouchableOpacity
            className="w-full h-[30vh] px-1 mt-2"
            onPress={() => {
              router.push(`/search/Parks`)
            }}
          >
            <View className="w-full h-[20%] flex-row items-center justify-between">
              <Text className="text-xl text-[#fff] font-semibold">Parques Nacionales</Text>
              <FontAwesomeIcon icon={faAngleRight} color='white' size={28} />
            </View>
            <View
              className="w-full h-[80%] flex-row rounded-xl overflow-hidden"
            >
              {
                parksCover.map((cover, index) => {
                  if (index === parksCover.length - 1) {
                    return (
                      <View key={`maps-cover-${index}`} className="w-1/4 h-full" >
                        <Image source={cover} resizeMode="cover" className="w-full h-full" />
                      </View>
                    )
                  } else {
                    return (
                      <View key={`maps-cover-${index}`} className="w-1/4 h-full border-white border-r-2 " >
                        <Image source={cover} resizeMode="cover" className="w-full h-full" />
                      </View>
                    )
                  }
                })
              }
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push(`/search/Popular`)
            }}
            className="w-full h-[48vh] mt-4"
          >
            <View className="flex-row items-center h-[10%] justify-between px-1 ">
              <View className="flex-row items-center">
                <FontAwesomeIcon icon={faFireFlameCurved} color='#f97313' size={28} />
                <Text className="text-white text-xl font-semibold ml-1">Atractivos Populares</Text>
              </View>
              <FontAwesomeIcon icon={faAngleRight} color='white' size={28} />
            </View>
            <View className="w-full h-[90%] flex-row flex-wrap justify-around ">
              <View className="w-[48%] h-[48%] bg-white rounded-lg overflow-hidden">
                <Image source={trends.galapagosFenomeno} resizeMode="cover" className="w-full h-full" />
              </View>
              <View className="w-[48%] h-[48%] bg-white rounded-lg overflow-hidden">
                <Image source={trends.sangayAltar} resizeMode="cover" className="w-full h-full" />
              </View>
              <View className="w-[48%] h-[48%] bg-white rounded-lg overflow-hidden mt-3">
                <Image source={trends.sangayTun} resizeMode="cover" className="w-full h-full" />
              </View>
              <View className="w-[48%] h-[48%] bg-white rounded-lg overflow-hidden mt-3">
                <Image source={trends.yasuniComunidad} resizeMode="cover" className="w-full h-full" />
              </View>
            </View>

          </TouchableOpacity>

          <TouchableOpacity className="w-full h-[30vh] px-1 mt-4 mb-4">
            <View className="w-full h-[20%] flex-row items-center justify-between">
              <Text className="text-xl text-white font-semibold">Atractivos</Text>
              <FontAwesomeIcon icon={faAngleRight} color='white' size={28} />
            </View>
            <TouchableOpacity
              onPress={() => {
                router.push(`/search/Attractives`)
              }}
              className="w-full h-[80%] flex-row rounded-xl overflow-hidden"
            >
              {
                attractivesCover.map((cover, index) => {
                  if (index === parksCover.length - 1) {
                    return (
                      <View key={`maps-attractive-${index}`} className="w-1/4 h-full" >
                        <Image source={cover} resizeMode="cover" className="w-full h-full" />
                      </View>
                    )
                  } else {
                    return (
                      <View key={`maps-cover-${index}`} className="w-1/4 h-full border-white border-r-2 " >
                        <Image source={cover} resizeMode="cover" className="w-full h-full" />
                      </View>
                    )
                  }
                })
              }
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>

      </SafeAreaView>
    </LinearGradient>
  )
}

export default Search