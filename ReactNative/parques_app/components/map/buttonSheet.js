import { View, Text, Image } from 'react-native'
import React from 'react'

const ButtonSheet = ({ park, width }) => {
    return (
        <View style={{ width: width }} className="h-44 overflow-hidden mb-3 ml-1 ">
            <View className="w-full h-[20%] items-center justify-center rounded-t-lg bg-[#5A3F37]">
                <Text className="text-lg text-white">Parque Nacional: {park.name}</Text>
            </View>
            <View className="w-full h-[80%] flex-row ">
                <View className="w-1/2 h-full bg-[#2C7744] justify-center rounded-bl-lg">
                    <View className="w-full h-20 flex-row flex-wrap gap-1 content-center ">
                        {
                            park.icons.map((icon) => (
                                <View key={`buttonSheet-${icon.name}`} className=" w-8 h-8 grow bg-[#5A3F37] rounded-md">
                                    <Image source={icon.image} resizeMode="contain" className="w-full h-full" />
                                </View>
                            ))
                        }
                    </View>
                    <View className="w-full h-8 justify-center">
                        <Text className="text-white font-bold  ">Atractivos: {park.trend.length}</Text>
                    </View>
                </View>
                <View className="w-1/2 h-full relative overflow-hidden ">
                    <Image source={park.image} resizeMode="cover" className="w-full h-full" />
                    <View className="w-1/2 h-44 rotate-[8deg]  bg-[#2C7744] absolute left-[-70px] bottom-[-10px]" />
                </View>
            </View>
        </View>
    )
}

export default ButtonSheet