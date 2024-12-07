import { View, Text, Image } from 'react-native'
import React from 'react'
import { isotipos } from '../../constants'
import { faClockRotateLeft, faCloud, faLocationDot, faStar, faTree } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const ButtonSheet = ({ park, width }) => {
    return (
        <View style={{ width: width }} className="h-48  overflow-hidden mb-3 ml-1 ">
            <View className="w-full h-[20%] items-center justify-center rounded-t-lg bg-[#1f4037]">
                <Text className="text-lg text-white">Parque Nacional: {park.name}</Text>
            </View>
            <View className="w-full h-[90%] bg-yellow-900 flex-row ">
                <View className="w-1/2 h-full bg-[#99f2c8] justify-around">
                    <View>
                        <Text>Horario: 8a.m - 16p.m. </Text>
                    </View>
                    <View className="w-full h-20 flex-row flex-wrap gap-1 content-center">
                        {
                            park.icons.map((icon) => (
                                <View key={`buttonSheet-${icon.name}`} className=" w-8 h-8 grow bg-green-900 rounded-md">
                                    <Image source={icon.image} resizeMode="contain" className="w-full h-full" />
                                </View>
                            ))
                        }

                    </View>
                    <View className=" w-full h-10  flex-row items-center mb-2 ">
                        <View className="w-32 flex-row items-end justify-around">
                            <FontAwesomeIcon icon={faStar} color='#1f4037' size={22} />
                            <FontAwesomeIcon icon={faStar} color='#1f4037' size={22} />
                            <FontAwesomeIcon icon={faStar} color='#1f4037' size={22} />
                            <FontAwesomeIcon icon={faStar} color='#1f4037' size={22} />
                            <FontAwesomeIcon icon={faStar} color='#1f4037' size={22} />
                        </View>
                    </View>
                </View>
                <View className="w-1/2 h-full relative overflow-hidden">
                    <Image source={park.image} resizeMode="cover" className="w-full h-full" />
                    <View className="w-1/2 h-44 rotate-[8deg]  bg-[#99f2c8] absolute left-[-70px] bottom-4" />
                </View>
            </View>
        </View>
    )
}

export default ButtonSheet