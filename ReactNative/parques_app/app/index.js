import { router } from 'expo-router';
import { Text, View, Animated, Image, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { useEffect, useRef } from 'react';
import * as Location from 'expo-location'
import { signOut } from '../lib/appwrite';

import images from '../constants/images';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';


export default function App() {
  const animation = useRef(new Animated.Value(0)).current

  const { userLocation, setUserLocation } = useGlobalContext()

  useEffect(() => {
    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        console.log('Permission denied.')
        return
      }

      let location = await Location.getCurrentPositionAsync({})

      const current = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }

      setUserLocation(current)

    }
    getLocationPermission()
  }, [])

  // const logout = async () => {
  //   await signOut()
  //   setUser(null)
  //   setIsLogged(false)

  //   router.replace('/sign-in')
  // }

  // logout()


  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <View
            className="w-[130px] h-[84px]  items-center justify-center"
          >
            <Text style={{ fontFamily: "Pilowlava-Regular" }} className="text-5xl text-green-900 ">GEA</Text>
          </View>

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-terciary font-bold text-center">
              Descubre todas las posibilidades con {' '}
              <Text className="text-secondary-200">Gea</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
              tintColor={'#17301a'}
            />
          </View>

          <Text
            className="text-sm font-pregular  mt-7 text-center"
          >Cuando la creatividad conoce la innovacion: embarcate a un viaje sin limites con Gea
          </Text>

          <CustomButton
            title="Continue with Email"
            // handlePress={() => { router.push('/sign-in') }}
            handlePress={() => { router.push('/home') }}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar
        backgroundColor="#161622"
        style='light'
      />
    </SafeAreaView>
  );
}
