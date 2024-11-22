import { View, Text } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGem, faTrophy } from '@fortawesome/free-solid-svg-icons'

const GameHeader = () => {
    return (
        <View className="w-full h-[10%] mt-5 items-center justify-between flex-row bg-green-900 ">
            <View className="flex-row">
                <Text className="text-3xl font-extrabold text-primary">Premios y Campeones</Text>
            </View>
            <View className="flex-row bg-primary items-center justify-around  rounded-full p-2 mr-1">
                <FontAwesomeIcon icon={faGem} color='#14532d' size={28} />
                <Text className="ml-2">120</Text>
            </View>
        </View>
    )
}

export default GameHeader