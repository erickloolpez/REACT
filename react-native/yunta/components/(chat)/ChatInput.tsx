import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ChatInputProps = {
  onSendMessage: any;
  isLoading: boolean;
  input: any;
  handleSubmit: any;
  setHideOptions?: (hide: boolean) => void;
}

const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const ChatInput = ({
  onSendMessage,
  isLoading,
  input,
  handleSubmit,
  setHideOptions,
}: ChatInputProps) => {
  const { bottom } = useSafeAreaInsets();
  const [message, setMessage] = useState("");
  const expanded = useSharedValue(0)

  const expandItems = () => {
    expanded.value = withTiming(1, { duration: 400 })
  }

  const collapseItems = () => {
    setHideOptions?.(true);
    expanded.value = withTiming(0, { duration: 400 })
  }

  return (
    <BlurView intensity={20} className="p-2 pb-4">
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
            const text = e.nativeEvent.text.trim();

            if (!text) {
              setHideOptions?.(false);
              return;
            }
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
    </BlurView>
  );
};

export default ChatInput;