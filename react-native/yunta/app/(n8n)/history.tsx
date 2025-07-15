import { TikTokMessages } from '@/components/(n8n)/TikTokMessage';
import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { images } from '@/constants';
import { ChatItem, generateMessage } from "@/constants/chat";
import { useGlobalContext } from '@/context/GlobalProvider';
import axios from 'axios';
import { router } from 'expo-router';
import AnimatedLottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const chatSpeed = {
  slow: [1000, 500],
  medium: [500, 550],
  fast: [250, 250],
  "insane 🚀": [50, 100]
}

const History = () => {
  const { n8nData, setN8nData, user, updateStories, setStories } = useGlobalContext()
  const [messages, setMessages] = useState<ChatItem[]>([])
  const [form, setForm] = useState({
    character: "",
    place: "",
    title: "",
  })

  const timeout = useRef<NodeJS.Timeout | null>(null)

  const [speed, setSpeed] = useState<keyof typeof chatSpeed>('fast')

  const generateData = (text: string, displayForm: boolean = false) => {
    clearTimeout(timeout.current)
    const selectedSpeed = chatSpeed[speed]
    const timer = Math.random() * selectedSpeed[0] + selectedSpeed[1]

    timeout.current = setTimeout(() => {
      if (displayForm) {
        setMessages((data) => {
          return [generateMessage(text, displayForm), ...data]
        })
      } else {
        setMessages((data) => {
          return [generateMessage(text), ...data]
        })
      }
      // generateData()
    }, timer)
  }

  const handleSubmit = async () => {
    if (!form.character || !form.place) {
      Alert.alert('Error', 'Por favor, completa todos los campos antes de enviar.');
    } else {
      setMessages((data) => {
        return [generateMessage(`Creando una historia con el titulo de ${form.title} con el personaje ${form.character} en la localización ${form.place}`, false), ...data]
      })
      setForm({
        character: "",
        place: "",
        title: ""
      })

      const payload = {
        place: form.place,
        character: form.character,
        lastId: n8nData.upload.data[0].metadata.file_id,
        userId: user.user_id,
        title: form.title,
      };

      try {
        const responseHistory = await axios.post('https://n8n.srv831273.hstgr.cloud/webhook/93f442cd-0326-46f9-acd3-282de51b20ce', payload)
        setN8nData((prev: any) => ({
          ...prev,
          history: responseHistory.data,
        }));
        updateStories()

        console.log('Historia creada con éxito:', responseHistory.data.storyDetails[0].story_details_id);
        setStories((prev) => [...prev, responseHistory.data.storyDetails[0]]);

        generateData('Historia creada con éxito ✅');
        const timer = setTimeout(() => {
          router.replace({
            pathname: '/(n8n)/[query]',
            params: { id: responseHistory.data.storyDetails[0].story_details_id },
          })
        }, 2000); // Añadí más tiempo para que sea secuencial
        return () => clearTimeout(timer);



      } catch (error) {
        console.error('Error al crear la historia:', error);
        Alert.alert('Error', 'No se pudo crear la historia');
      }
    }
  }

  useEffect(() => {
    const getStatusMessage = () => {
      if (!n8nData.upload) return 'Subiendo documento al servidor ⬆️';
      if (n8nData.upload.data && !n8nData.summary) return 'Documento guardado en el la Vector Store 📁';
      if (n8nData.upload.data && n8nData.summary && !n8nData.history) return 'Resumen completado 📜';
      if (n8nData.upload.data && n8nData.summary && n8nData.history) return 'Historia creada 📝';
      return 'Procesando...';
    };

    const message = getStatusMessage();

    if (message === 'Documento guardado en el la Vector Store') {
      // Mostrar primero "Historia creada" y luego "Generando resumen"
      generateData(message);
      const timer = setTimeout(() => {
        generateData('Generando resumen...');
      }, 2000); // Pequeño delay para que se aprecie el cambio
      return () => clearTimeout(timer);
    } else if (message === 'Resumen completado 📜') {
      generateData(message);
      const firstTimer = setTimeout(() => {
        generateData('Generando historia ✍️');
      }, 2000);

      const secondTimer = setTimeout(() => {
        generateData('Listos para crear la historia 🚀', true);
      }, 4000); // Añadí más tiempo para que sea secuencial

      return () => {
        clearTimeout(firstTimer);
        clearTimeout(secondTimer);
      };
    } else {
      generateData(message);
    }
  }, [speed, n8nData])
  return (
    <ImageBackground source={images.bgHome} className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-4 items-center justify-center">
          <TikTokMessages
            data={messages}
            renderItem={({ item, index }) => {
              return !item.displayForm ? (
                <View className="min-w-64  items-start rounded-lg bg-blue-400 mb-10">
                  <View
                    className="w-full bg-[#ddd] justify-center items-center p-4 rounded-md relative"
                  >
                    <Text className="font-bold font-BlockHead text-xl">#{messages.length - index}</Text>
                    <Text className="text-center mt-2 ">{item.description}</Text>
                  </View>
                </View>
              ) : (
                <View className="w-full bg-white relative p-4 border border-gray-600 rounded-lg mb-10">
                  <Text className="text-sm font-bold font-BlockHead mb-2">Crea tu historia</Text>
                  <InputField
                    label="Titulo"
                    placeholder="Ingresa el título de la historia"
                    placeholderTextColor="#8c8c8c"
                    value={form.title}
                    onChangeText={(value) =>
                      setForm({ ...form, title: value })
                    }
                  />
                  <InputField
                    label="Personaje"
                    placeholder="Ingresa el nombre del personaje de la historia"
                    placeholderTextColor="#8c8c8c"
                    value={form.character}
                    onChangeText={(value) =>
                      setForm({ ...form, character: value })
                    }
                  />
                  <InputField
                    label="Localización"
                    placeholder="Ingresa la localización de la historia"
                    placeholderTextColor="#8c8c8c"
                    value={form.place}
                    onChangeText={(value) =>
                      setForm({ ...form, place: value })
                    }
                  />

                  <CustomButton
                    className="mt-4"
                    title="Enviar"
                    textVariant="default"
                    onPress={handleSubmit}
                  />

                </View>
              )
            }}
          />
          <View
            style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}
          >
            <AnimatedLottieView style={{ width: 200, height: 200 }} source={require('@/assets/gifs/sparkels.json')} autoPlay loop />
          </View>
        </View>

      </SafeAreaView>

    </ImageBackground>
  )
}

export default History