import { View, Image, Text, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { icons, parks } from '../../constants'
import Cards from '../../components/Cards'
import { allTrends } from '../../constants'

const Search = () => {

  const { width } = Dimensions.get('window')
  const _slideWidth = width * 0.65
  const _slideHeight = _slideWidth * 1.37
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
        className="w-full h-full absolute"
        style={stylez}
        blurRadius={20}
      />
    )

  }

  function BackDropText({ text, index, scrollX, name }) {
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
      <Animated.View className="absolute w-[95%] h-36 top-20 left-2" style={stylez}>
        <View className="w-full h-full bg-primary absolute border-2 black z-10 rounded-xl px-2 items-center justify-evenly" >
          <Text className="text-lg font-bold">{name}</Text>
          <Text numberOfLines={4} className="text-black">"{text}"</Text>
        </View>

        <View className="w-full h-full bg-green-700 absolute border-2 border-black rounded-xl top-2" />
        <Image source={icons.ayaHuma} className="w-8 h-8 absolute top-1 left-1 z-20" resizeMode="contain" />
        <Image source={icons.condor} className="w-8 h-8 absolute bottom-0 right-0 z-20" resizeMode="contain" />
      </Animated.View>
    )

  }

  return (
    <SafeAreaView edges={['top']} className="h-full bg-[#fbeecc]">
      <View className="w-full h-full relative">
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
        {/* {
          allTrends.map((park, index) => (
            <BackDropText
              key={`bg-photo-${park.name}`}
              index={index}
              scrollX={scrollX}
              text={park.desc}
              name={park.name}
            />
          ))
        } */}

        <View className="w-2/3 h-15 absolute top-4 right-0  bg-secondary rounded-l-full">
          <View className="w-full h-full bg-secondary  rounded-l-full z-20 items-center">
            <Text className="text-2xl uppercase text-white font-bold">Atractivos</Text>
          </View>
          <View className="w-full h-full absolute  bottom-1 bg-blue-500 rounded-l-full border-2" />
        </View>

        <View className="w-full h-[52vh] absolute bottom-2  ">
          <Animated.FlatList
            data={allTrends}
            keyExtractor={(trend) => trend.name}
            renderItem={({ item: trend, index }) => (
              //  <TrendList trends={park.trend} park={park} scrollX={scrollX} index={index} />
              <Cards key={trend.name} trend={trend} scrollX={scrollX} index={index} width={_slideWidth} height={_slideHeight} />
            )
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={_slideWidth + _spacing}
            decelerationRate={"fast"}
            contentContainerStyle={{
              gap: _spacing,
              paddingHorizontal: (width - _slideWidth) / 2,
              alignItems:'center'
            }}

            onScroll={onScroll}
            scrollEventThrottle={100 / 60}

          />
        </View>
      </View>


    </SafeAreaView>

  )
}

export default Search