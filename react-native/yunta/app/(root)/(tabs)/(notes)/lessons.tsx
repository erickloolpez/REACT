import CustomButton from '@/components/CustomButton';
import { carrusel, images } from '@/constants';
import { useGlobalContext } from '@/context/GlobalProvider';
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  View
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const questions = [
  {
    question: '¿Cuál es la capital de Francia?',
    options: ['Madrid', 'París', 'Berlín'],
    correctAnswer: 'París',
  },
  {
    question: '¿Quién escribió Cien años de soledad?',
    options: ['Gabriel García Márquez', 'Mario Vargas Llosa', 'Pablo Neruda'],
    correctAnswer: 'Gabriel García Márquez',
  },
  {
    question: '¿Cuál es el planeta más grande del sistema solar?',
    options: ['Tierra', 'Júpiter', 'Saturno'],
    correctAnswer: 'Júpiter',
  },
];

const Lessons = () => {
  const { user, stories } = useGlobalContext()
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const progress = useSharedValue(0);
  const [topic, setTopic] = useState(''); // Estado para el tema actual

  const current = questions[currentQuestion];

  // ✅ Actualiza la barra de progreso animada
  useEffect(() => {
    progress.value = withSpring((currentQuestion + 1) / questions.length);
  }, [currentQuestion]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${interpolate(progress.value, [0, 1], [0, 100])}%`,
    backgroundColor: '#FFD700',
    height: '100%',
    borderRadius: 4,
  }));

  const getOptionStyle = (option: string) => {
    if (!answered) return 'bg-[#fff] border border-black';
    if (option === current.correctAnswer) return 'bg-green-600';
    if (option === selectedOption && option !== current.correctAnswer)
      return 'bg-red-500';
    return 'bg-gray-300';
  };

  const handleOptionPress = (option: string) => {
    if (!answered) {
      setSelectedOption(option);
      setAnswered(true);
    }
  };

  // ✅ Función para reiniciar el quiz completo
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setAnswered(false);
    progress.value = withSpring(1 / questions.length);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      resetQuiz(); // Reinicia el quiz al finalizar
    }
  };

  return (
    <ImageBackground source={images.bgNotes} className="flex-1">
      {
        topic == '' ? (
          <View className="flex-1">
            <BlurView className=" mb-10 p-4">
              <Text className="font-BlockHead text-white text-3xl mb-4">Hola, {user.username} </Text>
              <Text className="text-white text-lg">¿Sobre qué tema te gustaría repasar hoy?</Text>
            </BlurView>
            <View className="">
              <FlatList
                data={stories}
                numColumns={2}
                keyExtractor={(item) => item.title}
                renderItem={({ item, index }) => (
                  <Pressable
                    className="w-[48%] m-[1%] bg-white rounded-lg mb-3"
                    onPress={() => setTopic(item.title)}
                  >
                    <Image
                      source={carrusel[index]}
                      className="w-full h-32 rounded-t-lg mb-2"
                      resizeMode="cover"
                    />
                    <Text className="text-black text-base text-center mb-2">{item.title}</Text>
                  </Pressable>
                )}
                contentContainerStyle={{
                  paddingBottom: 100,
                  paddingHorizontal: 8,
                  justifyContent: 'space-between',
                }}
              />

            </View>
          </View>
        ) : (

          <View className="flex-1 px-4 pt-8">
            <View className="w-full h-8 bg-gray-200 rounded-full overflow-hidden mb-6">
              <Animated.View style={progressStyle} />
            </View>

            <View className="bg-white p-2 rounded-lg">
              <Text className="text-xl font-semibold mb-4">
                Pregunta {currentQuestion + 1}
              </Text>
              <Text className="text-lg mb-6">{current.question}</Text>

              {current.options.map((opt, i) => (
                <Pressable
                  key={i}
                  className={`p-4 rounded-lg mb-3 ${getOptionStyle(opt)}`}
                  onPress={() => handleOptionPress(opt)}
                  disabled={answered}
                >
                  <Text className="text-base text-center">{opt}</Text>
                </Pressable>
              ))}

              <CustomButton
                title={currentQuestion === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
                textVariant="default"
                disabled={!answered}
                onPress={handleNext}
                className="mt-4"
              />

            </View>
          </View>
        )
      }
    </ImageBackground>
  );
};

export default Lessons;
