import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
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
            bg-white  text-black 
            placeholder-gray-500 "
          editable={!isLoading}
        />
      </View>
    </View>
  );
};

export default ChatInput;