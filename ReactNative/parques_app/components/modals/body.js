import { View, Text } from 'react-native'
import React from 'react'

const Body = ({children}) => {
  return (
    <View className="w-[98%]  rounded-xl mt-[-14px] bg-primary  overflow-hidden">
        {children}
    </View>
  )
}

export default Body