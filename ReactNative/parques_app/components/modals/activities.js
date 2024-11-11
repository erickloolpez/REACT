import { Flag02Icon, TicTacToeIcon, Timer01Icon } from 'hugeicons-react-native'
import { View, Image, Text } from 'react-native'
import { images } from '../../constants'

const Activities = ({ place }) => {
    return (
        <View>
            <View className="flex-row mb-8 items-center ml-1">
                <TicTacToeIcon
                    size={34}
                    color={"#cf613c"}
                    variant={"stroke"}
                />
                <Text className="text-terciary text-xl left-2 font-bold">Actividades</Text>
            </View>
            <View className="w-full px-2 items-center ">
                {
                    place.icons.map((activity, index) => (
                        <View key={index} className="w-[90%] h-44 relative  border-l-2 border-secondary ">
                            <View className="absolute left-[-20px] top-0 w-10 h-10 overflow-hidden border-2 rounded-full bg-secondary">
                                <Image source={activity.image} resizeMode="contain" className="w-full h-full left-0 top-0" />
                            </View>

                            <View className="w-[90%] h-[90%] border-b-4 border-secondary self-end  ">
                                <View className="w-full h-full  flex-row ">
                                    <View className="w-1/2 h-full">
                                        <View className="w-full h-1/2 flex-row items-center rounded-lg">
                                            <View className="w-full h-[95%] bg-secondary rounded-lg flex-row items-center">
                                                <Text className="text-white ml-2">{activity.name}</Text>
                                            </View>
                                        </View>
                                        <View className="w-full h-1/2 flex-row items-center rounded-lg">
                                            <View className="w-full h-[95%] bg-terciary rounded-lg flex-row items-center">
                                                <Timer01Icon
                                                    size={20}
                                                    color={"#ffffff"}
                                                    variant={"stroke"}
                                                    className="ml-2"
                                                />
                                                <Text className="text-primary ml-1">1:30hr</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View className="w-1/2 h-full  ">
                                        <Image source={images.sendero} resizeMode="cover" className="w-[95%] h-full self-end rounded-xl" />
                                    </View>

                                </View>
                            </View>
                        </View>
                    ))
                }
            </View>
        </View >
    )
}

export default Activities