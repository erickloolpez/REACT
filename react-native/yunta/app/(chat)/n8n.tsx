import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
  return (
    <View className="flex-1 items-center justify-center">
      <Text>N8n</Text>
      <TouchableOpacity className="bg-green-400 p-4 rounded-xl mt-2" onPress={() => callN8nWebhook({ message: 'Hola desde React Native!' })}>
        <Text>Presioname para probar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default N8n