import Day from '@/components/(dictionary)/Day';
import React from 'react';
import { Dimensions, ImageBackground, View } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const _spacing = 10;
const _color = "#ececec";
const _borderRadius = 8;
const _damping = 14;


const Dictionary = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOfset = useScrollViewOffset(scrollRef);
  const _imageHeight = 300
  const _screenHeight = Dimensions.get('screen').height;

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(scrollOfset.value, [-_imageHeight, 0, _imageHeight], [-_imageHeight / 2, 0, _imageHeight * .75], 'clamp')
        },
        {
          scale: interpolate(scrollOfset.value, [-_imageHeight, 0, _imageHeight], [2, 1, 1], 'clamp')
        }
      ]


    }
  })
  return (
    <View className="flex-1">
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.Image source={require('@/assets/images/partial-react-logo.png')} style={[{ height: _imageHeight, objectFit: "cover" }, imageAnimatedStyle]} />
        <ImageBackground source={require('@/assets/images/bgDictionary.webp')} className="flex-1" resizeMode="cover">
          <View
            className="flex-1"
            style={{
              height: _screenHeight,
              padding: _spacing,
              gap: _spacing,
            }}
          >
            {weekDays.map((day) => (
              <Day
                day={day}
                _color={_color}
                _borderRadius={_borderRadius}
                _spacing={_spacing}
                _damping={_damping}
                key={`day-${day}`}
              />
            ))}
          </View>

        </ImageBackground>
      </Animated.ScrollView>

    </View>
  )
}

export default Dictionary