import { View, Image, Text } from 'react-native'

import { logos } from '../../constants'

const Header = ({ logo, image }) => {
    return (
        <View className="w-full h-[40vh] overflow-hidden rounded-t-xl  relative">
            <Image source={image} className="w-full h-full" resizeMode='cover' />
            <View className="w-1/2 h-[12vh] absolute bottom-5 left-2">
                <Image source={logo} className="w-full h-full" resizeMode="contain" />
            </View>
            <View className="absolute w-16 h-16 rounded-md  right-4 top-10">
                <Image source={image} className="w-full h-full border-white border-2 rounded-md" resizeMode="cover" />
            </View>
            <View className="absolute w-16 h-16 rounded-md  right-4 top-32">
                <Image source={image} className="w-full h-full border-white border-2 rounded-md" resizeMode="cover" />
            </View>
            <View className="absolute w-16 h-16 rounded-md  right-4 top-56">
                <Image source={image} className="w-full h-full border-white border-2 rounded-md" resizeMode="cover" />
            </View>
        </View>
    )
}

export default Header