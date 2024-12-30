import { View, Text, Image } from 'react-native'
import { images } from '../constants'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'


const Review = ({ width, height = '144px', text, name, rating, date, avatar }) => {
    let [dateClean, rest] = date.split('T')
    let stars = []
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <FontAwesomeIcon key={`Star-${i}`} icon={i <= rating ? faStarSolid : faStar} color={i <= rating ? "#eab308" : "black"} size={25} />
        )
    }


    return (
        <View className="bg-white mt-4  flex-row items-center justify-around  rounded-xl shadow-sm mb-4" style={{ width: width, height: height }}>
            <View className="w-[20%] h-full items-center justify-center">
                <Image source={{uri:avatar}} resizeMode="cover" className="w-16 h-16 rounded-full" />
            </View>
            <View className="w-[75%] h-full justify-evenly">
                <View className="flex-row justify-between">
                    <View>
                        <Text className="font-bold">{name}</Text>
                        <Text className="text-gray-400">{dateClean}</Text>
                    </View>
                    <View className=" flex-row items-center mr-4">
                        {stars}
                    </View>
                </View>
                <Text numberOfLines={4}>{text}</Text>
            </View>

        </View>
    )
}

export default Review