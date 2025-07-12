// components/screens/N8n.tsx
import BottomSheet from '@gorhom/bottom-sheet';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
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

const N8n = () => {
  /* ─── Ruta & contexto ─────────────────────────────────────── */
  const { query, id } = useLocalSearchParams<{ query?: string, id?: number }>(); // query opcional
  const {
    yourWords,
    setStories,            // actualizar historias
    stories,
  } = useGlobalContext();

  const wordsDB = yourWords.map((w) => w.word.toLowerCase());

  /* ─── Refs / estado ───────────────────────────────────────── */
  const bottomSheetModalRef = useRef<BottomSheet>(null);
  const swiperRef = useRef<Swiper>(null);

  const [selectedWord, setSelectedWord] = useState('');
  const [newWord, setNewWord] = useState(wordsDB[0]);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ─── Animación personaje ─────────────────────────────────── */
  const move = useSharedValue(0);
  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${move.value}deg` }],
  }));
  useEffect(() => {
    move.value = withRepeat(withTiming(-15, { duration: 3000 }), -1, true);
  }, []);

  /* ─── Historia actual ─────────────────────────────────────── */
  console.log('Query:', query, 'ID:', id);
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

  /* ─── Abrir modal para cambiar palabra ────────────────────── */
  const openModalForWord = (word: string) => {
    setSelectedWord(word);
    bottomSheetModalRef.current?.present();
  };

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
    <SafeAreaView className="flex-1">
      <ImageBackground source={images.bgHome} className="flex-1">
        {/* Header */}
        <Pressable
          className="h-24 flex-row items-center justify-center relative"
          onPress={() =>
            router.back()
          }
        >
          <View className="absolute left-3 bg-[#003366] p-3 rounded-full">
            <ArrowLeft size={28} color="#fff" />
          </View>
          <Text className="font-BlockHead text-[#FFD200] text-2xl">
            Tu Historia
          </Text>
        </Pressable>

        {/* Personaje */}
        <View
          className={`flex-row justify-center ${loading ? 'flex-1' : ''} items-center`}
        >
          <Animated.Image
            source={images.steve}
            className="w-40 h-64 object-contain"
            style={imageStyle}
          />
        </View>

        {/* Contenedor azul */}
        <View className="flex-1 bg-[#003366] rounded-t-3xl overflow-hidden">
          <Swiper
            ref={swiperRef}
            loop={false}
            dot={<View className="w-8 h-1 mx-1 bg-slate-200 rounded-full" />}
            activeDot={<View className="w-8 h-1 mx-1 bg-[#FFD200] rounded-full" />}
          >
            <View className="flex-1 p-6">
              {/* Campos editables */}
              {(['title', 'character', 'place'] as const).map((field) => (
                <View key={field} className="flex-row items-center h-10">
                  <Text className="font-BlockHead text-white capitalize">
                    {field}:{' '}
                  </Text>
                  <TextInput
                    value={(story as any)[field]}
                    onChangeText={(t) =>
                      setStory((p: any) => ({ ...p, [field]: t }))
                    }
                    className="bg-white border border-black px-2 rounded-md font-BlockHead text-black text-base flex-1"
                  />
                </View>
              ))}

              {/* Texto + palabras clicables */}
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
                    ),
                  )}
                </Text>
              </ScrollView>

              {/* Botón guardar */}
              {Object.keys(diffFields(originalStory, story)).length > 0 && (
                <CustomButton title="Guardar Cambios" onPress={saveYourChanges} />
              )}
            </View>
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
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default N8n;
