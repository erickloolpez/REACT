import { View, Text, Dimensions } from 'react-native'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useMemo, useState } from 'react'
import { parks } from '../../constants'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

const Card = ({ _slideWidth, _slideHeight, park, }) => {
    return (
        <View className="bg-white items-center justify-center" style={{ width: _slideWidth, height: _slideHeight }}>
            <Text>{park.name}</Text>
        </View>
    )
}

const MapCards = ({ mapView }) => {


    const loadMoreParks = () => {
        setVisibleParks(prevCount => prevCount + 6); // Incrementa la cantidad de elementos visibles en 5
    };

    const snapPoints = useMemo(()=> ['25%','50%','75%'])

    return (
        <View className="w-full h-[20vh] bg-blue-200 absolute bottom-0 z-10">
            <BottomSheet index={1} snapPoints={snapPoints}>
                <BottomSheetView>
                    <Text>Awesome</Text>
                </BottomSheetView>
            </BottomSheet>
        </View>
    )
}

export default MapCards