import { View, Text } from 'react-native'
import React from 'react'

const Body = ({children}) => {
  return (
    <View className="w-full  rounded-xl    overflow-hidden">
        {children}
    </View>
  )
}

export default Body