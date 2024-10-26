import { View, Text, Image } from 'react-native'

const Attractives = ({ attractives }) => {
    console.log(attractives)
    return (
        <View className="w-full">
            {
                attractives.map((attractive, index) => (
                    <View key={index} className="flex-row w-full h-28 mt-4 bg-secondary rounded-xl">
                        <View className="w-[60%] justify-around p-3">
                            <View>
                                <Text className="text-white font-bold">{attractive.name}</Text>
                            </View>
                            <View className="mt-2">
                                <Text className="text-white" numberOfLines={4}>{attractive.desc}</Text>
                            </View>
                        </View>
                        <View className="w-[40%] items-center justify-center">
                            <Image source={attractive.image} resizeMode="contain" className="w-full h-full" />
                        </View>
                    </View>
                ))
            }
        </View>
    )
}

export default Attractives