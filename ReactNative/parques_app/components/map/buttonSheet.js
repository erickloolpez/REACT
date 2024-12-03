import { View, Text, Image } from 'react-native'
import React from 'react'
import { isotipos } from '../../constants'
import { faClockRotateLeft, faCloud, faLocationDot, faStar, faTree } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const ButtonSheet = ({name, isotipo }) => {
    return (
        <View className="w-96 h-48 rounded-xl overflow-hidden mb-3 ml-1  ">
            <View className=" w-full h-[70%] rounded-t-lg bg-[#327042]">
                <View className="w-full h-[70%] flex-row ">
                    <View className="w-[20%] h-full items-center justify-center">
                        <View className="w-14 h-14  bg-white rounded-lg">
                            <Image source={isotipo} resizeMode="cover" className="w-full h-full" />
                        </View>
                    </View>
                    <View className="w-[60%] h-full px-2 justify-center">
                        <Text className="text-xl text-white">Parque Nacional: {name}</Text>
                    </View>
                </View>
                <View className="w-full h-[30%] p-1 flex-row justify-around">
                    <View className="w-24  flex-row items-center justify-center rounded-lg bg-white h-full">
                        <FontAwesomeIcon icon={faLocationDot} color='#327042' size={22} />
                        <Text className="ml-2">Sierra</Text>
                    </View>
                    <View className="w-24  flex-row items-center justify-center bg-white h-full rounded-lg">
                        <FontAwesomeIcon icon={faCloud} color='#327042' size={22} />
                        <Text className="ml-2">Nublado</Text>
                    </View>
                    <View className="w-24  flex-row items-center justify-center bg-white h-full rounded-lg">
                        <FontAwesomeIcon icon={faTree} color='#327042' size={22} />
                        <Text className="ml-2">22km</Text>
                    </View>
                </View>
            </View>
            <View className=" w-full h-[30%] bg-terciary p-3 flex-row justify-between rounded-b-lg">
                <View className="flex-row items-center">
                    <FontAwesomeIcon icon={faClockRotateLeft} color='white' size={16} />
                    <Text className="ml-1 text-white">Ultima reseña hace 1 dia </Text>
                </View>

                <View className="w-32 h-full flex-row items-center justify-center ">
                    <FontAwesomeIcon icon={faStar} color='white' size={22} />
                    <FontAwesomeIcon icon={faStar} color='white' size={22} />
                    <FontAwesomeIcon icon={faStar} color='white' size={22} />
                    <FontAwesomeIcon icon={faStar} color='white' size={22} />
                    <FontAwesomeIcon icon={faStar} color='white' size={22} />
                </View>
            </View>
        </View>
    )
}

export default ButtonSheet