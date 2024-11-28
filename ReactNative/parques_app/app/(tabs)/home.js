import { View, Text, Dimensions, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useState } from 'react'

import { parks } from '../../constants'
import Cards from '../../components/Cards'
import BackDropText from '../../components/BackDropText';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMountainSun } from '@fortawesome/free-solid-svg-icons'
import CondorComponent from '../../assets/svgs/condor'
import HumaComponent from '../../assets/svgs/huma'
import { LinearGradient } from 'expo-linear-gradient'

const Home = () => {

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

  function BackDropImage({ name, index, scrollX }) {
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
      <Animated.View
        className="absolute right-0 left-0 m-8  items-center justify-center"
        style={stylez}
      >
        <Text className="text-xl font-bold uppercase text-white">{name}</Text>
      </Animated.View>
      // <Animated.Image
      //   source={image}
      //   className="w-full h-[130vh] absolute"
      //   style={stylez}
      //   blurRadius={10}
      // />
    )

  }

  return (
    <LinearGradient className="w-full h-full" colors={['#5A3F37', '#2C7744']}>
      <SafeAreaView edges={['top']} className="h-full ">
        <View className="w-full h-[12%] relative bg-secondary justify-between px-8 border-white border-t-2 border-b-2 items-center mt-3 flex-row">
          <HumaComponent />
          {
            parks.slice(0, visibleParks).map((park, index) => (
              <BackDropImage
                key={`bg-photo-${park.name}`}
                index={index}
                scrollX={scrollX}
                name={park.name}
              // image={park.image}
              />
            ))
          }
          <CondorComponent />
        </View>

        <View className="w-full h-[50%] ">
          <Animated.FlatList
            data={parks.slice(0, visibleParks)}
            keyExtractor={(park) => park.name}
            renderItem={({ item: park, index }) => (
              <Cards key={`park-name${park.name}-${index}`} park={park} scrollX={scrollX} index={index} width={_slideWidth} height={_slideHeight} />
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

        <View className="w-full h-[38%]  mt-2 items-center ">
          {
            parks.slice(0, visibleParks).map((park, index) => (
              <BackDropText
                key={`bg-text-${park.name}`}
                index={index}
                scrollX={scrollX}
                park={park}
              />
            ))
          }
        </View>
      </SafeAreaView>
    </LinearGradient>

  )
}


export default Home