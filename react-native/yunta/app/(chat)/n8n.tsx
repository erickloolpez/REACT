import { images } from "@/constants";
import * as DocumentPicker from "expo-document-picker";
import { ArrowLeft } from "lucide-react-native";
import React, { useRef, useState } from 'react';
import { Alert, Image, ImageBackground, Text, View } from 'react-native';
import Swiper from "react-native-swiper";

const N8n = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0)
  const [onboarding, setOnboarding] = useState(['History', 'Words', 'Practice'])

  const pickAndUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Puedes filtrar por tipo si quieres
        copyToCacheDirectory: false,
      });

      console.log('Resultado de DocumentPicker:', result);

      // Condicional corregido
      if (result.canceled && !result.assets) {
        return Alert.alert('Error', 'No se seleccionó ningún archivo');
      }
      const fileUri = result.assets[0].uri;
      const filename = result.assets[0].name;
      const mimeType = result.assets[0].mimeType;

      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        name: filename,
        type: mimeType,
      });

      const response = await fetch('http://192.168.100.10:3003/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      console.log('Archivo subido:', data);

    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className="flex-1">
      <ImageBackground source={images.bgHome} className="flex-1">
        <View className="h-24 flex-row relative items-center justify-center">
          <View className="absolute left-3 bg-[#003366] rounded-full p-3">
            <ArrowLeft size={28} color="#fff" />
          </View>
          <Text className="font-BlockHead text-[#FFD200] text-2xl">Hola mundo</Text>
        </View>
        <View className="flex-row justify-center">
          <Image source={images.steve} className="w-40 h-60 object-contain" />
        </View>
        <View className="flex-1 rounded-t-3xl bg-[#003366] ">
          <Swiper
            ref={swiperRef}
            loop={false}
            dot={<View className="w-[32px] h-[4px] mx-1 bg-[#e2e8f0] rounded-full" />}
            activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#FFD200] rounded-full" />}
            onIndexChanged={(index) => setActiveIndex(index)}
            paginationStyle={{ bottom: 25 }}
          >
            {
              onboarding.map((item, index) => (
                <View key={`${item}-index`} className="flex-1 p-6" >
                  <Text className="font-Waku text-white text-base/7">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit doloremque magni ipsum minima delectus. Distinctio optio numquam esse perferendis tenetur natus nulla corporis quia, officia commodi ratione consectetur praesentium. Necessitatibus.</Text>
                </View>
              ))
            }
          </Swiper>
        </View>
      </ImageBackground>
    </View>
  )
}

export default N8n