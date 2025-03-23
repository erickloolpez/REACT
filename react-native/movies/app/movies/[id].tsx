import { useLocalSearchParams } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'
import { images } from '@/constants/images'

const Details = () => {
  const { id } = useLocalSearchParams()
  return (
    <View className="flex-1 justify-center items-center bg-blue-400">
      <Image source={images.michi} />
      <Text className="text-6xl">{id}</Text>
    </View>
  )
}

export default Details

const styles = StyleSheet.create({})