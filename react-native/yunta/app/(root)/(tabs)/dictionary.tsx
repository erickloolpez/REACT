// components/screens/Dictionary.tsx

import BottomSheet from '@gorhom/bottom-sheet';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { Pressable, TextInput } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

// Icons
import { PlusIcon, SearchIcon, Trash2 } from 'lucide-react-native';

// Custom components
import Alphabet from '@/components/(dictionary)/Alphabet';
import Day from '@/components/(dictionary)/Day';
import ModalFeedBack from '@/components/(dictionary)/ModalFeedback';
import { useGlobalContext } from '@/context/GlobalProvider';
import ReactNativeModal from 'react-native-modal';

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
  const { yourWords, deleteWord } = useGlobalContext();

  /* ─── Local State ──────────────────────────────────────────── */
  const [customData, setCustomData] = useState<{ letter: string; data: any[] }[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState('a');
  const [query, setQuery] = useState('');
  const [newWord, setNewWord] = useState<any | null>(null);
  const [openModal, setOpenModal] = useState(false);

  /* Datos de la letra actual */
  const currentLetterData = customData.find((d) => d.letter === letter);

  /* ─── Helpers ──────────────────────────────────────────────── */
  const handlePresentModalPress = () => bottomSheetModalRef.current?.present();

  /* ──────────────────────────────────────────────────────────── */
  /*                        Search logic                         */
  /* ──────────────────────────────────────────────────────────── */
  const submitQuery = async () => {
    if (!query.trim()) {
      // ✅ Limpiar resultados anteriores de búsqueda
      setCustomData((prev) => prev.filter((d) => d.letter !== 'search'));

      // ✅ Mostrar la letra 'a'
      setLetter('a');
      return;
    }

    // 1️⃣  Palabras ya cacheadas
    const cachedWords = customData.flatMap((g) => g.data);

    // 2️⃣  Filtrar dentro del caché
    const filteredCache = cachedWords.filter((w) =>
      w.word.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredCache.length) {
      // 3️⃣ Mostrar resultados desde el caché
      setCustomData((prev) => [
        ...prev.filter((d) => d.letter !== 'search'),
        { letter: 'search', data: filteredCache },
      ]);
      setLetter('search');
      setQuery('');
      return;
    }

    // 4️⃣ Buscar en yourWords
    const filteredBackend = yourWords.filter((w) =>
      w.word.toLowerCase().includes(query.toLowerCase())
    );

    if (!filteredBackend.length) {
      Alert.alert('Sin resultados', 'No se encontraron coincidencias.');
      return;
    }

    // 5️⃣ Traer relaciones reales desde el backend
    await callData(filteredBackend, 'search');
    setLetter('search');
    setQuery('');
  };
  /* ──────────────────────────────────────────────────────────── */
  /*                     Delete word logic                       */
  /* ──────────────────────────────────────────────────────────── */
  const handleConfirm = () => {
    deleteWord().then((deleted) => {
      if (!deleted) return;

      const firstLetter = deleted.word.charAt(0).toLowerCase();

      setCustomData((prev) =>
        prev // 1. elimine la palabra del grupo
          .map((group) =>
            group.letter === firstLetter
              ? {
                ...group,
                data: group.data.filter(
                  (item) => item.word !== deleted.word
                ),
              }
              : group
          )
          // 2. quite grupos vacíos
          .filter((group) => group.data.length)
      );
      setOpenModal(false);
      Alert.alert('✅ Éxito', 'Palabra eliminada correctamente');
    });
  }
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
              <View className="w-10 h-10 rounded-full justify-center items-center">
                <SearchIcon size={24} color="black" />
              </View>
              <TextInput
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={submitQuery}
                className="flex-1 h-10 p-2"
                placeholder="Busca una palabra..."
                placeholderTextColor="#8c8c8c"
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
                    setCustomData={setCustomData}
                    setOpenModal={setOpenModal}
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
            setCustomData={setCustomData}
          />
          <ReactNativeModal
            isVisible={openModal}
            backdropTransitionOutTiming={1}
            onModalHide={() => {
              // if (verification.state === 'success') setShowSuccessModal(true)
            }
            }
          >
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] items-center justify-around ">
              <View className="w-16 h-16 rounded-full items-center justify-center">
                <Trash2 size={36} color="red" />
              </View>
              <Text className="text-center font-bold">Estas a punto de eliminar una palabra de tu diccionario</Text>
              <Text className="text-center">¿Estás seguro de que quieres continuar?</Text>
              <View className="flex-row w-full justify-around">
                <TouchableOpacity
                  onPress={() => setOpenModal(false)}
                  className="w-40 p-4 justify-center items-center rounded-lg bg-gray-300"
                >
                  <Text>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleConfirm()}
                  className="w-40 p-4 justify-center items-center rounded-lg bg-red-600"
                >
                  <Text
                    className="text-white"
                  >Eliminar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ReactNativeModal>
        </Animated.ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Dictionary;
