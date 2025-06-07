import Presentation from "@/components/(auth)/Presentation";
import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { useAuth } from "@clerk/clerk-expo";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from 'react-native-swiper';

const _bgColor = '#0c0820'
const _bgImage = '420px'

export default function Index() {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0)
  const isLastSlide = activeIndex === onboarding.length - 1

  const { signOut, isLoaded } = useAuth();

  useEffect(() => {
    const handleSignOut = async () => {
      if (isLoaded) {
        try {
          await signOut();
          console.log('Sesión cerrada al inicio de la aplicación');
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      }
    };

    handleSignOut();
  }, [isLoaded, signOut]);

  return (
    <SafeAreaView className="flex-1">
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
                <Presentation key={item.id} isLastSlide={isLastSlide} swiperRef={swiperRef} />
                :
                <ImageBackground source={item.background} key={item.id} className="flex-1 items-center justify-center">
                  <Image
                    source={item.image}
                    className={`${index === 2 ? "w-[320px] h-[320px]" : "w-[420px] h-[420px]"} object-cover `}
                    resizeMode="contain"
                  />
                  <LinearGradient
                    colors={['#00000000', '#000000']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    locations={[0, 1]}
                    pointerEvents='none'
                    className="absolute top-0 left-0 w-full h-full"
                  />
                  <View className={` ${index === 2 ? "absolute bottom-20" : ""} w-11/12`}>
                    <Text style={{ textShadowColor: "black", textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 1 }} className="text-white  font-BlockHead text-2xl font-bold text-center">{item.title}</Text>
                    <Text className="text-white font-Waku text-xl text-center mt-2">{item.description}</Text>
                  </View>
                </ImageBackground>

            ))
          }
        </Swiper>
        <LinearGradient
          colors={['#00000000', _bgColor, _bgColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0, 0.7, 1]}
          pointerEvents='none'
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: "20%"
          }}
        />
        <CustomButton
          title={isLastSlide ? "Get Started" : "Next"}
          onPress={() => isLastSlide ? router.replace('/(auth)/sign-up') : swiperRef.current?.scrollBy(1)}
          className="w-11/12  mb-5"
        />
      </View>
    </SafeAreaView>
  );
}