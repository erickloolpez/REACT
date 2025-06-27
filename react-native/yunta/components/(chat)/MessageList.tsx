import { FlashList } from "@shopify/flash-list";
import { BlurView } from "expo-blur";
import React from "react";
import { Text } from "react-native";
import ChatMessage from "./ChatMessage";

type Props = {
  messages: any;
}

const MessageList = ({ messages }: Props) => {
  return (
    <>
      {
        messages.length === 0 && (
          <BlurView className="absolute h-20 justify-center items-center left-0 top-20 right-0 ">
            <Text className="font-BlockHead text-white text-">Consulta tus archivos aqui.</Text>
            {/* <Image source={icons.person} className="w-12 h-12" resizeMode={'cover'} /> */}
          </BlurView >
        )
      }
      <FlashList
        data={messages}
        renderItem={({ item }) => (
          <ChatMessage {...item} />
        )}
        estimatedItemSize={400}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingTop: 10
        }}
        keyboardDismissMode="on-drag"
      />
    </>
  );
};

export default MessageList;