import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'

const ActivityIcon = ({ name, image, parks, setParks, setSelectedActivity, selectedActivity }) => {
    const isActive = selectedActivity === name
    return (
        <TouchableOpacity
            activeOpacity={0.99}
            className={`${isActive ? 'bg-terciary' : 'bg-secondary'} grow basis-20 p-1  border-2  rounded-md border-primary`}
            onPress={() => {
                if (isActive) {
                    setParks(parks)
                    setSelectedActivity(null)
                } else {
                    const filteredParks = parks.filter((park) =>
                        park.icons.some((icon) => icon.name.toLowerCase() === name.toLowerCase())
                    );
                    setParks(filteredParks);
                    setSelectedActivity(name)
                }
            }}
        >
            <View className="w-full h-8 items-center">
                <Image source={image} className="w-7 h-full" resizeMode="contain" />
            </View>
            <View className="w-full justify-start items-center">
                <Text numberOfLines={1} className="text-white">{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ActivityIcon