import { router } from 'expo-router'
import { View, Text, Image, TouchableOpacity } from 'react-native'

const Attractives = ({ attractives, park }) => {
    return (
        <View className="w-full px-2">
            {
                attractives.map((attractive, index) => (
                    <TouchableOpacity key={index} onPress={() => {
                        router.push({
                            pathname: `/attractive/${attractive.desc}`,
                            params: {descPark:true, trend: JSON.stringify(attractive), park:JSON.stringify(park) }
                        })
                    }}>
                        <View className="flex-row w-full h-36 mt-4 bg-secondary rounded-xl">
                            <View className="w-[60%] justify-around p-3">
                                <View>
                                    <Text className="text-white font-bold">{attractive.name}</Text>
                                </View>
                                <View className="mt-2">
                                    <Text className="text-white" numberOfLines={4}>{attractive.desc}</Text>
                                </View>
                            </View>
                            <View className="w-[40%] h-full items-center justify-center ">
                                <Image source={attractive.image} resizeMode="cover" className="w-32 h-32  rounded-full border-2 border-white" />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default Attractives