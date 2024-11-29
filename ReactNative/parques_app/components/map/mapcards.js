import { View, Text, Dimensions } from 'react-native'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useState } from 'react'
import { parks } from '../../constants'

const Card = ({ _slideWidth, _slideHeight, park, }) => {
    return (
        <View className="bg-white items-center justify-center" style={{ width: _slideWidth, height: _slideHeight }}>
            <Text>{park.name}</Text>
        </View>
    )
}

const MapCards = ({ mapView }) => {
    const { width } = Dimensions.get('window')
    const _slideWidth = width * 0.4
    const _slideHeight = _slideWidth * 0.9
    const _spacing = 18

    const [visibleParks, setVisibleParks] = useState(5); // Número inicial de parques visibles

    const loadMoreParks = () => {
        setVisibleParks(prevCount => prevCount + 6); // Incrementa la cantidad de elementos visibles en 5
    };

    return (
        <View className="w-full h-[14vh] bg-blue-200 absolute bottom-4 z-10">
            <Animated.FlatList
                data={parks.slice(0, visibleParks)}
                keyExtractor={(park) => park.name}
                renderItem={({ item: park, index }) => (
                    <Card _slideHeight={_slideHeight} _slideWidth={_slideWidth} park={park} />
                )
                }
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={_slideWidth + _spacing}
                decelerationRate={"fast"}
                contentContainerStyle={{
                    gap: _spacing,
                    paddingHorizontal: (width - _slideWidth) / 2,
                    paddingVertical: 20,
                    alignItems: 'center'
                }}

                scrollEventThrottle={16}

                onEndReached={loadMoreParks}
            />

        </View>
    )
}

export default MapCards