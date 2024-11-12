import { router } from 'expo-router';
import { Text, View, Animated, Image, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { useEffect, useRef } from 'react';

import images from '../constants/images';
import CustomButton from '../components/CustomButton';


export default function App() {
  const animation = useRef(new Animated.Value(0)).current

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     startAnimation()
  //   }, 2000)
  //   setTimeout(() => {
  //     router.replace('/home')
  //   }, 2500)
  // }, [])

  return (
    // <View className="flex-1 items-center justify-center bg-primary">
    //   <Animated.View className="w-28 h-48" style={{ transform: [{ scale: animation.interpolate({ inputRange: [0, 1], outputRange: [1, 20] }) }] }}>
    //     <Image source={images.isotipo} className="w-full h-full" />
    //   </Animated.View>
    // </View>
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <View
            className="w-[130px] h-[84px]  items-center justify-center"
          >
            <Text style={{ fontFamily: 'Pilowlava-Regular' }} className="text-5xl text-green-900 ">GEA</Text>
          </View>

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-terciary font-bold text-center">
              Discover Endless Possibilities with: {' '}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
              tintColor={'#17301a'}
            />
          </View>

          <Text
            className="text-sm font-pregular text-gray-100 mt-7 text-center"
          >Where creativity meets innovation: embark on a journey of limitless exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => { router.push('/sign-in') }}
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
