import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useMemo, useRef, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker } from 'react-native-maps';
import { router } from 'expo-router'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet'

import { useGlobalContext } from '../../context/GlobalProvider';
import { parks } from '../../constants/dummy';
import FilterOptions from '../../components/map/filterOptions';
import SearchInput from '../../components/map/searchInput';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ButtonSheet from '../../components/map/buttonSheet';

const Map = () => {
    const { userLocation } = useGlobalContext();
    const [parkSelected, setParkSelected] = useState(null)

    const [filteredParks, setFilteredParks] = useState(parks)

    const [isHorizontal, setIsHorizontal] = useState(true)
    const sheetRef = useRef(null)
    const handleSheetChange = useCallback((index) => {
        if (index === 1 || index === 2) {
            setIsHorizontal(index === 1);
        }
    }, [isHorizontal]);

    const snapPoints = useMemo(() => ['5%', '35%'])

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
                        style={{ width: '100%', height: '100%' }}
                        initialRegion={{
                            latitude: -0.209028110783209,
                            longitude: -78.49107901848447,
                            latitudeDelta: 5.0,
                            longitudeDelta: 5.0,

                        }}
                    >
                        {filteredParks.map((park, index) => (
                            <React.Fragment key={`park-map-${index}`}>
                                {/* <Polygon coordinates={park.polygon} fillColor={'rgba(100,100,200,0.3)'} strokeWidth={1} /> */}
                                <Marker
                                    image={park.isotipo ? park.isotipo : null}
                                    coordinate={park.location}
                                    title={park.name}
                                    onPress={() => {
                                        setParkSelected(park)

                                        _mapView.animateToRegion({
                                            latitude: park.location.latitude,
                                            longitude: park.location.longitude,
                                        }, 1000)

                                        sheetRef.current?.snapToIndex(1)
                                    }} >
                                </Marker>
                            </React.Fragment>
                        ))}
                        {/* {userLocation && <Marker coordinate={userLocation} title={'Tú'} />} */}
                    </MapView>

                    <TouchableOpacity
                        className=" w-12 h-12 absolute top-20 left-3 bg-green-900 rounded-full items-center justify-center"
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
                        <FontAwesomeIcon icon={faFilter} color='#fbeecc' size={22} />
                    </TouchableOpacity>

                    <FilterOptions animation={menuStylez} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} setFilteredParks={setFilteredParks} />

                    <SearchInput setFilteredParks={setFilteredParks} />

                    <BottomSheet
                        ref={sheetRef}
                        index={0}
                        snapPoints={snapPoints}
                        backgroundStyle={{ backgroundColor: '#fff' }}
                        enableContentPanningGesture={false}
                        enableOverDrag
                        onChange={handleSheetChange}
                        enableDynamicSizing={false}
                    >
                        <BottomSheetView style={{ alignItems: 'center', marginTop: 12 }}>
                            {parkSelected && (
                                <ButtonSheet
                                    park={parkSelected}
                                    width={350}
                                />
                            )}
                        </BottomSheetView>
                    </BottomSheet>
                </View>

            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default Map