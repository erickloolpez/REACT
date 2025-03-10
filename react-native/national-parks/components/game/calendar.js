import { View, Text } from 'react-native'
import React from 'react'

const GameCalendar = () => {
  return (
    <View className="w-full h-[10%] flex-row justify-evenly items-center">
        <View className="w-16 h-10 bg-[#b05936] justify-center items-center rounded-full">
            <Text className="text-white font-bold">Hoy</Text>
        </View>
        <View className="w-16 h-10 bg-[#b05936] justify-center items-center rounded-full">
            <Text className="text-white font-bold">Semana</Text>
        </View>
        <View className="w-16 h-10 bg-[#b05936] justify-center items-center rounded-full">
            <Text className="text-white font-bold">Mes</Text>
        </View>
        <View className="w-16 h-10 bg-[#b05936] justify-center items-center rounded-full">
            <Text className="text-white font-bold">Año</Text>
        </View>
    </View>
  )
}

export default GameCalendar