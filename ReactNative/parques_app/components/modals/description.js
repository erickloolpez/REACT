import { useState } from 'react'
import { View, Text } from 'react-native'

const Description = ({ desc }) => {
    const [text, setText] = useState(desc.slice(0,207))
    const [readMore, setReadMore] = useState(false)
    return (
        <View className="w-full">
            <View className="w-full justify-center mt-4 mb-3">
                <Text className="text-xl font-bold text-[#CF613C]">Descripcion:</Text>
            </View>
            <View className="w-full">
                <Text className="text-green-800">
                    {text}
                    {!readMore && '...'}
                    <Text className="text-[#CF613C]" onPress={() => {
                        if (!readMore) {
                            setText(desc)
                            setReadMore(true)
                        } else {
                            setText(desc.slice(0,240))
                            setReadMore(false)
                        }
                    }}>
                        {readMore ? ' Mostrar menos' : ' Mostrar mas'}
                    </Text>
                </Text>
            </View>
        </View>
    )
}

export default Description