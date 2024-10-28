import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { parks } from '../../constants'
import { ArrowLeft01Icon, Navigation03Icon } from 'hugeicons-react-native'

const InfoAttractive = () => {
    const { query } = useLocalSearchParams()

    const index = parks.findIndex((park) => park.trend.some((trend) => trend.desc === query));

    const trend = parks[index].trend.find((trend) => trend.desc === query)

    return (
        <SafeAreaView className="h-full bg-primary" edges={['top']}>
            <View className="flex-1 px-2 justify-center mb-10  ">
                <View className="w-full h-24 bg-green-900">
                    <Image source={parks[index].logo} resizeMode="contain" className="w-[60%] h-full" />
                </View>
                <View>
                    <View className="mt-4">
                        <Text className="mb-3 text-xl text-terciary font-bold">{trend.name}</Text>
                        <Text>{query}</Text>
                    </View>
                    <View className="w-full h-[30vh] mt-4  rounded-xl">
                        <Image source={trend.image} resizeMode="contain" className="w-full h-full" />
                    </View>
                </View>
                <View className="flex-row w-full mt-8 justify-between">
                    <TouchableOpacity
                        className="w-32 h-16 flex-row items-center justify-center rounded-full bg-green-800"
                        onPress={() => router.back()}
                    >
                        <ArrowLeft01Icon
                            size={34}
                            color={"#ffffff"}
                            variant={"stroke"}
                        />
                        <Text className="text-white ml-2">Volver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="w-32 h-16 flex-row items-center justify-evenly rounded-full bg-green-800"
                        onPress={() => router.push(`/modals/${parks[index].name}`)}
                    >
                        <Navigation03Icon
                            size={34}
                            color={"#ffffff"}
                            variant={"stroke"}
                        />
                        <Text className="text-white">Ver parque</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default InfoAttractive 