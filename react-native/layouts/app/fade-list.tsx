import { useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

// import { parks } from '../../constants'
import FadeText from '@/components/FadeText'
import { podocarpusTrends } from '@/mocks/trends-podocarpus'
import Cards from '../components/CardPark'

export default function Index() {
  const { width, height } = Dimensions.get('window')
  const _slideWidth = width * 0.70
  const _slideHeight = height * 0.54
  const _spacing = 18

  const [visibleParks, setVisibleParks] = useState(5); // Número inicial de parques visibles

  const loadMoreParks = () => {
    setVisibleParks(prevCount => prevCount + 6); // Incrementa la cantidad de elementos visibles en 5
  };

  const scrollX = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (_slideWidth + _spacing)
  })

  return (
    <SafeAreaView edges={['top']} className="h-full flex items-center justify-center bg-neutral-200 ">
      <Text className="text-4xl font-bold mb-4 ">Rotate Slide</Text>
      <View className="w-2/3 h-48   mt-2 items-center ">
        {
          podocarpusTrends.slice(0, visibleParks).map((park, index) => (
            <FadeText
              key={`bg-text-${index}`}
              index={index}
              scrollX={scrollX}
            />
          ))
        }
      </View>
      <View className="h-[60%]">
        <Animated.FlatList
          data={podocarpusTrends.slice(0, visibleParks)}
          keyExtractor={(park) => park.name}
          renderItem={({ item: park, index }) => (
            <Cards key={`park-name-${index}`} park={park} scrollX={scrollX} index={index} width={_slideWidth} height={_slideHeight} />
          )
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={_slideWidth + _spacing}
          decelerationRate={"fast"}
          contentContainerStyle={{
            paddingHorizontal: (width - _slideWidth) / 2,
            gap: _spacing,
            alignItems: 'center'
          }}

          onScroll={onScroll}
          scrollEventThrottle={100 / 60}

          onEndReached={loadMoreParks}
          onEndReachedThreshold={0.5}
        />
      </View>
    </SafeAreaView>
  )
}

