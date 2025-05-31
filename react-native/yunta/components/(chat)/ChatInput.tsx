import * as ImagePicker from "expo-image-picker";
import { ImageIcon, Loader2, SendHorizonal } from "lucide-react-native";
import React, { useState } from "react";
import { Image, ScrollView, TextInput, TouchableOpacity, View } from "react-native";

interface ChatInputProps {
  onSendMessage: (content: string) => Promise<void>;
  onAddImage: (imageData: string) => void;
  pendingImages: string[];
  isLoading: boolean;
}

const ChatInput = ({
  onSendMessage,
  onAddImage,
  pendingImages,
  isLoading,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  // Selección de imagen desde galería
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const base64 = result.assets[0].base64;
      if (base64) {
        onAddImage(base64);
      }
    }
  };

  // Envío de mensaje
  const handleSend = async () => {
    if (message.trim()) {
      await onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <View className="bg-white dark:bg-transparent p-4">
      {/* Previsualización de imágenes pendientes */}
      {pendingImages.length > 0 && (
        <ScrollView horizontal className="flex-row gap-2 mb-2">
          {pendingImages.map((imageData, idx) => (
            <View key={idx} className="w-[100px] h-[100px] rounded-lg overflow-hidden mr-2">
              <Image
                source={{ uri: `data:image/jpeg;base64,${imageData}` }}
                style={{ width: 100, height: 100, borderRadius: 12 }}
              />
            </View>
          ))}
        </ScrollView>
      )}

      <View className="flex-row items-end gap-x-2">
        {/* Botón para seleccionar imagen */}
        <TouchableOpacity
          onPress={handlePickImage}
          className="p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg"
        >
          <ImageIcon size={26} color="#6b7280" />
        </TouchableOpacity>

        {/* Campo de entrada de texto */}
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Escribe un mensaje"
          className="flex-1 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-2
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400"
          editable={!isLoading}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />

        {/* Botón de envío */}
        <TouchableOpacity
          onPress={handleSend}
          disabled={!message.trim() || isLoading}
          className="p-2.5 bg-[#07b56a] rounded-lg disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 size={26} color="#fff" className="animate-spin" />
          ) : (
            <SendHorizonal size={26} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInput;