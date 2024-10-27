import { View, Text, Image } from 'react-native'

import { images } from '../constants'

const EmptyState = ({ title, subtitle }) => {
    return (
        <View className="w-full h-full justify-center items-center px-4">
            <Image
                source={images.empty}
                className="w-[270px] h-[215px]"
                resizeMode="contain"
            />
            <Text className="text-xl text-center font-psemibold text-terciary mt-2">
                {title}
            </Text>
            <Text className="font-pmedium text-sm text-green-900">
                {subtitle}
            </Text>
        </View>
    )
}

export default EmptyState