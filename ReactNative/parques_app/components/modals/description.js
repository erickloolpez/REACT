import { View, Text } from 'react-native'

const Description = ({ desc }) => {
    return (
        <View className="w-full h-[18vh] bg-blue-400 justify-around">
            <View className="w-full">
                <Text className="text-xl font-bold text-[#CF613C]">Descripcion:</Text>
            </View>
            <View>
                <Text className="text-[#17301A]">
                    {desc}
                </Text>
            </View>
        </View>
    )
}

export default Description