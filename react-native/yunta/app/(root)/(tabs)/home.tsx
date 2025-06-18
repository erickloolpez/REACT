import BannerShape from '@/components/BannerShape'
import { carrusel, images } from '@/constants'
import { router } from 'expo-router'
import { Origami, PlusIcon } from 'lucide-react-native'
import React, { useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import Animated, { clamp, FadeIn, FadeOut, interpolate, interpolateColor, runOnJS, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width } = Dimensions.get('screen')
const _itemSize = width * .24
const _spacing = 12
const _itemTotalSize = _itemSize + _spacing

function CarouselItem({ imageUri, index, scrollX }: { imageUri: string, index: number, scrollX: SharedValue<number> }) {
  const stylez = useAnimatedStyle(() => {
    return {
      borderWidth: 4,
      borderColor: interpolateColor(scrollX.value, [index - 1, index, index + 1], ['transparent', 'white', 'transparent']),
      transform: [{
        translateY: interpolate(scrollX.value, [index - 1, index, index + 1], [_itemSize / 3, 0, _itemSize / 3])
      }]
    }
  })
  return (
    <Animated.View style={[
      {
        width: _itemSize,
        height: _itemSize,
        borderRadius: _itemSize / 2,
      },
      stylez]}>
      {
        imageUri === 'ADD_BUTTON' ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              borderRadius: _itemSize / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: "#1e609e",
            }}
          >
            <PlusIcon size={32} color="#fff" />
          </View>
        ) :
          (
            <Image
              source={imageUri}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: _itemSize / 2
              }} />
          )
      }
    </Animated.View >
  )
}

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
            <TouchableOpacity onPress={() => router.push('/(chat)/n8n')} className="w-60 h-60 bg-white rounded-lg items-center justify-center">
              <Animated.Image entering={FadeIn.duration(500)} exiting={FadeOut.duration(500)} key={`image-${activeIndex}`} source={carrusel[activeIndex]} className="w-60 h-60 rounded-lg object-contain " />
            </TouchableOpacity>
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
                return <CarouselItem imageUri={item.type} index={index} scrollX={scrollX} />
              }

              return <CarouselItem imageUri={item} index={index} scrollX={scrollX} />
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