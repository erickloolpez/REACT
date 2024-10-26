import { router } from 'expo-router';
import { Text, View, Animated, Image } from 'react-native';
import images from '../constants/images';
import { useEffect, useRef } from 'react';


export default function App() {
  const animation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setTimeout(() => {
      startAnimation()
    }, 2000)
    setTimeout(() => {
      router.replace('/home')
    }, 2500)
  }, [])
  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }
  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <Animated.View className="w-28 h-48" style={{ transform: [{ scale: animation.interpolate({ inputRange: [0, 1], outputRange: [1, 20] }) }] }}>
        <Image source={images.isotipo} className="w-full h-full" />
      </Animated.View>
      {/* <Text className="text-3xl">Gea</Text>
      <Link href="/home" style={{color:'blue'}}>Go to home</Link> */}
    </View>
  );
}
