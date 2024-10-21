import { View, Text, Image } from 'react-native'
import React from 'react'

import { trends } from '../../constants'

const Trends = ({name, desc}) => {
    return (
        <View className="w-full h-[64vh] mt-4">
            <View className="w-full h-[5%] items-end ">
                <Text className="text-xl text-[#CF613C] font-bold">Atractivos</Text>
            </View>
            <View className="w-full h-[95%] flex-row">
                <View className="w-1/2 h-full ">
                    <Text className="font-bold text-[#CF613C] mb-4">{name}</Text>
                    <Text className="text-green-800">{desc}</Text>
                </View>
                <View className="w-1/2 h-full ">
                    <Image source={trends.llanganantes} resizeMode="contain" className="w-full h-full" />
                </View>
            </View>
        </View>
    )
}

export default Trends