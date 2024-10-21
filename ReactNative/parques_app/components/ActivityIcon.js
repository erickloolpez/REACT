import { View, Text, Image } from 'react-native'
import React from 'react'

const ActivityIcon = ({ name, image }) => {
    return (
        <View className=" grow basis-20  border-2 bg-secondary border-primary">
            <View className="w-full h-8">
                <Image source={image} className="w-full h-full" resizeMode="contain" />
            </View>
            <View className="w-full justify-center items-center">
                <Text numberOfLines={1} className="text-white">{name}</Text>
            </View>
        </View>
    )
}

export default ActivityIcon