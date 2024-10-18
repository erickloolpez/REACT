import { View, Image, Text } from 'react-native'
import React from 'react'

const FollowingIcon = ({ follower, index }) => {
    if (index !== 3) {
        return (
            <View className='w-12 h-12 rounded-full overflow-hidden absolute' style={{marginLeft: follower.margin,zIndex: index == 2 ? 10 : 0}}>
                <Image source={follower.icon} className='w-full h-full' resizeMode="cover" />
            </View>
        )

    } else {
        return (
            <View className='w-12 h-12 bg-rose-600 rounded-full overflow-hidden justify-center items-end absolute px-2' style={{marginLeft:follower.margin }}>
                <Text>+4</Text>
            </View>
        )
    }
}

export default FollowingIcon