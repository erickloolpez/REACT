import { View, Text } from 'react-native'
import React from 'react'

const DayIcon = ({ date }) => {
    return (
        <View className="w-[14%] h-[70%] border-2  items-center justify-center rounded-full">
            <View className="w-1 h-1 bg-black-100 rounded-full"></View>
            <Text>{date.name}</Text>
            <Text>{date.day}</Text>
        </View>
    )
}

export default DayIcon