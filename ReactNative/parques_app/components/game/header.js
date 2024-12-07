import { View, Text } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGem, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { useGlobalContext } from '../../context/GlobalProvider'

const GameHeader = () => {
    const {score} = useGlobalContext()
    return (
        <View className="w-full h-[10%] mt-5 items-center justify-between px-3 flex-row bg-green-900 border-t-2 border-[#fbeecc] border-b-2 ">
            <View className="flex-row">
                <Text className="text-3xl font-extrabold text-primary">Juega y Gana</Text>
            </View>
            <View className="flex-row bg-primary items-center justify-around  rounded-full p-2 mr-1">
                <FontAwesomeIcon icon={faGem} color='#14532d' size={28} />
                <Text className="ml-2">{score}</Text>
            </View>
        </View>
    )
}

export default GameHeader