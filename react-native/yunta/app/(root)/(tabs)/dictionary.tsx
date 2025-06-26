import Alphabet from '@/components/(dictionary)/Alphabet';
import Day from '@/components/(dictionary)/Day';
import ModalFeedBack from '@/components/(dictionary)/ModalFeedback';
import { useGlobalContext } from '@/context/GlobalProvider';
import BottomSheet from '@gorhom/bottom-sheet';
import { PlusIcon, SearchIcon } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { Pressable, TextInput } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

const _spacing = 10;
const _color = "#ececec";
const _borderRadius = 8;
const _damping = 14;


const Dictionary = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOfset = useScrollViewOffset(scrollRef);
  const _imageHeight = 300
  const { yourWords } = useGlobalContext();
  const [customData, setCustomData] = useState([]);

  const bottomSheetModalRef = useRef<BottomSheet>(null)
  const handlePresentModalPress = () => bottomSheetModalRef.current?.present()

  const [query, setQuery] = useState('')
  const submitQuery = () => {
    const filteredWords = yourWords.filter((word) => word.word.toLowerCase().includes(query.toLowerCase()));
    setCustomData(filteredWords);
    setQuery('');
  }

  useEffect(() => {
    const customFilter = yourWords.filter((word) => word.word.charAt(0).toLowerCase() === 'a');
    setCustomData(customFilter);
  }, [yourWords])

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
          <View className="w-full h-20 items-center justify-around flex-row">
            <View className="w-4/5 h-12 flex-row bg-white rounded-full p-3 justify-center items-center overflow-hidden">
              <View className="w-10 h-10 bg-red-400 justify-center items-center rounded-full">
                <SearchIcon size={24} color="#fff" />
              </View>
              <TextInput
                value={query}
                onChangeText={(e) => {
                  setQuery(e)
                }}
                onSubmitEditing={submitQuery}
                className="flex-1 h-10 p-2 font-Waku"
                placeholder='Search a word...'
                placeholderTextColor="black"
              />
            </View>
            <View className="w-10 h-10 rounded-full items-center justify-center bg-blue-400">
              <Pressable
                onPress={handlePresentModalPress}
              >
                <PlusIcon size={24} color="#fff" />
              </Pressable>
            </View>
          </View>
          <View
            className="flex-1 flex-row mb-24 "
            style={{
              padding: _spacing,
              gap: _spacing,
            }}
          >
            <Alphabet setCustomData={setCustomData} />
            <View className="flex-1 gap-4" >
              {customData.map((day, index) => (
                <Day
                  key={`day-${day.name}-${index}`}
                  weekLength={yourWords.length}
                  lastOne={index}
                  day={day}
                  _color={_color}
                  _borderRadius={_borderRadius}
                  _spacing={_spacing}
                  _damping={_damping}
                />
              ))}

            </View>
          </View>
          <ModalFeedBack bottomSheetModalRef={bottomSheetModalRef} comment="Hola" />
        </Animated.ScrollView>
      </ImageBackground>
    </View>
  )
}

export default Dictionary