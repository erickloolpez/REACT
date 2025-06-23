import { useLocalSearchParams } from 'expo-router';


import ModalFeedBack from "@/components/(n8n)/ModalFeedback";
import Story from "@/components/(n8n)/Story";
import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import BottomSheet from "@gorhom/bottom-sheet";
import axios from 'axios';
import { ArrowLeft } from "lucide-react-native";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, ImageBackground, ScrollView, Text, TextInput, View } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const N8n = () => {
  const { query } = useLocalSearchParams<{ query: string }>();
  const { yourWords, setYourDictionary, yourDictionary, setWords, stories, setStories } = useGlobalContext();

  const wordsDB = yourWords.map((word) => word.toLowerCase());
  //Is the first option to show on the bottom sheet modal
  const [newWord, setNewWord] = useState(wordsDB[0])
  const [selectedWord, setSelectedWord] = useState('');

  const bottomSheetModalRef = useRef<BottomSheet>(null)
  const handlePresentModalPress = () => bottomSheetModalRef.current?.present()

  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0)
  const [onboarding, setOnboarding] = useState(['History', 'Words', 'Practice'])

  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)

  const [yourStory, setYourStory] = useState({})
  const [flag, setFlag] = useState(false)
  const [hadAnUpdate, setHadAnUpdate] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const callWebhook = async (formData) => {
    setLoading(true)
    move.value = withRepeat(
      withTiming(-360, { duration: 1000 }),
      1,
      false,
      () => {
        runOnJS(setLoading)(false); //This is a worklet
        runOnJS(setReady)(true); //This is a worklet
      },
    );
    // Llamar al webhook de n8n
    try {
      const { data: webhookData } = await axios.post('https://n8n.srv831273.hstgr.cloud/webhook/93f442cd-0326-46f9-acd3-282de51b20ce', formData)
      console.log('Response from WEBHOOK n8n.tsx:', webhookData);

      if (!webhookData?.storyId) {
        throw new Error('La respuesta del webhook no contiene storyId');
      }

      setYourDictionary(webhookData.storyId);
      console.log('Dictionary saved', webhookData);

      // Ejecutar las dos peticiones GET en paralelo
      const [wordsResponse, storyResponse] = await Promise.all([
        axios.get('http://192.168.100.10:3003/words').catch(err => {
          console.error('Error fetching words:', err);
          return { data: [] }; // fallback o manejo alternativo
        }),
        axios.get(`http://192.168.100.10:3003/history/${webhookData.storyId}`).catch(err => {
          console.error('Error fetching story:', err);
          return { data: null };
        }),
      ]);

      const wordsArray = wordsResponse.data.map(item => item.word);
      const justStory = storyResponse.data.story_id;
      setWords(wordsArray);
      setYourStory(storyResponse.data);
      console.log('Words fetched:', wordsArray);
      console.log('Story fetched:', justStory);
      setFlag(true);

    } catch (error: any) {
      console.error('Error en la operación:', error.message || error);
    }
  }

  const move = useSharedValue(0)
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          // translateX: interpolate(move.value, [0, 100], [-50, 50], 'clamp')
          rotate: `${move.value}deg`, // importante el string con 'deg'
        },
      ],
    }
  })

  useEffect(() => {
    move.value = withRepeat(
      withTiming(-15, { duration: 3000 }),
      -1, // repetir infinito
      true,
    );
  }, []);

  const [contentStory, setContentStory] = useState(stories[query])
  const [customHeight, setCustomHeight] = useState(false);
  const [originalStory, setOriginalStory] = useState({
    story_title: contentStory?.story_title || 'Mi Historia',
    character: contentStory?.character || 'Steve',
    story: contentStory?.story || 'Aveces ipsum Steve sit amet burro adipisicing elit. Suscipit doloremque magni ipsum minima delectus. cat optio Steve esse perferendis tenetur natus nulla corporis quia, officia diego ratione consectetur praesentium perrito .',
    place: contentStory?.place || 'El bosque encantado',
  })
  const [story, setStory] = useState(originalStory);

  const words = story.story.split(' ');
  const cleanWord = (word) => word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
  const wordsCleaned = words.map(word => cleanWord(word));
  const storyWords = useMemo(() => {
    return wordsCleaned.filter(word => wordsDB.includes(word));
  }, [story.story]);

  useEffect(() => {
    console.log('Flag changed:', flag);
    console.log('Refetch changed:', refetch);
    if ((yourStory && Object.keys(yourStory).length > 0) && yourDictionary !== 0) {
      const newOriginalStory = {
        story_title: yourStory.story_title || 'Mi Historia',
        character: yourStory.character || 'Steve',
        story: yourStory.story || 'Descripción por defecto...',
        place: yourStory.place || 'El bosque encantado',
      }
      setOriginalStory(newOriginalStory);
      setStory(newOriginalStory);
    } else if (refetch) {
      axios.get(`http://192.168.100.10:3003/history/user/1`)
        .then(response => {
          setStories(response.data);
          console.log('Data fetched for the next open 📝')
        })
        .catch(err => {
          console.error('Data not fetched for the next Open', err);
        });
    }

  }, [flag, refetch]);

  const hasChanges = () => {
    return story.story_title !== originalStory.story_title || story.character !== originalStory.character || story.place !== originalStory.place || hadAnUpdate;
  };

  const getChangedFields = (original, modified) => {
    const changes = {};
    for (const key in modified) {
      if (modified[key] !== original[key]) {
        changes[key] = modified[key];
      }
    }
    return changes;
  };

  const saveYourChanges = () => {
    const changes = getChangedFields(originalStory, story);
    if (Object.keys(changes).length === 0) {
      console.log('No hay cambios para guardar');
      return;
    }

    console.log('Cambios detectados: 🔃', changes);
    console.log('ID de la historia:', contentStory?.story_id);
    axios.put(`http://192.168.100.10:3003/history/${query ? contentStory?.story_id : ''}`, changes)
      .then(response => {
        console.log('Cambios guardados ✅');
        Alert.alert('Éxito', 'Cambios guardados correctamente');
        setHadAnUpdate(false);
        setRefetch(true);
      })
      .catch(err => {
        console.error('Error guardando cambios:', err);
      });
  };

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground source={images.bgHome} className="flex-1">
        <View className="h-24 flex-row relative items-center justify-center">
          <View className="absolute left-3 bg-[#003366] rounded-full p-3">
            <ArrowLeft size={28} color="#fff" />
          </View>
          <Text className="font-BlockHead text-[#FFD200] text-2xl">Tu Historia</Text>
        </View>
        <View className={`flex-row justify-center items-center ${loading ? 'flex-1' : ''}`}>
          <Animated.Image
            source={images.steve}
            className={`${customHeight ? 'hidden' : 'block'} w-40 h-64  object-contain  `}
            style={imageAnimatedStyle}
          />
        </View>
        <View className={`${loading ? 'hidden' : 'flex-1'} rounded-t-3xl bg-[#003366] overflow-hidden `}>
          {
            ready || query && (
              <Swiper
                ref={swiperRef}
                loop={false}
                dot={<View className="w-[32px] h-[4px] mx-1 bg-[#e2e8f0] rounded-full" />}
                activeDot={<View className="w-[32px] h-[4px]  mx-1 bg-[#FFD200] rounded-full" />}
                onIndexChanged={(index) => setActiveIndex(index)}
                paginationStyle={{ bottom: 10 }}
              >
                {
                  onboarding.map((item, index) => (
                    <View key={`${item}-index`} className="flex-1 p-6 flex-col " >
                      <View className="flex-row items-center h-10 bg-green-400">
                        <Text className="font-BlockHead text-white ">Titulo: </Text>
                        <TextInput
                          value={story.story_title}
                          onChangeText={(text) => setStory(prev => ({ ...prev, story_title: text }))}
                          className="font-BlockHead text-black text-base border border-black px-2 bg-white rounded-md"
                        />
                      </View>
                      <View className="flex-row items-center h-10 bg-green-400">
                        <Text className="font-BlockHead text-white ">Personaje: </Text>
                        <TextInput
                          value={story.character}
                          onChangeText={(text) => setStory(prev => ({ ...prev, character: text }))}
                          onSubmitEditing={() => {
                            setStory(prev => ({
                              ...prev,
                              story: prev.story.replace(prev.character, story.character)
                            }))
                          }}
                          className="font-BlockHead text-black text-base border border-black px-2 bg-white rounded-md"
                        />
                      </View>
                      <View className="flex-row items-center h-10 bg-green-400">
                        <Text className="font-BlockHead text-white ">Lugar: </Text>
                        <TextInput
                          value={story.place}
                          onChangeText={(text) => setStory(prev => ({ ...prev, place: text }))}
                          onSubmitEditing={() => {
                            setStory(prev => ({
                              ...prev,
                              story: prev.story.replace(prev.place, story.character)
                            }))
                          }}
                          className="font-BlockHead text-black text-base border border-black px-2 bg-white rounded-md"
                        />
                      </View>

                      <ScrollView className="mt-4 h-44  ">
                        <Text className="font-Waku text-white text-base/7">
                          {
                            wordsCleaned.map((word, index) => {
                              if (wordsDB.includes(word)) {
                                return (
                                  <Text
                                    key={`${word}-${index}`}
                                    className="text-red-600 font-Waku"
                                    onPress={() => {
                                      setSelectedWord(word)
                                      handlePresentModalPress()
                                    }}
                                  >{word} </Text>
                                )
                              }
                              return (
                                <Text
                                  key={`${word}-${index}`}
                                  className="text-white font-Waku"
                                >{word} </Text>
                              )

                            })
                          }
                        </Text>
                      </ScrollView>
                      {
                        hasChanges() && (
                          <CustomButton
                            className="mb-2"
                            title="Guardar Cambios"
                            textVariant="default"
                            onPress={() => saveYourChanges()}
                          />
                        )
                      }
                    </View>
                  ))
                }
              </Swiper>
            )
          }
          {
            (!ready && !loading) && !query && (
              <Story callWebhook={callWebhook} setCustomHeight={setCustomHeight} />
            )
          }
          <ModalFeedBack bottomSheetModalRef={bottomSheetModalRef} comment={selectedWord} setNewWord={setNewWord} newWord={newWord} filterWords={wordsDB} storyWords={storyWords} setStory={setStory} setComment={setSelectedWord} setHadAnUpdate={setHadAnUpdate} />
        </View>
      </ImageBackground>
    </SafeAreaView >
  )
}

export default N8n