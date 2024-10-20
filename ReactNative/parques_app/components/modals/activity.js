import { View, Text, Image } from 'react-native'
import { icons } from '../../constants'

const Activity = ({image}) => {
  return (
    <View className="w-8 h-8 bg-white border-2 border-green-800 items-center justify-center rounded-sm overflow-hidden">
        <Image source={image} resizeMode="cover" className="w-[92%] h-[92%]" />
    </View>
  )
}

export default Activity