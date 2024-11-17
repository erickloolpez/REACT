import { View, ScrollView, Image, TouchableOpacity, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import * as Location from 'expo-location'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'


import { icons, images, parks, trends } from '../../constants'
import ActivityIcon from '../../components/ActivityIcon'
import SearchInput from '../../components/SearchInput'
import { useGlobalContext } from '../../context/GlobalProvider'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


const Search = () => {
  const { userLocation, setUserLocation } = useGlobalContext()
  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      alert('Permission denied.')
      return
    }

    let location = await Location.getCurrentPositionAsync()

    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }

    setUserLocation(current)

  }

  useEffect(() => {
    getLocationPermission()
  }, [])

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
    <SafeAreaView edges={['top']} className="h-full bg-[#fbeecc]">
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <View className="w-full h-[37vh] relative">
          <View className="w-[94%] h-20 absolute top-32 z-10 ml-3  justify-center ">
            <SearchInput animatedStyle={animatedStyle} setOpenSearch={setOpenSearch} animation={animation} openSearch={openSearch} />
          </View>

          <Animated.View className='absolute h-16 top-32 left-0 mt-2 items-center justify-center z-10' style={stylez}>
            <Text style={{ fontFamily: "Pilowlava-Regular" }} className="text-7xl text-white">GEA</Text>
          </Animated.View>

          <Image source={images.marco} resizeMode='cover' className="w-full h-full" />
        </View>

        <View className="w-full h-[30vh] px-1">
          <View className="w-full h-[20%] flex-row items-center justify-between">
            <Text className="text-2xl">Parques Nacionales</Text>
            <FontAwesomeIcon icon={faAngleRight} color='black' size={28} />
          </View>
          <TouchableOpacity
            onPress={() => {
              router.push(`/search/Parks`)
            }}
            className="w-full h-[80%] flex-row rounded-xl overflow-hidden"
          >
            {
              parksCover.map((cover, index) => (
                <View key={`maps-cover-${index}`} className="w-1/4 h-full border-primary border-r-2 " >
                  <Image source={cover} resizeMode="cover" className="w-full h-full" />
                </View>
              ))
            }
          </TouchableOpacity>
        </View>

        <View className="w-full h-[30vh] px-1 mt-4 mb-4">
          <View className="w-full h-[20%] flex-row items-center justify-between">
            <Text className="text-2xl">Atractivos</Text>
            <FontAwesomeIcon icon={faAngleRight} color='black' size={28} />
          </View>
          <TouchableOpacity
            onPress={() => {
              router.push(`/search/Attractives`)
            }}
            className="w-full h-[80%] flex-row rounded-xl overflow-hidden"
          >
            {
              attractivesCover.map((cover, index) => (
                <View key={`maps-cover-${index}`} className="w-1/4 h-full border-primary border-r-2 " >
                  <Image source={cover} resizeMode="cover" className="w-full h-full" />
                </View>
              ))
            }
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Search