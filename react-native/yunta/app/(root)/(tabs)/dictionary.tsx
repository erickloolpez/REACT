// components/screens/Dictionary.tsx

import BottomSheet from '@gorhom/bottom-sheet';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { Pressable, TextInput } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

// Icons
import { PlusIcon, SearchIcon } from 'lucide-react-native';

// Custom components
import Alphabet from '@/components/(dictionary)/Alphabet';
import Day from '@/components/(dictionary)/Day';
import ModalFeedBack from '@/components/(dictionary)/ModalFeedback';
import { useGlobalContext } from '@/context/GlobalProvider';

// Constants
const _spacing = 10;
const _color = '#ececec';
const _borderRadius = 8;
const _damping = 14;
const _imageHeight = 300;

/* ────────────────────────────────────────────────────────────── */
/*                           Component                           */
/* ────────────────────────────────────────────────────────────── */
const Dictionary = () => {
  /* ─── Refs & Animations ────────────────────────────────────── */
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottomSheetModalRef = useRef<BottomSheet>(null);

  /* ─── Context ──────────────────────────────────────────────── */
  const { yourWords } = useGlobalContext();

  /* ─── Local State ──────────────────────────────────────────── */
  const [customData, setCustomData] = useState<{ letter: string; data: any[] }[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState('a');
  const [query, setQuery] = useState('');
  const [newWord, setNewWord] = useState<any | null>(null);

  /* Datos de la letra actual */
  const currentLetterData = customData.find((d) => d.letter === letter);

  /* ─── Helpers ──────────────────────────────────────────────── */
  const handlePresentModalPress = () => bottomSheetModalRef.current?.present();

  /* ──────────────────────────────────────────────────────────── */
  /*                        Search logic                         */
  /* ──────────────────────────────────────────────────────────── */
  const submitQuery = () => {
    const filtered = yourWords.filter((w) =>
      w.word.toLowerCase().includes(query.toLowerCase()),
    );
    setCustomData([{ letter: 'search', data: filtered }]);
    setLetter('search'); // cambiar la vista a resultados de búsqueda
    setQuery('');
  };

  /* ──────────────────────────────────────────────────────────── */
  /*                     Cache & fetch por letra                 */
  /* ──────────────────────────────────────────────────────────── */
  const callData = async (filteredWords: any[], currentLetter: string) => {
    setLoading(true);
    try {
      const alreadyFetched = customData.some((d) => d.letter === currentLetter);
      if (alreadyFetched) {
        setLoading(false);
        return;
      }

      const updatedData = { letter: currentLetter, data: [] as any[] };

      for (const word of filteredWords) {
        try {
          const { data } = await axios.get(
            `http://192.168.100.10:3003/story-associations/sp/${word.word}`,
          );
          updatedData.data.push({ ...word, fetchedRelations: data });
        } catch {
          updatedData.data.push({ ...word, fetchedRelations: [] });
        }
      }

      setCustomData((prev) => [...prev, updatedData]);
    } catch (err) {
      const fallback = filteredWords.map((w) => ({
        ...w,
        fetchedRelations: [],
      }));
      setCustomData((prev) => [...prev, { letter: currentLetter, data: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  /* ──────────────────────────────────────────────────────────── */
  /*                  Rerun fetch when letter changes            */
  /* ──────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!yourWords.length) return;
    if (letter === 'search') return; // no fetch para resultados de búsqueda

    const filtered = yourWords.filter(
      (w) => w.word.charAt(0).toLowerCase() === letter,
    );
    callData(filtered, letter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letter, yourWords]);

  /* ──────────────────────────────────────────────────────────── */
  /*                         Animations                          */
  /* ──────────────────────────────────────────────────────────── */
  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          scrollOffset.value,
          [-_imageHeight, 0, _imageHeight],
          [_imageHeight / 2, 0, -_imageHeight * 0.75],
          'clamp',
        ),
      },
      {
        scale: interpolate(
          scrollOffset.value,
          [-_imageHeight, 0, _imageHeight],
          [2, 1, 1],
          'clamp',
        ),
      },
    ],
  }));

  /* ──────────────────────────────────────────────────────────── */
  /*                           Render                            */
  /* ──────────────────────────────────────────────────────────── */
  return (
    <View className="flex-1">
      <ImageBackground
        source={require('@/assets/images/bgDictionary.webp')}
        resizeMode="cover"
        className="rounded-lg"
      >
        <Animated.ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {/* Banner */}
          <Animated.Image
            source={require('@/assets/images/banner_dictionary.webp')}
            style={[
              { width: 400, height: _imageHeight, objectFit: 'contain' },
              imageAnimatedStyle,
            ]}
          />

          {/* Search Bar */}
          <View className="w-full h-20 flex-row items-center justify-around">
            <View className="w-4/5 h-12 flex-row bg-white rounded-full p-3 items-center overflow-hidden">
              <View className="w-10 h-10 bg-red-400 rounded-full justify-center items-center">
                <SearchIcon size={24} color="#fff" />
              </View>
              <TextInput
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={submitQuery}
                className="flex-1 h-10 p-2 font-Waku"
                placeholder="Search a word..."
                placeholderTextColor="black"
              />
            </View>

            <Pressable
              className="w-10 h-10 bg-blue-400 rounded-full items-center justify-center"
              onPress={handlePresentModalPress}
            >
              <PlusIcon size={24} color="#fff" />
            </Pressable>
          </View>

          {/* Dictionary Content */}
          <View
            className="flex-row mb-24"
            style={{ padding: _spacing, gap: _spacing }}
          >
            {/* Sidebar Alphabet */}
            <Alphabet letter={letter} setLetter={setLetter} />

            {/* Word List */}
            <View className="flex-1 gap-4">
              {!loading &&
                currentLetterData?.data.map((day, index) => (
                  <Day
                    key={`day-${day.name || day.word}-${index}`}
                    weekLength={yourWords.length}
                    lastOne={index}
                    day={day}
                    _color={_color}
                    _borderRadius={_borderRadius}
                    _spacing={_spacing}
                    _damping={_damping}
                    handlePresentModalPress={handlePresentModalPress}
                    setNewWord={setNewWord}
                  />
                ))}

              {loading && (
                <View className="flex-1 items-center justify-center">
                  <Animated.Text className="text-lg font-Waku text-white">
                    Loading...
                  </Animated.Text>
                </View>
              )}
            </View>
          </View>

          {/* Modal for create / edit */}
          <ModalFeedBack
            bottomSheetModalRef={bottomSheetModalRef}
            newWord={newWord}
            setNewWord={setNewWord}
          />
        </Animated.ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Dictionary;
