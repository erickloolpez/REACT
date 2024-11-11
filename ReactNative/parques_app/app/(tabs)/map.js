import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker, Polygon, Callout } from 'react-native-maps';
import { router } from 'expo-router'
import Animated, { FadeInRight, FadeOutRight, LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { useGlobalContext } from '../../context/GlobalProvider';
import { parks } from '../../constants/dummy';
import { Activity01Icon, ArrowRight01Icon } from 'hugeicons-react-native';
import { MotiView } from 'moti';
import { motifySvg } from 'moti/svg';

const Map = () => {
    const { userLocation } = useGlobalContext();
    const [origin] = useState({
        latitude: '-0.209028110783209',
        longitude: '-78.49107901848447'
    });


    const parksID = ['Machalilla', 'Llanganate', 'Cotopaxi', 'Yasuni', 'Yacuri', 'Cajas']
    const activeColor = "#fff"
    const inactiveColor = "#ggg"
    const activeBackgroundColor = "#111"
    const inactiveBackgroundColor = "#ddd"
    const [selectedIndex, setSelectedIndex] = useState(0)

    return (
        <SafeAreaView className="h-full" edges={['top']}>
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
                <View
                    className="absolute w-full h-[10vh] flex-row gap-2  items-center bg-white top-4 rounded-sm"
                >
                    {
                        parksID.map((park, index) => {
                            const isSelected = selectedIndex === index
                            return (
                                <MotiView
                                    layout={LinearTransition.springify().damping(80).stiffness(200)}
                                    animate={{
                                        backgroundColor: isSelected ? activeBackgroundColor : inactiveBackgroundColor,
                                        borderRadius:8,
                                        overflow:'hidden'
                                    }}
                                >
                                    <Pressable onPress={() => setSelectedIndex(index)} style={{
                                    }}
                                        className="flex-row items-center "
                                    >
                                        
                                        <Activity01Icon
                                            size={32}
                                            color={"white"}
                                            variant={"stroke"}
                                        />
                                        {
                                            isSelected &&
                                            <Animated.Text
                                                className=" justify-center p-2"
                                                entering={FadeInRight.springify().damping(80).stiffness(200)}
                                                exiting={FadeOutRight.springify().damping(80).stiffness(200)}
                                            >
                                                <Text style={{ color: isSelected ? activeColor : inactiveColor }}>{park}</Text>
                                            </Animated.Text>
                                        }
                                    </Pressable>

                                </MotiView>
                            )
                        })
                    }

                </View>
            </View>
        </SafeAreaView>
    )
}

export default Map