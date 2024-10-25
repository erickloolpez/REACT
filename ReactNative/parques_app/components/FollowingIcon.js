import { View, Image, Text } from 'react-native'
import React from 'react'

const FollowingIcon = ({ follower, index, places, margin }) => {
    if (!places) {
        if (index !== 3) {
            return (
                <View className='w-12 h-12 rounded-full  mb-2 overflow-hidden absolute' style={{ marginLeft: follower.margin, zIndex: index == 2 ? 10 : 0 }}>
                    <Image source={follower.icon} className='w-full h-full' resizeMode="cover" />
                </View>
            )

        } else {
            return (
                <View className='w-12 h-12 bg-rose-600  rounded-full overflow-hidden justify-center items-end absolute px-2' style={{ marginLeft: follower.margin }}>
                    <Text className ='text-white'>+4</Text>
                </View>
            )
        }

    } else {
        return (
            // <View className='w-7 h-7 border-2 overflow-hidden absolute' style={{ marginLeft:index === 0? 0 : margin, zIndex: index == 2 ? 10 : 0 }}>
            <View className="w-7 h-7 grow border-2 border-primary">
                <Image source={places} className='w-full h-full' resizeMode="contain" />
            </View>
        )
    }
}

export default FollowingIcon