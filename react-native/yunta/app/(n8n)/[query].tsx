// components/screens/N8n.tsx
import BottomSheet from '@gorhom/bottom-sheet';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import AnimatedLottieView from 'lottie-react-native';
import { ArrowLeft, Maximize2, Quote, SquarePen, Trash2 } from 'lucide-react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

import ModalFeedBack from '@/components/(n8n)/ModalFeedback';
import CustomButton from '@/components/CustomButton';
import { images } from '@/constants';
import { useGlobalContext } from '@/context/GlobalProvider';
import { Marquee } from '@animatereactnative/marquee';
import ReactNativeModal from 'react-native-modal';

const N8n = () => {
  /* ─── Ruta & contexto ─────────────────────────────────────── */
  const { query, id } = useLocalSearchParams<{ query?: string, id?: number }>(); // query opcional
  const {
    yourWords,
    setStories,            // actualizar historias
    stories,
    deleteStory
  } = useGlobalContext();

  const wordsDB = yourWords.map((w) => w.word.toLowerCase());
  const [openModal, setOpenModal] = useState(false);

  const { width } = Dimensions.get('window')
  const _itemSize = width * 0.4
  const _spacing = 8

  /* ─── Refs / estado ───────────────────────────────────────── */
  const bottomSheetModalRef = useRef<BottomSheet>(null);
  const swiperRef = useRef<Swiper>(null);

  const [selectedWord, setSelectedWord] = useState('');
  const [newWord, setNewWord] = useState(wordsDB[0]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  /* ─── Animación personaje ─────────────────────────────────── */
  const move = useSharedValue(0);
  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${move.value}deg` }],
  }));
  useEffect(() => {
    move.value = withRepeat(withTiming(-15, { duration: 3000 }), -1, true);
  }, []);

  /* ─── Historia actual ─────────────────────────────────────── */
  const contentStory = !id ? stories[query] : stories.find((s) => s.story_details_id === Number(id));
  const [originalStory, setOriginalStory] = useState({
    title: contentStory?.title || 'Mi Historia',
    character: contentStory?.character || 'Steve',
    story_text: contentStory?.story_text || 'Aveces ipsum Steve sit amet...',
    place: contentStory?.place || 'El bosque encantado',
  });
  const [story, setStory] = useState(originalStory);

  /* ─── Palabras clicables ──────────────────────────────────── */
  const words = story.story_text.split(' ');
  const clean = (w: string) => w.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
  const wordsCleaned = words.map(clean);
  const storyWords = useMemo(
    () => wordsCleaned.filter((w) => wordsDB.includes(w)),
    [story.story_text],
  );
  const storyWordsDB = useMemo(
    () => yourWords.filter((w) => wordsCleaned.includes(w.word.toLowerCase())),
    [story.story_text],
  );

  /* ─── Abrir modal para cambiar palabra ────────────────────── */
  const openModalForWord = (word: string) => {
    setSelectedWord(word);
    bottomSheetModalRef.current?.present();
  };

  /* ─── Change height picture ────────────────────── */
  const changeHeight = () => {
    setOpen(!open);
  };

  const _layout = LinearTransition.springify().damping(14);

  function chunkArray(arr: string[], size: number) {
    const chunked_arr = []
    let index = 0
    while (index < arr.length) {
      chunked_arr.push(arr.slice(index, index + size))
      index += size
    }
    return chunked_arr
  }

  const wordsSplitted = useMemo(() => chunkArray(storyWordsDB, Math.floor(storyWordsDB.length)),
    []
  )

  const [editFullStory, setEditFullStory] = useState(false);

  const colors = [
    "#31773C", "#FD7D24", "#4592C4",
    "#719F3F", "#EED535", "#A38C21", "#7B62A3"
  ];


  const handleConfirm = () => {
    deleteStory(contentStory?.story_details_id).then((deleted) => {
      if (!deleted) return;

      Alert.alert('✅ Éxito', 'Palabra eliminada correctamente');
      setOpenModal(false);

      setTimeout(() => {
        router.back();
      }, 2000);
    });
  }
  /* ─── Sections ─────────────────────────────────────── */

  const sections = ['history', 'words']

  /* ─── Guardar cambios ─────────────────────────────────────── */
  const diffFields = (orig: any, mod: any) => {
    const out: any = {};
    Object.keys(mod).forEach((k) => {
      if (mod[k] !== orig[k]) out[k] = mod[k];
    });
    return out;
  };

  const saveYourChanges = () => {
    if (!query) {
      Alert.alert('Error', 'No hay ID de historia');
      return;
    }

    const changes = diffFields(originalStory, story);
    if (!Object.keys(changes).length) return;

    axios
      .put(`http://192.168.100.10:3003/story-details/${contentStory?.story_details_id}`, changes)
      .then(() => {
        Alert.alert('Éxito', 'Cambios guardados correctamente');

        /* 1️⃣  Sincronizar estado local */
        setOriginalStory(story);

        setStories((prev) => {
          const index = prev.findIndex((s) => s.story_details_id === contentStory?.story_details_id);
          if (index === -1) return prev;

          const updated = [...prev];
          updated[index] = { ...updated[index], ...story };

          return updated;
        });

      })
      .catch((err) => console.error('Error guardando cambios:', err));
  };

  /* ─── Render ──────────────────────────────────────────────── */
  return (
    <ImageBackground source={images.bgHome} className="flex-1">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View
          className="h-24 flex-row items-center justify-center relative"
        >
          <Pressable
            className="absolute left-3 bg-[#003366] p-3 rounded-full"
            onPress={() =>
              router.back()
            }
          >
            <ArrowLeft size={28} color="#fff" />
          </Pressable>
          <Text className="font-BlockHead bg-white rounded-lg p-2  text-2xl">
            Tu Historia
          </Text>

          <Pressable
            className="w-14 h-14 justify-center items-center bg-[#003366] rounded-full absolute right-3"
            onPress={() => setOpenModal(true)}
          >
            <Trash2 size={24} color="#fff" />
          </Pressable>

        </View>

        {/* Main ideas */}
        <View
          className={`flex-col justify-center ${!open ? 'flex-1' : 'hidden'}  `}
          style={{
            overflow: 'hidden',
            // transform: [{
            //   rotate: '-4deg'
            // }]
          }}
        >
          <View className="flex-1 items-center justify-center">
            {
              wordsSplitted.map((w, i) => (
                <Marquee
                  speed={0.3}
                  spacing={_spacing}
                  key={`marquee-${i}`}
                  reverse={i % 2 !== 0}
                >
                  <View style={{ flexDirection: 'row', gap: _spacing }}>
                    {w.map((word, index) => (
                      <View key={`word-${index}`} className=" relative w-56  bg-white border border-black p-4 rounded-lg justify-center "
                        style={{
                          backgroundColor: colors[index % colors.length],
                        }}
                      >
                        <Quote size={24} color="#fff" />
                        <Text numberOfLines={4} className="">{word.relation}</Text>
                      </View>
                    ))}
                  </View>
                </Marquee>
              ))
            }

          </View>
          <View className="flex-1 flex-row  justify-between ">
            <View className="w-48 px-2 justify-around">
              <Text className="text-center ">"Puedes editar el concepto en el diccionario. Presiona este botón para ir allí."</Text>
              <CustomButton
                title="Ir al Diccionario"
                textVariant="default"
                onPress={() => {
                  router.replace('/(root)/dictionary');
                }}
              />
            </View>
            <AnimatedLottieView style={{ width: 200, height: 200 }} source={require('@/assets/gifs/neko.json')} autoPlay loop />
          </View>
        </View>

        {/* Contenedor azul */}
        <Animated.View
          layout={_layout}
          className="flex-1 bg-[#003366] rounded-t-3xl overflow-hidden"
        >
          <Swiper
            ref={swiperRef}
            loop={false}
            dot={<View className="w-8 h-1 mx-1 bottom-[-15px] bg-white rounded-full" />}
            activeDot={<View className="w-8 h-1 mx-1 bottom-[-15px] bg-[#FFD200] rounded-full" />}
          >
            {
              sections.map((section, index) => (
                <View key={index} className="flex-1">
                  {section === 'history' ? (
                    <View className="flex-1 relative p-6">
                      <Pressable
                        className="absolute top-2 right-3 "
                        onPress={changeHeight}
                      >
                        <Maximize2 size={24} color="#FFD200" />
                      </Pressable>
                      {/* Campos editables */}
                      <View className="flex-row mt-2 flex-wrap gap-x-2 gap-y-1">
                        {(['title', 'character', 'place'] as const).map((field) => (
                          <View key={field} className="flex-row items-center h-10 bg-white rounded-full border border-black px-2">
                            <Text className=" text-yellow-600 capitalize text-lg font-bold">
                              {field}:{' '}
                            </Text>
                            <TextInput
                              value={(story as any)[field]}
                              onChangeText={(t) =>
                                setStory((p: any) => ({ ...p, [field]: t }))
                              }
                              className=" w-auto h-10 items-center pb-2 pr-3 px-2 rounded-md text-black text-base "
                            />
                          </View>
                        ))}
                      </View>
                      <TouchableOpacity
                        className="w-full h-10 flex-row items-center justify-center bg-white mt-4 rounded-sm"
                        onPress={() => setEditFullStory(!editFullStory)}
                      >
                        <SquarePen size={24} color="black" />
                        <Text className="ml-2"> {editFullStory ? 'Ver historia como lectura' : 'Editar toda la historia'}</Text>
                      </TouchableOpacity>
                      {/* Texto + palabras clicables */}
                      {editFullStory ? (
                        <TextInput
                          multiline
                          numberOfLines={10}
                          value={story.story_text}
                          onChangeText={(t) => setStory((p) => ({ ...p, story_text: t }))}
                          onFocus={() => setOpen(true)}
                          className="text-white bg-[#001f3f] rounded-lg p-4 text-base h-auto"
                          placeholder="Edita tu historia aquí..."
                          placeholderTextColor="#ccc"
                        />
                      ) : (
                        <ScrollView className="mt-4 h-44">
                          <Text className="text-white text-base leading-7">
                            {wordsCleaned.map((w, i) =>
                              wordsDB.includes(w) ? (
                                <Text
                                  key={`${w}-${i}`}
                                  className="text-red-600"
                                  onPress={() => openModalForWord(w)}
                                >
                                  {words[i]}{' '}
                                </Text>
                              ) : (
                                <Text key={`${w}-${i}`}>{words[i]} </Text>
                              )
                            )}
                          </Text>
                        </ScrollView>
                      )}

                      {/* Botón guardar */}
                      {Object.keys(diffFields(originalStory, story)).length > 0 && (
                        <CustomButton title="Guardar Cambios" onPress={saveYourChanges} />
                      )}
                    </View>
                  ) : (
                    <ScrollView className="flex-1 p-6">
                      {storyWordsDB.map((word, idx) => (
                        <View
                          key={idx}
                          className="rounded-sm px-3 py-3 border border-l-8 border-t-0 border-r-0 border-b-0 border-[#978AE2] bg-white mb-4"
                        >
                          <View className="flex-row justify-between">
                            <Text className="text-black mb-4 capitalize font-bold">{word.word}</Text>
                            <Quote size={16} color="black" />
                          </View>
                          <Text>{word.relation}</Text>
                        </View>
                      ))}
                    </ScrollView>
                  )}
                </View>
              ))
            }
          </Swiper>

          {/* Modal BottomSheet */}
          <ModalFeedBack
            bottomSheetModalRef={bottomSheetModalRef}
            comment={selectedWord}
            newWord={newWord}
            setNewWord={setNewWord}
            filterWords={wordsDB}
            storyWords={storyWords}
            setStory={setStory}
            setComment={setSelectedWord}
            setHadAnUpdate={() => { }}
          />
          <ReactNativeModal
            isVisible={openModal}
            backdropTransitionOutTiming={2}
          >
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] items-center justify-around ">
              <View className="w-16 h-16 rounded-full items-center justify-center">
                <Trash2 size={36} color="red" />
              </View>
              <Text className="text-center font-bold">Estas a punto de eliminar una historia.</Text>
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
        </Animated.View>
      </SafeAreaView >
    </ImageBackground>
  );
};

export default N8n;
