import { View, Text, Image, TouchableOpacity, ScrollView, Touchable, Pressable } from 'react-native'
import { useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps';

import { parks } from '../../constants';
import { faAngleLeft, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useGlobalContext } from '../../context/GlobalProvider';
import { LinearGradient } from 'expo-linear-gradient';

const InfoAttractive = () => {
    const { modalPark, trend, park } = useLocalSearchParams()
    const [section, setSection] = useState('Fotos')

    const { userLocation } = useGlobalContext();
    const [origin] = useState({
        latitude: '-0.209028110783209',
        longitude: '-78.49107901848447'
    });

    const parsedTrend = JSON.parse(trend)
    const parsedPark = JSON.parse(park)

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: "#FBEECC" }} showsVerticalScrollIndicator={false}>
            <LinearGradient className="w-full h-full" colors={['#283c86', '#45a247']}>
                <View className="w-[84%] h-[14vh] items-start justify-center px-2">
                    <Text className="text-3xl font-semibold uppercase text-white">{parsedTrend.name}</Text>
                </View>

                <View className="w-full h-[30vh]">
                    <Image source={parsedTrend.image} resizeMode="cover" className="w-full h-full" />
                </View>

                <View className="w-full h-[10vh] items-start justify-center ">
                    <View className="w-[40%] ml-3">
                        <View>
                            <Text className="text-white">{parsedTrend.name}</Text>
                        </View>
                        <View className="flex-row justify-between mt-2">
                            <View className="">
                                <Text className="font-bold text-white">12 km</Text>
                            </View>
                            <View className="">
                                <Text className="font-bold text-white">~2h10</Text>
                            </View>
                        </View>
                    </View>

                </View>

                <View className="w-full mb-10 items-center justify-center">
                    <View className="w-[90%]">
                        <Text className="text-white">{parsedTrend.desc}</Text>
                    </View>
                </View>

                <View className="w-full h-[10vh]  flex-row justify-around items-center border-t-2 border-b-2 border-white">
                    <TouchableOpacity onPress={() => setSection('Fotos')}>
                        <Text className={`text-lg text-white ${section === 'Fotos' ? 'font-bold' : ''}`}>Fotos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSection('Parque')}>
                        <Text className={`text-lg text-white ${section === 'Ubicacion' ? 'font-bold' : ''}`}>Parque</Text>
                    </TouchableOpacity>
                </View>

                <View className="w-full h-[50vh] items-center ">
                    {
                        section === 'Parque' && (
                            <View className="w-full h-[90%] flex-row mt-4 justify-around items-center ">
                                <View className="w-[45%] h-[75%] bg-green-400 overflow-hidden rounded-2xl">
                                    <Image source={parsedPark.image} resizeMode="cover" className="w-full h-full" />
                                </View>
                                <View
                                    className="w-1/2 h-[75%] items-center rounded-2xl bg-[#283c86] px-2"
                                    style={{
                                        justifyContent: modalPark === "true" ? 'space-around' : 'center',

                                    }}
                                >
                                    <View style={{marginBottom: modalPark === "true" ? 0 : 8}}>
                                        <Text className="text-white text-lg font-psemibold uppercase">{parsedPark.name}</Text>
                                    </View>
                                    <View>
                                        <Text numberOfLines={8} className="text-primary">
                                            {parsedPark.desc.slice(0, 200)}
                                        </Text>
                                    </View>
                                    {
                                        modalPark === "true" && (
                                            <Pressable
                                                className="w-32 h-10 items-center justify-center rounded-full bg-red-400"
                                                onPress={() => {
                                                    router.replace(`/modals/${parsedPark.name}`)
                                                }}

                                            >
                                                <Text className="text-white font-psemibold">Ver parque</Text>
                                            </Pressable>

                                        )
                                    }
                                </View>

                            </View>
                        )
                    }
                    {
                        section === 'Fotos' && (
                            <View className="w-full h-[90%] mt-4 justify-start ">
                                <View className="justify-center h-[10%] mb-4 ">
                                    <Text className="uppercase ml-3 text-lg text-white font-semibold">Lo que encontraras</Text>
                                </View>
                                <View className="w-full items-center justify-around flex-row gap-3 px-1">
                                    <View className="w-[128px] h-64 rounded-xl overflow-hidden ">
                                        <Image source={parsedTrend.collection[0]} resizeMode="cover" className="w-full h-full" />
                                    </View>
                                    <View className="w-[128px] h-64 rounded-xl overflow-hidden ">
                                        <Image source={parsedTrend.collection[1]} resizeMode="cover" className="w-full h-full" />
                                    </View>
                                    <View className="w-[128px] h-64 rounded-xl overflow-hidden ">
                                        <Image source={parsedTrend.collection[2]} resizeMode="cover" className="w-full h-full" />
                                    </View>
                                </View>
                            </View>
                        )
                    }
                </View>

                <View className="w-full h-[8vh]" />
            </LinearGradient >
        </ScrollView >

    )
}

export default InfoAttractive 