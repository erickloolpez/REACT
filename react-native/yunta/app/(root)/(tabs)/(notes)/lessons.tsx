import CustomButton from '@/components/CustomButton';
import { carrusel, images } from '@/constants';
import { useGlobalContext } from '@/context/GlobalProvider';
import { BlurView } from 'expo-blur';
import { BadgeCheck } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ConfettiMethods, PIConfetti } from 'react-native-fast-confetti';
import { FlatList } from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
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
  const [openModal, setOpenModal] = useState(false);

  const current = questions[currentQuestion];
  const ref = React.useRef<ConfettiMethods>(null);

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
      setOpenModal(true)
      ref.current?.restart()
      // resetQuiz(); // Reinicia el quiz al finalizar
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
      <PIConfetti
        ref={ref}
        colors={['#FFD700', '#FF6347', '#4682B4']}
        blastPosition={{ x: 180, y: 0 }}
        fallDuration={3500}
      />
      <ReactNativeModal
        isVisible={openModal}
        backdropTransitionOutTiming={2}
      >
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] items-center justify-around ">
          <View className="w-16 h-16 rounded-full items-center justify-center">
            <BadgeCheck size={36} color="green" />
          </View>
          <Text className="text-center font-bold">Has completado tu lección del día. Tu próxima lección te será recordada por correo electrónico.</Text>
          <View className="flex-row w-full justify-around">
            <TouchableOpacity
              onPress={() => {
                resetQuiz(); // Reinicia el quiz al finalizar
                setOpenModal(false)
                setTopic('') // Resetea el tema
              }}
              className="w-40 p-4 justify-center items-center rounded-lg bg-green-400"
            >
              <Text>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </ImageBackground>
  );
};

export default Lessons;
