import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import AnimatedLottieView from 'lottie-react-native';
import { ArrowLeft } from "lucide-react-native";
import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const N8n = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0)
  const [onboarding, setOnboarding] = useState(['History', 'Words', 'Practice'])

  const [ready, setReady] = useState(false)
  const [character, setCharacter] = useState('')
  const [place, setPlace] = useState('')

  const callWebhook = () => {
    setReady(true)
  }

  const move = useSharedValue(0)
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          // translateX: interpolate(move.value, [0, 100], [-50, 50], 'clamp')
          rotate: `${move.value}deg`, // importante el string con 'deg'
        },
      ],
    }
  })

  useEffect(() => {
    move.value = withRepeat(
      withTiming(-15, { duration: 3000 }),
      -1, // repetir infinito
      true // reversa (va de 0 a 100 y vuelve a 0)
    );
  }, []);

  const [customHeight, setCustomHeight] = useState(false);

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground source={images.bgHome} className="flex-1">
        <View className="h-24 flex-row relative items-center justify-center">
          <View className="absolute left-3 bg-[#003366] rounded-full p-3">
            <ArrowLeft size={28} color="#fff" />
          </View>
          <Text className="font-BlockHead text-[#FFD200] text-2xl">Hola mundo</Text>
        </View>
        <View className="flex-row justify-center">
          <Animated.Image
            source={images.steve}
            className="w-40 object-contain"
            style={[{ height: customHeight ? 100 : 240 }, imageAnimatedStyle]}
          />
        </View>
        <View className="flex-1 rounded-t-3xl bg-[#003366] overflow-hidden ">
          {
            ready == true ? (
              <View>
                <AnimatedLottieView style={{ width: 200, height: 200 }} source={require('@/assets/gifs/cat.json')} autoPlay loop />
              </View>
              // <Swiper
              //   ref={swiperRef}
              //   loop={false}
              //   dot={<View className="w-[32px] h-[4px] mx-1 bg-[#e2e8f0] rounded-full" />}
              //   activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#FFD200] rounded-full" />}
              //   onIndexChanged={(index) => setActiveIndex(index)}
              //   paginationStyle={{ bottom: 25 }}
              // >
              //   {
              //     onboarding.map((item, index) => (
              //       <View key={`${item}-index`} className="flex-1 p-6" >
              //         <Text className="font-Waku text-white text-base/7">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit doloremque magni ipsum minima delectus. Distinctio optio numquam esse perferendis tenetur natus nulla corporis quia, officia commodi ratione consectetur praesentium. Necessitatibus.</Text>
              //       </View>
              //     ))
              //   }
              // </Swiper>
            ) : (
              <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 0} // Ajusta según tu header
              >
                <View className="flex-1 p-4 items-center justify-around">
                  <View className="w-full">
                    <View className="flex-row gap-2 items-center">
                      <View className="w-10 h-10 bg-[#FFD200] rounded-full items-center justify-center">
                        <Text className="font-BlockHead text-white" >1</Text>
                      </View>
                      <Text className="flex-1 font-BlockHead text-white ">Quien quieres que sea el personaje de tu historia ?</Text>
                    </View>
                    <TextInput
                      className="w-full h-10 mt-8 bg-white rounded-md p-2 font-Waku"
                      placeholder="Escribe el nombre de tu personaje"
                      placeholderTextColor="#000"
                      onChangeText={(text) => setCharacter(text)}
                    />
                  </View>
                  <View className="w-full">
                    <View className="flex-row gap-2 items-center">
                      <View className="w-10 h-10 bg-[#FFD200] rounded-full items-center justify-center">
                        <Text className="font-BlockHead text-white" >1</Text>
                      </View>
                      <Text className="flex-1 font-BlockHead text-white ">Quien quieres que sea el personaje de tu historia ?</Text>
                    </View>
                    <TextInput
                      className="w-full h-10 mt-8 bg-white rounded-md p-2 font-Waku"
                      placeholder="Escribe el nombre de tu personaje"
                      placeholderTextColor="#000"
                      onChangeText={(text) => setPlace(text)}
                      onFocus={() => setCustomHeight(true)}
                      onSubmitEditing={() => setCustomHeight(false)}
                    />
                  </View>
                  <CustomButton
                    title="Comenzar"
                    textVariant="default"
                    onPress={callWebhook}
                  />
                </View>
              </KeyboardAvoidingView>
            )
          }
        </View>
      </ImageBackground>
    </SafeAreaView >
  )
}

export default N8n