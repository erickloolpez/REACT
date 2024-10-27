import { TicTacToeIcon } from 'hugeicons-react-native'
import { View, Image, Text } from 'react-native'

const Activities = ({ place }) => {
    return (
        <View>
            <View className="flex-row mb-4 items-center ml-1">
                <TicTacToeIcon
                    size={34}
                    color={"#cf613c"}
                    variant={"stroke"}
                />
                <Text className="text-terciary text-xl left-2 font-bold">Actividades</Text>
            </View>
            <View className="w-full flex-wrap flex-row  content-around gap-2 justify-around ">
                {
                    place.icons.map((activity, index) => (
                        <View key={index} className="bg-green-950 grow basis-20 items-center justify-around rounded-xl">
                            <Text className="text-white mt-2">{activity.name}</Text>
                            <Image source={activity.image} resizeMode="contain" className=" w-12 h-16" />
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export default Activities