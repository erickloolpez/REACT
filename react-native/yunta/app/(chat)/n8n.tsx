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
  const { words: wordsNeonDB } = useGlobalContext();
  const wordsDB = wordsNeonDB.map((word) => word.word.toLowerCase());
  const [selectedWord, setSelectedWord] = useState('');
  const [newWord, setNewWord] = useState(wordsDB[0])

  const bottomSheetModalRef = useRef<BottomSheet>(null)
  const handlePresentModalPress = () => bottomSheetModalRef.current?.present()

  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0)
  const [onboarding, setOnboarding] = useState(['History', 'Words', 'Practice'])

  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)

  const callWebhook = () => {
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

  const [customHeight, setCustomHeight] = useState(false);

  const [yourWords, setYourWords] = useState([])
  const [yourStory, setYourStory] = useState([])
  useEffect(() => {
    // Aquí haces la petición GET a tu backend
    axios.get('http://192.168.100.10:3003/words')
      .then(response => {
        setYourWords(response.data);
      })
      .catch(err => {
        console.error('Error fetching words:', err);
      });
    axios.get('http://192.168.100.10:3003/history')
      .then(response => {
        setYourStory(response.data);
      })
      .catch(err => {
        console.error('Error fetching Story:', err);
      });
  }, []);

  const [originalStory, setOriginalStory] = useState({
    title: yourStory[0]?.story_title || 'Mi Historia',
    character: yourStory[0]?.character || 'Steve',
    description: yourStory[0]?.story || 'Aveces ipsum Steve sit amet burro adipisicing elit. Suscipit doloremque magni ipsum minima delectus. cat optio Steve esse perferendis tenetur natus nulla corporis quia, officia diego ratione consectetur praesentium perrito .',
    place: yourStory[0]?.place || 'El bosque encantado',
  })
  const [story, setStory] = useState(originalStory);

  const words = story.description.split(' ');
  const cleanWord = (word) => word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
  const wordsCleaned = words.map(word => cleanWord(word));
  const storyWords = useMemo(() => {
    return wordsCleaned.filter(word => wordsDB.includes(word));
  }, [story.description]);

  useEffect(() => {
    if (yourStory.length > 0) {
      const firstStory = yourStory[0];
      const newOriginalStory = {
        title: firstStory.story_title || 'Mi Historia',
        character: firstStory.character || 'Steve',
        description: firstStory.story || 'Aveces ipsum Steve sit amet burro ...',
        place: firstStory.place || 'El bosque encantado',
      };
      setOriginalStory(newOriginalStory);
      setStory(newOriginalStory);
    }
  }, [yourStory]);

  const hasChanges = () => {
    return story.title !== originalStory.title || story.character !== originalStory.character || story.place !== originalStory.place;
  };

  const saveYourChanges = (dataToSave) => {
    axios.put('http://192.168.100.10:3003/history/1', dataToSave)
      .then(response => {
        console.log('Cambios guardados:', response.data);
        Alert.alert('Éxito', 'Cambios guardados correctamente');
        // Opcional: actualizar estado o hacer algo después de guardar
      })
      .catch(err => {
        console.error('Error guardando cambios:', err);
      });
  }
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
            ready && (
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
                          value={story.title}
                          onChangeText={(text) => setStory(prev => ({ ...prev, title: text }))}
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
                              description: prev.description.replace(prev.character, story.character)
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
                              description: prev.description.replace(prev.place, story.character)
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
                            onPress={() => saveYourChanges({
                              story_title: story.title,
                              character: story.character,
                              place: story.place
                            })}
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
            (!ready && !loading) && (
              <Story callWebhook={callWebhook} setCustomHeight={setCustomHeight} />
            )
          }
          {
            loading && (
              <View>
                <Text>Cargando ...</Text>
              </View>
            )

          }
          <ModalFeedBack bottomSheetModalRef={bottomSheetModalRef} comment={selectedWord} setNewWord={setNewWord} newWord={newWord} filterWords={wordsDB} storyWords={storyWords} setStory={setStory} setComment={setSelectedWord} />
        </View>
      </ImageBackground>
    </SafeAreaView >
  )
}

export default N8n