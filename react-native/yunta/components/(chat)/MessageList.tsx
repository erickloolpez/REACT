import { Message } from "@/types/chat";
import React from "react";
import { ScrollView, Text, View } from "react-native";
// Si usas markdown, importa el componente adecuado para React Native
// import Markdown from 'react-native-markdown-display';

interface MessageListProps {
  messages: Message[];
  streamingMessage?: string;
}

const MessageList = ({ messages, streamingMessage }: MessageListProps) => {
  return (
    <ScrollView
      className="flex-1 px-2 py-4"
      contentContainerStyle={{ gap: 24, paddingBottom: 24 }}
    // Si quieres que siempre muestre el último mensaje, puedes usar ref y scrollToEnd
    >
      {Array.from({ length: 100 }).map((_, index) => (
        <View key={index} className="flex-row items-start gap-2">
          <View className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
          <View className="flex-1">
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Usuario {index + 1}
            </Text>
            <Text className="text-base text-gray-900 dark:text-gray-100">
              Mensaje de ejemplo {index + 1}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default MessageList;