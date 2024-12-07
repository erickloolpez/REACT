import { View, Text, Image, TouchableOpacity, ScrollView, Touchable } from 'react-native'
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
    const [section, setSection] = useState('Ubicacion')

    const { userLocation } = useGlobalContext();
    const [origin] = useState({
        latitude: '-0.209028110783209',
        longitude: '-78.49107901848447'
    });

    const parsedTrend = JSON.parse(trend)

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
                    <TouchableOpacity onPress={() => setSection('Ubicacion')}>
                        <Text className={`text-lg text-white ${section === 'Ubicacion' ? 'font-bold' : ''}`}>Ubicacion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSection('Fotos')}>
                        <Text className={`text-lg text-white ${section === 'Fotos' ? 'font-bold' : ''}`}>Fotos</Text>
                    </TouchableOpacity>
                </View>

                <View className="w-full h-[50vh] items-center ">
                    {
                        section === 'Ubicacion' && (
                            <View className="w-96 h-96 rounded-full overflow-hidden mt-8">
                                <MapView
                                    className="w-full h-full"
                                    initialRegion={{
                                        latitude: -0.209028110783209,
                                        longitude: -78.49107901848447,
                                        latitudeDelta: 0.1,
                                        longitudeDelta: 15.0,
                                    }}
                                >
                                    <Marker coordinate={parsedTrend.location} title={parsedTrend.name} />
                                    {/* {userLocation && <Marker coordinate={userLocation} title={'Tú'} />} */}
                                </MapView>


                            </View>
                        )
                    }
                    {
                        section === 'Fotos' && (
                            <View className="w-full h-[90%] mt-4 justify-start ">
                                <View className="justify-center h-[10%] mb-4 ">
                                    <Text className="uppercase ml-3 text-lg text-white font-semibold">Lo que encontraras</Text>
                                </View>
                                <View className="w-full items-center justify-around flex-row gap-3 px-3 ">
                                    <View className="w-28 h-64 rounded-xl overflow-hidden ">
                                        <Image source={parsedTrend.image} resizeMode="cover" className="w-full h-full" />
                                    </View>
                                    <View className="w-28 h-64 rounded-xl overflow-hidden ">
                                        <Image source={parsedTrend.image} resizeMode="cover" className="w-full h-full" />
                                    </View>
                                    <View className="w-28 h-64 rounded-xl overflow-hidden ">
                                        <Image source={parsedTrend.image} resizeMode="cover" className="w-full h-full" />
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