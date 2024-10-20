import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '../../constants'
import Activity from './activity'

const Navbar = ({ activities }) => {
    return (
        <View className="w-full h-[24vh]  flex-row border-b-2 border-green-800">
            <View className="w-1/2 h-full border-r-2 border-green-800">
                <View className="h-[20%] justify-center">
                    <Text className="ml-2 text-xl font-bold text-[#CF613C]">Horarios:</Text>
                </View>
                <View className="w-full h-[80%] flex-row justify-around items-center ">
                    <View className="gap-1">
                        <Text className="text-[#17301A] font-bold">Lunes</Text>
                        <Text className="text-[#17301A] font-bold">Martes</Text>
                        <Text className="text-[#17301A] font-bold">Miercoles</Text>
                        <Text className="text-[#17301A] font-bold">Jueves</Text>
                        <Text className="text-[#17301A] font-bold">Viernes</Text>
                        <Text className="text-[#17301A] font-bold">Sabado</Text>
                        <Text className="text-[#17301A] font-bold">Domingo</Text>
                    </View>
                    <View className="gap-1">
                        <Text className="text-[#CF613C]">09:00 a 16:30</Text>
                        <Text className="text-[#CF613C]" >09:00 a 16:30</Text>
                        <Text className="text-[#CF613C]">09:00 a 16:30</Text>
                        <Text className="text-[#CF613C]">09:00 a 16:30</Text>
                        <Text className="text-[#CF613C]">09:00 a 16:30</Text>
                        <Text className="text-[#CF613C]">09:00 a 16:30</Text>
                        <Text className="text-[#CF613C]">09:00 a 16:30</Text>
                    </View>
                </View>
            </View>

            <View className="w-1/2 h-full">
                <View className="w-full h-1/2  flex-row justify-center items-center border-b-2 border-green-800">
                    <Image source={icons.grados} resizeMode="contain" className="w-8 h-8 mr-4" />
                    <Text className="text-2xl text-[#17301A]">22°C°F</Text>
                </View>
                <View className="w-full h-1/2 items-center ">
                    <View className="w-[80%] h-full flex-wrap flex-row justify-around content-center ">
                        {
                            activities.map((icon, index) => (
                                <Activity key={index} image={icon} />
                            ))
                        }

                    </View>
                </View>

            </View>
        </View>
    )
}

export default Navbar