import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker, Polygon, Callout } from 'react-native-maps';
import { router } from 'expo-router'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

import { useGlobalContext } from '../../context/GlobalProvider';
import { parks } from '../../constants/dummy';
import FilterOptions from '../../components/map/filterOptions';
import SearchInput from '../../components/map/searchInput';
import { faArrowRight, faClockRotateLeft, faCloud, faFilter, faLocationDot, faStar, faTree } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import MapCards from '../../components/map/mapcards';
import { LinearGradient } from 'expo-linear-gradient';
import { isotipos } from '../../constants';

const Map = () => {
    const { userLocation } = useGlobalContext();
    const [origin] = useState({
        latitude: '-0.209028110783209',
        longitude: '-78.49107901848447'
    });

    const snapPoints = useMemo(() => ['5%','50%','75%'])

    const [selectedIndex, setSelectedIndex] = useState(null)

    const height = useSharedValue(0)
    const yValue = useSharedValue(60)
    const opacitiy = useSharedValue(0)
    let _mapView

    const menuStylez = useAnimatedStyle(() => {
        return {
            height: height.value,
            transform: [{ translateY: yValue.value }],
            opacity: opacitiy.value,
        }
    })

    return (
        <SafeAreaView className="h-full bg-secondary" edges={['top']}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View className="flex-1 relative ">
                    <MapView
                        ref={(mapView) => { _mapView = mapView; }}
                        className="w-full h-full"
                        initialRegion={{
                            latitude: origin.latitude,
                            longitude: origin.longitude,
                            latitudeDelta: userLocation ? 5 : 0.4,
                            longitudeDelta: userLocation ? 0.4 : 0.1,
                        }}
                    >
                        {parks.map((park, index) => (
                            <React.Fragment key={`park-map-${index}`}>
                                <Polygon coordinates={park.polygon} fillColor={'rgba(100,100,200,0.3)'} strokeWidth={1} />
                                <Marker
                                    image={park.icon ? park.icon : null}
                                    coordinate={park.location}
                                    title={park.name}
                                    onPress={() => {
                                        _mapView.animateToRegion({
                                            latitude: park.location.latitude,
                                            longitude: park.location.longitude,
                                        }, 1000)
                                    }} >
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
                        <FontAwesomeIcon icon={faFilter} color='black' size={32} />
                    </TouchableOpacity>
                    <FilterOptions animation={menuStylez} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
                    <SearchInput />
                    {/* <MapCards mapView={_mapView} /> */}
                    <BottomSheet
                     index={1} 
                      snapPoints={snapPoints}
                      backgroundStyle={{backgroundColor:'#fbeecc'}}
                    >
                        <BottomSheetView >
                            <View className="w-96 h-48 rounded-xl mt-2 overflow-hidden">
                                <View className=" w-full h-[70%] bg-blue-300">
                                    <View className="w-full h-[70%] flex-row ">
                                        <View className="w-[20%] h-full items-center justify-center">
                                            <View className="w-14 h-14  bg-white rounded-lg">
                                                <Image source={isotipos.llanganates} resizeMode="cover" className="w-full h-full" />
                                            </View>
                                        </View>
                                        <View className="w-[60%] h-full px-2 justify-center">
                                            <Text className="text-xl">Parque Nacional: Llanganates</Text>
                                        </View>
                                    </View>
                                    <View className="w-full h-[30%] p-1 flex-row justify-around">
                                        <View className="w-24  flex-row items-center justify-center rounded-lg bg-white h-full">
                                            <FontAwesomeIcon icon={faLocationDot} color='black' size={22} />
                                            <Text className="ml-2">Sierra</Text>
                                        </View>
                                        <View className="w-24  flex-row items-center justify-center bg-white h-full rounded-lg">
                                            <FontAwesomeIcon icon={faCloud} color='black' size={22} />
                                            <Text className="ml-2">Nublado</Text>
                                        </View>
                                        <View className="w-24  flex-row items-center justify-center bg-white h-full rounded-lg">
                                            <FontAwesomeIcon icon={faTree} color='black' size={22} />
                                            <Text className="ml-2">22km</Text>
                                        </View>
                                    </View>
                                </View>
                                <View className=" w-full h-[30%] bg-white p-3 flex-row justify-between">
                                    <View className="flex-row items-center">
                                        <FontAwesomeIcon icon={faClockRotateLeft} color='black' size={16} />
                                        <Text className="ml-1">Ultima reseña hace 1 dia </Text>
                                    </View>

                                    <View className="w-32 h-full bg-green-400 flex-row items-center justify-center ">
                                        <FontAwesomeIcon icon={faStar} color='yellow' size={22} />
                                        <FontAwesomeIcon icon={faStar} color='yellow' size={22} />
                                        <FontAwesomeIcon icon={faStar} color='yellow' size={22} />
                                        <FontAwesomeIcon icon={faStar} color='yellow' size={22} />
                                        <FontAwesomeIcon icon={faStar} color='yellow' size={22} />
                                    </View>
                                </View>
                            </View>
                        </BottomSheetView>
                    </BottomSheet>
                </View>

            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default Map