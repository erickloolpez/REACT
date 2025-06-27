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
    <View className="p-2 pb-4">
      <View className="flex-row items-end gap-x-2">
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
          placeholderTextColor={"#8c8c8c"}
          className="flex-1 h-14 bg-white rounded-2xl border-2   p-4
            bg-white  text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400"
          editable={!isLoading}
        />
      </View>
    </View>
  );
};

export default ChatInput;