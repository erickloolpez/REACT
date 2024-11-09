import { View, ScrollView, Image, TouchableOpacity, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'


import { icons, images, parks } from '../../constants'
import ActivityIcon from '../../components/ActivityIcon'
import SearchInput from '../../components/SearchInput'
import { useGlobalContext } from '../../context/GlobalProvider'


const Home = () => {
  const { userLocation, setUserLocation } = useGlobalContext()
  const [filterParks , setFilterParks] = useState(parks)
  const [selectedActivity, setSelectedActivity] = useState(null)

  const activities = [
    { name: 'Fotografia', image: icons.camara },
    { name: 'Buceo', image: icons.buceo },
    { name: 'Camping', image: icons.camping },
    { name: 'Ciclismo', image: icons.ciclismo },
    { name: 'Canotaje', image: icons.canotaje },
    { name: 'Montar a caballo', image: icons.caballo },
    { name: 'Senderismo', image: icons.senderismo },
  ]

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

  return (
    <SafeAreaView edges={['top']} className="h-full bg-[#fbeecc]">
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <View className="w-full h-[47vh] relative">
          <View className='absolute w-[45%] h-16 top-32  left-0 mt-2 items-center justify-center z-10'>
            <Text style={{ fontFamily: "Pilowlava-Regular" }} className="text-7xl text-white">GEA</Text>
          </View>
          <View className='w-[50%]  absolute top-36  right-0  items-center justify-center z-20 bg-secondary border-x-2 border-white '>
            <Text className="text-white text-lg text-center">"Conoce la grandeza natural de Ecuador."</Text>
          </View>
          <View className="w-[94%] h-[80px] absolute top-4 z-10  ml-3 ">
            <SearchInput />
          </View>
          <Image source={images.marco} resizeMode='cover' className="w-full h-full" />
        </View>


        <View className="w-full h-[18vh] min-h-[18vh] flex-wrap flex-row items-center justify-around content-center oveflow-hidden mb-4 mt-[-30px]  ">
          {activities.map((activity, index) => (
            <ActivityIcon key={index} name={activity.name} image={activity.image} parks={parks} setParks={setFilterParks} selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} />
          ))}
        </View>


        <View className="w-[94%]  flex-row justify-between">
          <View className="w-[48%]">
            {filterParks.filter((_, index) => index % 2 === 0 && index !== 10).map((park, index) => (
              <TouchableOpacity key={index} onPress={() => router.push(`/modals/${park.name}`)}>
                <View className="mb-4 relative ">
                  <Image source={park.image} className="w-full h-auto rounded-lg" resizeMode="cover" />
                  <Image source={park.logo} className="w-[85%] absolute top-[-45px] left-2" resizeMode="contain" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View className="w-[48%]">
            {filterParks.filter((_, index) => index % 2 !== 0 || index == 10).map((park, index) => (
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