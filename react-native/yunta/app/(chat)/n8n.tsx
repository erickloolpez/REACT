import * as DocumentPicker from "expo-document-picker";
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const N8n = () => {
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
    <View className="flex-1 items-center justify-center">
      <Text>N8n</Text>
      <TouchableOpacity className="bg-green-400 p-4 rounded-xl mt-2" onPress={pickAndUpload}>
        <Text>Presioname para probar</Text>
      </TouchableOpacity>
    </View >
  )
}

export default N8n