import { View, Text, Image } from 'react-native'
import React from 'react'

const ActivityIcon = ({ name, image }) => {
    return (
        <View className=" grow basis-20 p-1  border-2 bg-secondary rounded-md border-primary">
            <View className="w-full h-8 items-center">
                <Image source={image} className="w-7 h-full" resizeMode="contain" />
            </View>
            <View className="w-full justify-start items-center">
                <Text numberOfLines={1} className="text-white">{name}</Text>
            </View>
        </View>
    )
}

export default ActivityIcon