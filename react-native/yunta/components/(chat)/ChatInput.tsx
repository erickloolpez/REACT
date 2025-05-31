import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { ArrowUp, CameraIcon, PlusIcon, SendHorizonal } from "lucide-react-native";
import React, { useState } from "react";
import { Image, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ChatInputProps {
  onSendMessage: (content: string) => Promise<void>;
  onAddImage: (imageData: string) => void;
  pendingImages: string[];
  isLoading: boolean;
}

const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);


const ChatInput = ({
  onSendMessage,
  onAddImage,
  pendingImages,
  isLoading,
}: ChatInputProps) => {
  const { bottom } = useSafeAreaInsets();
  const [message, setMessage] = useState("");
  const expanded = useSharedValue(0)

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

  const expandItems = () => {
    expanded.value = withTiming(1, { duration: 400 })
  }

  const collapseItems = () => {
    expanded.value = withTiming(0, { duration: 400 })
  }

  const onChangeText = (text: string) => {
    collapseItems()
    setMessage(text);
  }

  const expandedButtonStyle = useAnimatedStyle(() => {
    const opacityInterpolation = interpolate(expanded.value, [0, 1], [1, 0], Extrapolation.CLAMP);
    const widthInterpolation = interpolate(expanded.value, [0, 1], [30, 0], Extrapolation.CLAMP);
    return {
      opacity: opacityInterpolation,
      width: widthInterpolation,
    }
  })

  const buttonViewStyle = useAnimatedStyle(() => {
    const witdhInterpolation = interpolate(expanded.value, [0, 1], [0, 100], Extrapolation.CLAMP);
    return {
      opacity: expanded.value,
      width: witdhInterpolation,
    }
  })

  // Envío de mensaje
  const handleSend = async () => {
    if (message.trim()) {
      await onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <View className="bg-white dark:bg-transparent" style={{ paddingBottom: bottom }}>
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
        <ATouchableOpacity onPress={expandItems} className="bg-green-400 rounded-full w-[30] h-[30] items-center justify-center" style={expandedButtonStyle}>
          <PlusIcon size={26} color="black" />
        </ATouchableOpacity>

        <Animated.View style={buttonViewStyle} className="flex-row items-center gap-4" >
          <TouchableOpacity onPress={() => ImagePicker.launchCameraAsync()}>
            <CameraIcon size={24} color="white" className="" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ImagePicker.launchImageLibraryAsync()}>
            <CameraIcon size={24} color="white" className="" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => DocumentPicker.getDocumentAsync({ type: 'image/*' })}>
            <CameraIcon size={24} color="white" className="" />
          </TouchableOpacity>
        </Animated.View>

        {/* <TouchableOpacity
          onPress={handlePickImage}
          className="p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg"
        >
          <ImageIcon size={26} color="#6b7280" />
        </TouchableOpacity> */}

        <TextInput
          autoFocus
          multiline
          onFocus={collapseItems}
          value={message}
          onChangeText={onChangeText}
          placeholder="Escribe un mensaje"
          className="flex-1 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-2
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400"
          editable={!isLoading}
          onSubmitEditing={handleSend}
        />
        {
          message.length > 0 ? (
            <TouchableOpacity
              onPress={() => setMessage("")}
              className="p-2.5 bg-gray-200 dark:bg-gray-600 rounded-lg"
            >
              <SendHorizonal size={26} color="#6b7280" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setMessage("")}
              className="p-2.5 bg-gray-200 dark:bg-gray-600 rounded-lg"
            >
              <ArrowUp size={26} color="#6b7280" />
            </TouchableOpacity>
          )
        }

        {/* <TouchableOpacity
          onPress={handleSend}
          disabled={!message.trim() || isLoading}
          className="p-2.5 bg-[#07b56a] rounded-lg disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 size={26} color="#fff" className="animate-spin" />
          ) : (
            <SendHorizonal size={26} color="#fff" />
          )}
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default ChatInput;