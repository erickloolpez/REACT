import { View, Image, Text } from 'react-native'

import { logos } from '../../constants'

const Header = ({logo, image}) => {
    return (
        <View className="w-[98%] h-[40vh] bg-green-300 overflow-hidden rounded-t-xl mt-1 relative">
            <Image source={image} className="w-full h-full" resizeMode='cover'/>
            <View className="w-1/2 h-[12vh] absolute bottom-5 left-2">
                <Image source={logo} className="w-full h-full" resizeMode="contain"/>
            </View>
        </View>
    )
}

export default Header