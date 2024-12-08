import { View, Text, Image } from 'react-native'
import { images } from '../constants'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Review = ({width, height = '144px', text, name}) => {
    return (
        <View className="bg-white mt-4  flex-row items-center justify-around  rounded-xl shadow-sm mb-4" style={{width: width, height: height}}>
            <View className="w-[20%] h-full items-center justify-center">
                <Image source={images.avatar} resizeMode="cover" className="w-16 h-16 rounded-full" />
            </View>
            <View className="w-[75%] h-full justify-evenly">
                <View className="flex-row justify-between">
                    <View>
                        <Text className="font-bold">{name}</Text>
                        <Text className="text-gray-400">15 feb 2018</Text>
                    </View>
                    <View className=" flex-row items-center mr-4">
                        <FontAwesomeIcon icon={faStar} color='#eab308' size={20} />
                        <FontAwesomeIcon icon={faStar} color='#eab308' size={20} />
                        <FontAwesomeIcon icon={faStar} color='#eab308' size={20} />
                        <FontAwesomeIcon icon={faStar} color='#eab308' size={20} />
                        <FontAwesomeIcon icon={faStar} color='#eab308' size={20} />
                    </View>
                </View>
                <Text numberOfLines={4}>{text}</Text>
            </View>

        </View>
    )
}

export default Review