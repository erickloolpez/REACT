import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { ArrowLeft01Icon, Navigation03Icon } from 'hugeicons-react-native'
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps';

import { parks } from '../../constants';
import { allTrends } from '../../constants';

const InfoAttractive = () => {
    const { trendName, modalPark } = useLocalSearchParams()

    const trend = allTrends.find((trend) => trend.name === trendName)
    const [origin] = useState({
        latitude: trend.latitude,
        longitude : trend.longitude
    });

    const [readMore, setReadMore] = useState(false)
    const [text, setText] = useState(trend.desc.slice(0, 207))
    
    return (
        <ScrollView contentContainerStyle={{ backgroundColor: "#FBEECC" }} showsVerticalScrollIndicator={false}>
            <View className="w-full h-[30vh] bg-pink-400 relative">
                <MapView
                    className="w-full h-full"
                    initialRegion={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        latitudeDelta: 0.4,
                        longitudeDelta: 0.1,
                    }}
                >
                    <Marker coordinate={origin} title={trend.park} />
                </MapView>
                <View className="absolute bottom-[-42px] w-32 h-32 bg-red-400 rounded-full left-32 overflow-hidden border-2 border-white">
                    <Image source={trend.image} className="w-full h-full" resizeMode="cover" />
                </View>
            </View>

            <View className="w-full mt-12 px-2 ">
                <View>
                    <Text className="text-xl font-bold text-terciary">{trend.name}</Text>
                </View>
                <View className="w-full mt-4">
                    <Text className="text-green-800">
                        {text}
                        {!readMore && '...'}
                        <Text className="text-[#CF613C]" onPress={() => {
                            if (!readMore) {
                                setText(trend.desc)
                                setReadMore(true)
                            } else {
                                setText(trend.desc.slice(0, 240))
                                setReadMore(false)
                            }
                        }}>
                            {readMore ? ' Mostrar menos' : ' Mostrar mas'}
                        </Text>
                    </Text>
                </View>
            </View>

            <View className="w-full flex-row mt-4 px-2">
                <View className="w-1/2 h-44 ">
                    <Image source={parks[0].image} resizeMode="cover" className="w-[95%] h-full rounded-xl" />
                </View>
                <View className="w-1/2 h-44">
                    <View className="w-full h-1/2 ">
                        <Image source={parks[2].image} resizeMode="cover" className="w-full h-[95%] rounded-xl" />
                    </View>
                    <View className="w-full h-1/2 flex-row">
                        <View className="w-1/2 h-full ">
                            <Image source={parks[1].image} resizeMode="cover" className="w-[94%] h-full rounded-xl" />
                        </View>
                        <View className="w-1/2 h-full ">
                            <Image source={parks[4].image} resizeMode="cover" className="w-[94%] h-full self-end rounded-xl" />
                        </View>

                    </View>
                </View>
            </View>

            <View className="flex-row w-full mt-14 mb-20 justify-between">
                <TouchableOpacity
                    className="w-32 h-16 flex-row items-center justify-center rounded-tr-full rounded-br-full bg-green-800"
                    onPress={() => router.back()}
                >
                    <ArrowLeft01Icon
                        size={48}
                        color={"#ffffff"}
                        variant={"stroke"}
                    />
                    <Text className="text-white ml-1">Volver</Text>
                </TouchableOpacity>
                {
                    modalPark !== 'true' &&
                    <TouchableOpacity
                        className="w-32 h-16 flex-row items-center justify-center rounded-tl-full rounded-bl-full bg-green-800"
                        onPress={() => router.push(`/modals/${trend.park}`)}
                    >
                        <Navigation03Icon
                            size={34}
                            color={"#ffffff"}
                            variant={"stroke"}
                        />
                        <Text className="text-white ml-1">Ver parque</Text>
                    </TouchableOpacity>
                }

            </View>
        </ScrollView >
    )
}

export default InfoAttractive 