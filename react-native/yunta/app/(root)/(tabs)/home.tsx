import BannerShape from '@/components/BannerShape'
import { carrusel, images } from '@/constants'
import React from 'react'
import { Dimensions, Image, ImageBackground, Text, View } from 'react-native'
import Animated, { interpolate, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const { width } = Dimensions.get('screen')
const _itemSize = width * .24
const _spacing = 12
const _itemTotalSize = _itemSize + _spacing

function CarouselItem({ imageUri, index, scrollX }: { imageUri: string, index: number, scrollX: SharedValue<number> }) {
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: interpolate(scrollX.value, [index - 1, index, index + 1], [_itemSize / 3, 0, _itemSize / 3])
      }]
    }
  })
  return (
    <Animated.View style={stylez}>
      <Image
        source={imageUri}
        style={{
          width: _itemSize,
          height: _itemSize,
          borderRadius: _itemSize / 2
        }}
      />
    </Animated.View>
  )
}

const Home = () => {
  const scrollX = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x / _itemTotalSize
  })
  return (
    <ImageBackground source={images.bgHome} className="flex-1">
      <BannerShape
        width={250}
        height={80}
        fillColor="#f0c000" // Un amarillo similar al de tu imagen
        strokeColor="#1e609e" // Un azul similar al de tu imagen
        strokeWidth={6}
        cornerRadius={10}
        vNotchDepth={30}
      />
      <View className="w-[220px] h-10 bg-red-400 rounded-lg justify-center px-5">
        <Text>erickloolpez</Text>
      </View>
      <Animated.FlatList
        style={{
          backgroundColor: 'red',
          flexGrow: 0,
          paddingBottom: _itemSize
        }}
        contentContainerStyle={{
          gap: _spacing,
          paddingHorizontal: (width - _itemSize) / 2,
        }}
        data={carrusel}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }) => {
          return <CarouselItem imageUri={item} index={index} scrollX={scrollX} />
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
        snapToInterval={_itemTotalSize}
        decelerationRate={"fast"}
      />
    </ImageBackground>
  )
}

export default Home