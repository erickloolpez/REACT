import { View, Image, Text, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps';
import { StarIcon } from 'hugeicons-react-native'

import { icons, images, parks } from '../../constants'
import Cards from '../../components/Cards'
import { allTrends } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider';

const Search = () => {
  const { userLocation } = useGlobalContext();

  const { width } = Dimensions.get('window')
  const _slideWidth = width * 0.45
  const _slideHeight = _slideWidth * 1.67
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
        blurRadius={5}
      />
    )

  }

  function BackDropText({ index, scrollX, park }) {
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
      <Animated.View className="absolute w-full h-[40%] bottom-1  "style={stylez}>
        <View className="w-full h-[65%]  flex-row">
          <View className="w-[60%] h-full ">
            <View className="w-[98%] h-full rounded-2xl overflow-hidden"  >
              <MapView
                className="w-full h-full"
                initialRegion={{
                  latitude: park.location.latitude,
                  longitude: park.location.longitude,
                  latitudeDelta: userLocation ? 5 : 0.4,
                  longitudeDelta: userLocation ? 0.7 : 0.1,
                }}
              >
                <Marker coordinate={park.location} title={park.name} />
                {userLocation && <Marker coordinate={userLocation} title={'Tú'} />}
                {userLocation && (
                  <Polyline coordinates={[userLocation, park.location]} strokeColor="#cf613c" strokeWidth={2} />
                )}
              </MapView>
            </View>
          </View>

          <View className="w-[40%] h-full  justify-between">
            <View className="w-full h-[48%] ">
              <Image source={park.trend[0].image} resizeMode="cover" className="w-full h-full rounded-xl" />
            </View>
            <View className="w-full h-[48%] ">
              <Image source={park.trend[1].image} resizeMode="cover" className="w-full h-full rounded-xl" />
            </View>

          </View>
        </View>
        <View className="w-full h-[35%]  justify-end">
          <View className="w-full h-[90%]  rounded-2xl items-center">

            <View className="w-[98%] h-full bg-primary  rounded-xl shadow-sm">
              <View className="w-full h-[40%] flex-row justify-between px-2 py-1">
                <View className="flex-row">
                  <View className="w-16 h-16 ">
                    <Image source={images.avatar} resizeMode="cover" className="w-full h-full rounded-full" />
                  </View>
                  <View className="w-72 h-16 justify-center ml-2">
                    <View className="flex-row">
                      <Text className="font-bold">Laura Martinez</Text>
                      <Text className="text-gray-400">15 feb 2018</Text>
                    </View>
                    <Text numberOfLines={3}>
                      Visitarlo es como entrar en otro mundo, con la oportunidad de ver especies que no se encuentran en ningún otro lugar. Es perfecto para quienes aman la naturaleza y buscan una experiencia inolvidable.
                    </Text>
                  </View>

                </View>
                <View className="flex-row items-center">
                  <StarIcon
                    size={24}
                    color={"black"}
                    variant={"stroke"}
                  />
                  <Text className="mr-2 ml-1">5</Text>
                </View>
              </View>

            </View>

          </View>
        </View>
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

        <View className="w-full h-[6%]">
          <View className="w-32 h-full absolute top-2 right-0  bg-secondary rounded-l-full">
            <View className="w-full h-full bg-secondary  rounded-l-full z-20 items-center">
              <Text style={{ fontFamily: "Pilowlava-Regular" }} className="text-4xl text-white">GEA</Text>
            </View>
            <View className="w-full h-full absolute  bottom-1 bg-white rounded-l-full border-2" />
          </View>
        </View>

        <View className="w-full h-[50%] absolute top-12 ">
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
      </View>


    </SafeAreaView>

  )
}

export default Search