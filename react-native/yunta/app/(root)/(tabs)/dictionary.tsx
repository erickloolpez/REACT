import Alphabet from '@/components/(dictionary)/Alphabet';
import Day from '@/components/(dictionary)/Day';
import React from 'react';
import { Dimensions, ImageBackground, View } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

const weekDays = [
  { name: 'Sunday', relation: 'Es una vaquita en el parque', stories: [{ title: 'History 1' }, { title: 'History 2' }, { title: 'History 3' }] },
  { name: 'Monday', relation: 'Es un perro en la playa', stories: [{ title: 'History 1' }, { title: 'History 2' }, { title: 'History 3' }] },
  { name: 'Tuesday', relation: 'Es un gato en la montaña', stories: [{ title: 'History 1' }, { title: 'History 2' }, { title: 'History 3' }] },
  { name: 'Wednesday', relation: 'Es un pez en el río', stories: [{ title: 'History 1' }, { title: 'History 2' }, { title: 'History 3' }] },
  { name: 'Thursday', relation: 'Es un pájaro en el cielo', stories: [{ title: 'History 1' }, { title: 'History 2' }, { title: 'History 3' }] },
  { name: 'Friday', relation: 'Es un conejo en el bosque', stories: [{ title: 'History 1' }, { title: 'History 2' }, { title: 'History 3' }] },
  { name: 'Saturday', relation: 'Es un elefante en la selva', stories: [{ title: 'History 1' }, { title: 'History 2' }, { title: 'History 3' }] },
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
          translateX: interpolate(scrollOfset.value, [-_imageHeight, 0, _imageHeight], [_imageHeight / 2, 0, -_imageHeight * .75], 'clamp')
        },
        {
          scale: interpolate(scrollOfset.value, [-_imageHeight, 0, _imageHeight], [2, 1, 1], 'clamp')
        }
      ],

    }
  })
  return (
    <View className="flex-1">
      <ImageBackground
        source={require('@/assets/images/bgDictionary.webp')}
        className="rounded-lg"
        resizeMode="cover"
      >
        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
          <Animated.Image
            source={require('@/assets/images/banner_dictionary.webp')}
            style={[{ width: 400, height: _imageHeight, objectFit: "contain" }, imageAnimatedStyle]}
          />
          <View
            className="flex-1 flex-row"
            style={{
              padding: _spacing,
              gap: _spacing,
            }}
          >
            <Alphabet />
            <View className="flex-1 gap-4" >
              {weekDays.map((day, index) => (
                <Day
                  weekLength={weekDays.length}
                  lastOne={index}
                  day={day}
                  _color={_color}
                  _borderRadius={_borderRadius}
                  _spacing={_spacing}
                  _damping={_damping}
                  key={`day-${day.name}`}
                />
              ))}

            </View>
          </View>
        </Animated.ScrollView>
      </ImageBackground>

    </View>
  )
}

export default Dictionary