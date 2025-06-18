import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { CameraIcon, PlusIcon } from "lucide-react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ChatInputProps = {
  onSendMessage: any;
  isLoading: boolean;
  input: any;
  handleSubmit: any;
}

const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const ChatInput = ({
  onSendMessage,
  isLoading,
  input,
  handleSubmit
}: ChatInputProps) => {
  const { bottom } = useSafeAreaInsets();
  const [message, setMessage] = useState("");
  const expanded = useSharedValue(0)

  const expandItems = () => {
    expanded.value = withTiming(1, { duration: 400 })
  }

  const collapseItems = () => {
    expanded.value = withTiming(0, { duration: 400 })
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

  return (
    <View className=" bg-white dark:bg-transparent" style={{ paddingBottom: 20 }}>
      <View className="flex-row items-end gap-x-2">
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

        <TextInput
          onFocus={collapseItems}
          onChange={e =>
            onSendMessage({
              ...e,
              target: {
                ...e.target,
                value: e.nativeEvent.text,
              },
            } as unknown as React.ChangeEvent<HTMLInputElement>)
          }
          onSubmitEditing={(e) => {
            handleSubmit(e);
            e.preventDefault();
          }}
          value={input}
          placeholder="Escribe un mensaje"
          className="flex-1 h-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-2
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400"
          editable={!isLoading}
        />
      </View>
    </View>
  );
};

export default ChatInput;