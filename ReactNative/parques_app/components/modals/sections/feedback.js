import { View, Text, Image } from 'react-native'
import Review from '../../Comment'

const Feedback = () => {
    return (
        <View className="w-full min-h-[50vh] items-center mt-4">
            <Review height={144} />
        </View>
    )
}

export default Feedback