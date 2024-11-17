import { View, Text, Image } from 'react-native'
import { images } from '../constants'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Review = ({width='90%', height = '144px'}) => {
    return (
        <View className="bg-white  flex-row items-center justify-around  rounded-xl shadow-sm mb-4" style={{width: width, height: height}}>
            <View className="w-[20%] h-full items-center justify-center">
                <Image source={images.avatar} resizeMode="cover" className="w-16 h-16 rounded-full" />
            </View>
            <View className="w-[75%] h-full justify-evenly">
                <View className="flex-row justify-between">
                    <View>
                        <Text className="font-bold">Laura Martinez</Text>
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
                <Text numberOfLines={4}>
                    Visitarlo es como entrar en otro mundo, con la oportunidad de ver especies que no se encuentran en ningún otro lugar. Es perfecto para quienes aman la naturaleza y buscan una experiencia inolvidable.
                </Text>
            </View>

        </View>
    )
}

export default Review