import Presentation from "@/components/(auth)/Presentation";
import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { useRef, useState } from 'react';
import { Image, ImageBackground, Text, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from 'react-native-swiper';

const _bgColor = '#0c0820'

export default function Index() {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0)
  const isLastSlide = activeIndex === onboarding.length - 1

  return (
    <SafeAreaView className="flex-1">
      <GestureHandlerRootView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: _bgColor,
            overflow: 'hidden'
          }}
        >
          <Swiper
            ref={swiperRef}
            loop={false}
            dot={<View className="w-[32px] h-[4px] mx-1 bg-[#e2e8f0] rounded-full" />}
            activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#0286ff] rounded-full" />}
            onIndexChanged={(index) => setActiveIndex(index)}
            paginationStyle={{ bottom: 25 }}
          >
            {
              onboarding.map((item, index) => (
                index === 0 ?
                  <Presentation key={item.id} />
                  :
                  <ImageBackground source={item.background} key={item.id} className="flex-1 items-center justify-center">
                    <Image
                      source={item.image}
                      className="w-[420px] h-[420px] object-cover"
                      resizeMode="cover"
                    />
                    <LinearGradient
                      colors={['#00000000', '#000000']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      locations={[0, 1]}
                      pointerEvents='none'
                      className="absolute top-0 left-0 w-full h-full"
                    />
                    <View className="absolute bottom-24 w-11/12">
                      <Text className="text-white text-2xl font-bold text-center">{item.title}</Text>
                      <Text className="text-white text-base text-center mt-2">{item.description}</Text>
                    </View>
                  </ImageBackground>

              ))
            }
          </Swiper>
          <CustomButton
            title={isLastSlide ? "Get Started" : "Next"}
            onPress={() => isLastSlide ? router.replace('/(auth)/sign-up') : swiperRef.current?.scrollBy(1)}
            className="w-11/12  mb-5"
          />
        </View>
      </GestureHandlerRootView >

    </SafeAreaView>
  );
}