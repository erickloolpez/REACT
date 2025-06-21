import CarouselItem from '@/components/(home)/CarouselItem'
import BannerShape from '@/components/BannerShape'
import { carrusel, images } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { router } from 'expo-router'
import { Origami } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { Dimensions, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import Animated, { clamp, FadeIn, FadeOut, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width } = Dimensions.get('screen')
const _itemSize = width * .24
const _spacing = 12
const _itemTotalSize = _itemSize + _spacing

const Home = () => {
  const scrollX = useSharedValue(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const splitCarrusel = carrusel.slice(0, 3)
  const dataWithAddButton = [...splitCarrusel, { type: 'ADD_BUTTON' }]

  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = clamp(e.contentOffset.x / _itemTotalSize, 0, carrusel.length - 1)
    const newActiveIndex = Math.round(scrollX.value)

    if (newActiveIndex !== activeIndex) {
      runOnJS(setActiveIndex)(newActiveIndex)
    }
  })

  const scale = useSharedValue(1)
  useEffect(() => {
    if (activeIndex === 3) {
      // Inicia animación infinita
      scale.value = withRepeat(
        withTiming(1.2, { duration: 650 }),
        -1,
        true
      );
    } else {
      // Detiene la animación y vuelve a escala 1
      scale.value = withTiming(1, { duration: 200 });
    }
  }, [activeIndex]);

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const { pickAndUpload } = useGlobalContext()

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground source={images.bgHome} className="flex-1">
        <View style={{ flex: 1 }}>
          <BannerShape
            width={250}
            height={80}
            fillColor="#f0c000" // Un amarillo
            strokeColor="#1e609e" // Un azul
            strokeWidth={6}
            cornerRadius={10}
            vNotchDepth={30}
          />
          <View className="w-[220px] flex-row h-10 bg-red-600 rounded-lg justify-between items-center px-5">
            <Text className="font-Waku text-xl text-white">erickloolpez</Text>
            <View className="flex-row">
              <Origami size={18} color="#fff" />
              <Text className="ml-2 text-white">4</Text>
            </View>
          </View>
          <View className="flex-1 items-center justify-center ">
            {
              activeIndex === 3 ? (
                <View className="w-3/4 h-40 items-center justify-center">
                  <Animated.View style={stylez}>
                    <TouchableOpacity
                      // onPress={pickAndUpload}
                      onPress={() => router.push('/(chat)/n8n')}
                      className="mt-4 bg-white px-4 py-2 rounded-lg"
                    >
                      <Text className="text-center font-BlockHead">Crear historia</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              ) :
                (
                  <TouchableOpacity onPress={() => router.push('/(chat)/n8n')} className="w-60 h-60 bg-white rounded-lg items-center justify-center">
                    <Animated.Image entering={FadeIn.duration(500)} exiting={FadeOut.duration(500)} key={`image-${activeIndex}`} source={carrusel[activeIndex]} className="w-60 h-60 rounded-lg object-contain " />
                  </TouchableOpacity>
                )
            }
          </View>
          <Animated.FlatList
            style={{
              height: 5,
              paddingBottom: _itemSize - 100,
            }}
            contentContainerStyle={{
              gap: _spacing,
              paddingHorizontal: (width - _itemSize) / 2,
            }}
            data={dataWithAddButton}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item, index }) => {
              if (item.type === 'ADD_BUTTON') {
                return <CarouselItem imageUri={item.type} index={index} scrollX={scrollX} _itemSize={_itemSize} />
              }

              return <CarouselItem imageUri={item} index={index} scrollX={scrollX} _itemSize={_itemSize} />
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={1000 / 60}
            snapToInterval={_itemTotalSize}
            decelerationRate={"fast"}
          />
        </View>
      </ImageBackground>

    </SafeAreaView>
  )
}

export default Home