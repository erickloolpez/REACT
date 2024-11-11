import { View, Text, Dimensions, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useState } from 'react'

import { parks } from '../../constants'
import Cards from '../../components/Cards'
import { allTrends } from '../../constants'
import BackDropText from '../../components/BackDropText';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMountainSun } from '@fortawesome/free-solid-svg-icons'

const Search = () => {

  const { width } = Dimensions.get('window')
  const _slideWidth = width * 0.45
  const _slideHeight = _slideWidth * 1.70
  const _spacing = 18

  const [visibleParks, setVisibleParks] = useState(5); // Número inicial de parques visibles

  const loadMoreParks = () => {
    setVisibleParks(prevCount => prevCount + 6); // Incrementa la cantidad de elementos visibles en 5
  };

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
          parks.slice(0, visibleParks).map((park, index) => (
            <BackDropImage
              key={`bg-photo-${park.name}`}
              index={index}
              scrollX={scrollX}
              image={park.image}
            />
          ))
        }

        <View className="w-36 h-[7vh] justify-end items-center  relative">
          <View className="w-[90%] h-[80%]  bg-secondary rounded-lg">
            <View className="w-full h-full bg-secondary rounded-lg z-20 items-center flex-row justify-around">
              <Text style={{ fontFamily: "Pilowlava-Regular" }} className="text-2xl text-white">GEA</Text>
              <FontAwesomeIcon icon={faMountainSun} color='white' size={32} />
            </View>
            <View className="w-full h-full absolute  top-1 right-1 bg-white rounded-lg border-2" />
          </View>
        </View>

        <View className="w-full h-[50vh]">
          <Animated.FlatList
            data={parks.slice(0, visibleParks)}
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

            onEndReached={loadMoreParks}
            onEndReachedThreshold={0.5}
          />
        </View>

        <View className="w-full h-[60vh] mt-2">
          {
            parks.slice(0, visibleParks).map((park, index) => (
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