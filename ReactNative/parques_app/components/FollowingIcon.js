import { View, Image, Text } from 'react-native'
import React from 'react'

const FollowingIcon = ({ icon }) => {
    return (
        // <View className='w-7 h-7 border-2 overflow-hidden absolute' style={{ marginLeft:index === 0? 0 : margin, zIndex: index == 2 ? 10 : 0 }}>
        <View className="w-7 h-7 grow border-2 border-primary">
            <Image source={icon} className='w-full h-full' resizeMode="contain" />
        </View>
    )
}

export default FollowingIcon