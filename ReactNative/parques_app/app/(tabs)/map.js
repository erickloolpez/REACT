import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker, Polygon, Callout } from 'react-native-maps';
import { router } from 'expo-router'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ArrowRight01Icon, FilterIcon } from 'hugeicons-react-native';

import { useGlobalContext } from '../../context/GlobalProvider';
import { parks } from '../../constants/dummy';
import FilterOptions from '../../components/map/filterOptions';
import SearchInput from '../../components/map/searchInput';

const Map = () => {
    const { userLocation } = useGlobalContext();
    const [origin] = useState({
        latitude: '-0.209028110783209',
        longitude: '-78.49107901848447'
    });

    const [selectedIndex, setSelectedIndex] = useState(null)

    const height = useSharedValue(0)
    const yValue = useSharedValue(60)
    const opacitiy = useSharedValue(0)

    const menuStylez = useAnimatedStyle(() => {
        return {
            height: height.value,
            transform: [{ translateY: yValue.value }],
            opacity: opacitiy.value,
        }
    })

    return (
        <SafeAreaView className="h-full" edges={['top']}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View className="flex-1 relative ">
                    <MapView
                        className="w-full h-full"
                        initialRegion={{
                            latitude: origin.latitude,
                            longitude: origin.longitude,
                            latitudeDelta: userLocation ? 5 : 0.4,
                            longitudeDelta: userLocation ? 0.4 : 0.1,
                        }}
                    >
                        {parks.map((park, index) => (
                            <React.Fragment key={index}>
                                <Polygon coordinates={park.polygon} fillColor={'rgba(100,100,200,0.3)'} strokeWidth={1} />
                                <Marker coordinate={park.location} title={park.name} >
                                    <Callout>
                                        <View className="w-36 h-36 items-center justify-around ">
                                            <View>
                                                <Text>{park.name}</Text>
                                            </View>
                                            <View className="w-full h-1/2">
                                                <Image source={park.image} resizMode="contain" className="w-full h-full" />
                                            </View>
                                            <TouchableOpacity
                                                className=" w-24 h-8 bg-green-800 rounded-full flex-row items-center justify-around "
                                                onPress={() => router.push(`/modals/${park.name}`)}
                                            >
                                                <Text className="text-white">Ver mas</Text>
                                                <ArrowRight01Icon
                                                    size={32}
                                                    color={"#ffffff"}
                                                    variant={"stroke"}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </Callout>
                                </Marker>
                            </React.Fragment>
                        ))}
                        {userLocation && <Marker coordinate={userLocation} title={'Tú'} />}
                    </MapView>
                    <TouchableOpacity
                        className=" w-14 h-14 absolute top-20 left-3 bg-white rounded-full items-center justify-center"
                        onPress={() => {
                            if (height.value === 0) {
                                height.value = withTiming(350, { duration: 300 })
                                yValue.value = withTiming(45, { duration: 300 })
                                opacitiy.value = withTiming(1, { duration: 300 })
                            } else {
                                height.value = withTiming(0, { duration: 300 })
                                yValue.value = withTiming(20, { duration: 300 })
                                opacitiy.value = withTiming(0, { duration: 260 })
                                setSelectedIndex(null)
                            }
                        }}
                    >
                        <FilterIcon
                            size={32}
                            color={"#17301A"}
                            variant={"stroke"}
                        />
                    </TouchableOpacity>
                    <FilterOptions animation={menuStylez} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
                    <SearchInput />
                </View>

            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default Map