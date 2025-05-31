import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
// Si usas markdown, importa el componente adecuado para React Native
// import Markdown from 'react-native-markdown-display';

interface Message {
  role: "user" | "assistant";
  content: string;
  image_data?: string[] | string;
}

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
      {messages.map((message, index) => (
        <View
          key={index}
          className={
            message.role === "user"
              ? "flex flex-row justify-end"
              : "flex flex-row justify-start"
          }
        >
          <View
            className={
              "max-w-[85%] rounded-2xl px-4 py-3 " +
              (message.role === "user"
                ? "bg-[#09995b]"
                : "bg-gray-100 dark:bg-gray-800")
            }
          >
            {/* Si quieres usar markdown, descomenta esto y usa react-native-markdown-display */}
            {/* <Markdown>{message.content}</Markdown> */}
            <Text
              className={
                message.role === "user"
                  ? "text-white"
                  : "text-gray-900 dark:text-gray-100"
              }
              style={{ fontSize: 16 }}
            >
              {message.content}
            </Text>

            {/* Renderizado de imágenes adjuntas */}
            {message.image_data && (
              <View className="mt-3 flex-row flex-wrap gap-2">
                {(Array.isArray(message.image_data)
                  ? message.image_data
                  : [message.image_data]
                ).map((imgData, imgIndex) => (
                  <Image
                    key={imgIndex}
                    source={{ uri: `data:image/jpeg;base64,${imgData}` }}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 16,
                      marginRight: 8,
                      marginBottom: 8,
                    }}
                  />
                ))}
              </View>
            )}
          </View>
        </View>
      ))}

      {/* Mensaje en streaming */}
      {streamingMessage && (
        <View className="flex flex-row justify-start">
          <View className="max-w-[85%] rounded-2xl px-4 py-3 bg-gray-100 dark:bg-gray-800">
            {/* <Markdown>{streamingMessage}</Markdown> */}
            <Text className="text-gray-900 dark:text-gray-100" style={{ fontSize: 16 }}>
              {streamingMessage}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default MessageList;