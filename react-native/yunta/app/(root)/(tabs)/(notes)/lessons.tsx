import CustomButton from '@/components/CustomButton';
import { carrusel, images } from '@/constants';
import { useGlobalContext } from '@/context/GlobalProvider';
import { BlurView } from 'expo-blur';
import { BadgeCheck } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
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

const Lessons = () => {
  const [questions, setQuestions] = useState([]);
  const { user, stories, sendStoryId } = useGlobalContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const progress = useSharedValue(0);
  const [topic, setTopic] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);

  const current = questions.length > 0 ? questions[currentQuestion] : null;
  const ref = React.useRef<ConfettiMethods>(null);

  // Inicializar progreso cuando hay preguntas
  useEffect(() => {
    if (questions.length > 0) {
      progress.value = withSpring((currentQuestion + 1) / questions.length);
    }
  }, [currentQuestion, questions.length]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${interpolate(progress.value, [0, 1], [0, 100])}%`,
    backgroundColor: '#FFD700',
    height: '100%',
    borderRadius: 4,
  }));

  const getOptionStyle = (option: string) => {
    if (!answered) return 'bg-[#fff] border border-black';
    if (option === current?.correctAnswer) return 'bg-green-600';
    if (option === selectedOption && option !== current?.correctAnswer)
      return 'bg-red-500';
    return 'bg-gray-300';
  };

  const handleOptionPress = (option: string) => {
    if (!answered) {
      setSelectedOption(option);
      setAnswered(true);

      // Actualizar puntaje si es correcto
      if (option === current?.correctAnswer) {
        setScore(prev => prev + 1);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setAnswered(false);
    setScore(0);
    if (questions.length > 0) {
      progress.value = withSpring(1 / questions.length);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setOpenModal(true);
      ref.current?.restart();
    }
  };

  const handleTopicSelect = async (title: string, id: number) => {
    try {
      setIsLoading(true);

      // Validar que sendStoryId exista
      if (!sendStoryId) {
        Alert.alert('Error', 'Función sendStoryId no disponible');
        setIsLoading(false);
        return;
      }

      const questionsData = await sendStoryId(id);

      // Extraer las preguntas del objeto response
      let questions = [];
      if (questionsData && questionsData.output && Array.isArray(questionsData.output)) {
        questions = questionsData.output;
      } else if (Array.isArray(questionsData)) {
        questions = questionsData;
      } else {
        Alert.alert('Error', 'No se pudieron cargar las preguntas para este tema');
        setIsLoading(false);
        return;
      }

      if (questions.length === 0) {
        Alert.alert('Error', 'No hay preguntas disponibles para este tema');
        setIsLoading(false);
        return;
      }

      // Validar estructura de preguntas
      const validQuestions = questions.filter(q =>
        q &&
        q.question &&
        q.options &&
        Array.isArray(q.options) &&
        q.options.length > 0 &&
        q.correctAnswer
      );

      if (validQuestions.length === 0) {
        Alert.alert('Error', 'Las preguntas no tienen el formato correcto');
        setIsLoading(false);
        return;
      }

      console.log('Preguntas recibidas:', validQuestions);
      setQuestions(validQuestions);
      setTopic(title);
      setCurrentQuestion(0);
      setSelectedOption(null);
      setAnswered(false);
      setScore(0);

      // Inicializar progreso
      progress.value = withSpring(1 / validQuestions.length);

    } catch (error) {
      console.error('Error al cargar preguntas:', error);
      Alert.alert('Error', 'Hubo un problema al cargar las preguntas');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    resetQuiz();
    setOpenModal(false);
    setTopic('');
  };

  // Renderizar pantalla de carga
  if (isLoading) {
    return (
      <ImageBackground source={images.bgNotes} className="flex-1">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FFD700" />
          <Text className="mt-4 text-white text-lg">Cargando preguntas...</Text>
        </View>
      </ImageBackground>
    );
  }

  // Renderizar selección de tema
  if (topic === '') {
    return (
      <ImageBackground source={images.bgNotes} className="flex-1">
        <View className="flex-1">
          <BlurView className="mb-10 p-4">
            <Text className="font-BlockHead text-white text-3xl mb-4">
              Hola, {user?.username || 'Usuario'}
            </Text>
            <Text className="text-white text-lg">
              ¿Sobre qué tema te gustaría repasar hoy?
            </Text>
          </BlurView>

          <View className="flex-1">
            <FlatList
              data={stories || []}
              numColumns={2}
              keyExtractor={(item, index) => item.title + index}
              renderItem={({ item, index }) => (
                <Pressable
                  className="w-[48%] m-[1%] bg-white rounded-lg mb-3"
                  onPress={() => handleTopicSelect(item.title, item.story_details_id)}
                >
                  <Image
                    source={carrusel[index] || carrusel[0]}
                    className="w-full h-32 rounded-t-lg mb-2"
                    resizeMode="cover"
                  />
                  <Text className="text-black text-base text-center mb-2">
                    {item.title}
                  </Text>
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
      </ImageBackground>
    );
  }

  // Renderizar quiz
  if (questions.length === 0 || !current) {
    return (
      <ImageBackground source={images.bgNotes} className="flex-1">
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg">No hay preguntas disponibles</Text>
          <CustomButton
            title="Volver"
            textVariant="default"
            onPress={() => setTopic('')}
            className="mt-4"
          />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={images.bgNotes} className="flex-1">
      <View className="flex-1 px-4 pt-8">
        {/* Barra de progreso */}
        <View className="w-full h-8 bg-gray-200 rounded-full overflow-hidden mb-6">
          <Animated.View style={progressStyle} />
        </View>

        {/* Contenedor de pregunta */}
        <View className="bg-white p-4 rounded-lg">
          <Text className="text-xl font-semibold mb-4">
            Pregunta {currentQuestion + 1} de {questions.length}
          </Text>
          <Text className="text-lg mb-6">{current.question}</Text>

          {/* Opciones */}
          {current.options.map((opt, i) => (
            <Pressable
              key={i}
              className={`p-4 rounded-lg mb-3 ${getOptionStyle(opt)}`}
              onPress={() => handleOptionPress(opt)}
              disabled={answered}
            >
              <Text className={`text-base text-center ${answered && opt === current.correctAnswer ? 'text-white' :
                  answered && opt === selectedOption && opt !== current.correctAnswer ? 'text-white' :
                    'text-black'
                }`}>
                {opt}
              </Text>
            </Pressable>
          ))}

          {/* Botón siguiente */}
          <CustomButton
            title={currentQuestion === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
            textVariant="default"
            disabled={!answered}
            onPress={handleNext}
            className="mt-4"
          />
        </View>
      </View>

      {/* Confetti */}
      <PIConfetti
        ref={ref}
        colors={['#FFD700', '#FF6347', '#4682B4']}
        blastPosition={{ x: 180, y: 0 }}
        fallDuration={3500}
      />

      {/* Modal de completado */}
      <ReactNativeModal isVisible={openModal} backdropTransitionOutTiming={2}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] items-center justify-around">
          <View className="w-16 h-16 rounded-full items-center justify-center">
            <BadgeCheck size={36} color="green" />
          </View>

          <View className="items-center">
            <Text className="text-center font-bold text-lg mb-4">
              ¡Felicitaciones!
            </Text>
            <Text className="text-center mb-2">
              Has completado tu lección del día.
            </Text>
            <Text className="text-center font-semibold mb-4">
              Puntaje: {score}/{questions.length}
            </Text>
            <Text className="text-center text-sm text-gray-600">
              Tu próxima lección te será recordada por correo electrónico.
            </Text>
          </View>

          <View className="flex-row w-full justify-around">
            <TouchableOpacity
              onPress={handleModalClose}
              className="w-40 p-4 justify-center items-center rounded-lg bg-green-400"
            >
              <Text className="text-white font-semibold">Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </ImageBackground>
  );
};

export default Lessons;