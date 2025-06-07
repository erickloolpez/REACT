import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const N8n = () => {
  const callN8nWebhook = async (data: any) => {
    try {
      const response = await fetch('/(api)/n8n', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error al llamar al webhook: ${response.status}`);
      }

      const result = await response.json();
      console.log('Webhook llamado con éxito:', result);
    } catch (error) {
      console.error('Error al llamar al webhook:', error);
    }
  };

  const pickAndUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Puedes filtrar por tipo si quieres
        copyToCacheDirectory: false,
      });

      console.log('Resultado de DocumentPicker:', result);

      // Condicional corregido
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const fileUri = result.assets[0].uri;
        const filename = result.assets[0].name;
        const mimeType = result.assets[0].mimeType;

        const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        console.log('fileBase64:', fileBase64.substring(0, 100));

        const data = {
          filename: filename,
          mimeType: mimeType,
          fileBase64: fileBase64,
        };

        // Enviar al backend
        console.log('data', data.filename); // Aquí está el console.log que quieres
        const response = await fetch('/(api)/drive', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Error al subir a Drive');
        const res = await response.json();
        Alert.alert('Éxito', `Archivo subido: ${res.fileId}`);
      }
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