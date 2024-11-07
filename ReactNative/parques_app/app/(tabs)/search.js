import { View, Text, Dimensions, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useState } from 'react'

import { parks } from '../../constants'
import Cards from '../../components/Cards'
import { allTrends } from '../../constants'
import BackDropText from '../../components/BackDropText';

const Search = () => {

  const { width } = Dimensions.get('window')
  const _slideWidth = width * 0.45
  const _slideHeight = _slideWidth * 1.70
  const _spacing = 18

  const scrollX = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (_slideWidth + _spacing)
  })

  function BackDropImage({ image, index, scrollX }) {
    const stylez = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          scrollX.value,
          [index - 1, index, index + 1],
          [0, 1, 0]
        )
      }
    })

    return (
      <Animated.Image
        source={image}
        className="w-full h-[120vh] absolute"
        style={stylez}
        blurRadius={2}
      />
    )

  }

  return (
    <SafeAreaView edges={['top']} className="h-full bg-[#fbeecc]">
      <ScrollView>
        {
          allTrends.map((trend, index) => (
            <BackDropImage
              key={`bg-photo-${trend.name}`}
              index={index}
              scrollX={scrollX}
              image={trend.image}
            />
          ))
        }

        <View className="w-full h-[7vh] justify-end items-center  relative">
          <View className="w-[90%] h-[80%]  bg-secondary rounded-xl">
            <View className="w-full h-full bg-secondary rounded-xl z-20 items-center">
              <Text style={{ fontFamily: "Pilowlava-Regular" }} className="text-4xl text-white">GEA</Text>
            </View>
            <View className="w-full h-full absolute  bottom-1 bg-white rounded-xl border-2" />
          </View>
        </View>

        <View className="w-full h-[50vh]">
          <Animated.FlatList
            data={parks}
            keyExtractor={(park) => park.name}
            renderItem={({ item: park, index }) => (
              <Cards key={park.name} park={park} scrollX={scrollX} index={index} width={_slideWidth} height={_slideHeight} />
            )
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={_slideWidth + _spacing}
            decelerationRate={"fast"}
            contentContainerStyle={{
              gap: _spacing,
              paddingHorizontal: (width - _slideWidth) / 2,
              alignItems: 'center'
            }}

            onScroll={onScroll}
            scrollEventThrottle={100 / 60}
          />
        </View>

        <View className="w-full h-[60vh] mt-2">
          {
            parks.map((park, index) => (
              <BackDropText
                key={`bg-photo-${park.name}`}
                index={index}
                scrollX={scrollX}
                park={park}
              />
            ))
          }

        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default Search