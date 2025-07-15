import { FlashList } from "@shopify/flash-list";
import { BlurView } from "expo-blur";
import AnimatedLottieView from 'lottie-react-native';
import React from "react";
import { Text, View } from "react-native";
import ChatMessage from "./ChatMessage";

type Props = {
  messages: any;
}

const MessageList = ({ messages }: Props) => {
  return (
    <View className="flex-1 w-full relative">
      {
        messages.length === 0 ? (
          <BlurView intensity={15} className="items-center mt-[50px]  w-full">
            <AnimatedLottieView style={{ width: 200, height: 200 }} source={require('@/assets/gifs/chatbot.json')} autoPlay loop />
            <Text className="font-BlockHead text-white text-">Consulta tus archivos aqui.</Text>
            {/* <Image source={icons.person} className="w-12 h-12" resizeMode={'cover'} /> */}
          </BlurView >
        ) : (
          <FlashList
            data={messages}
            renderItem={({ item, index }) => (
              <ChatMessage {...item} />
            )}
            estimatedItemSize={400}
            contentContainerStyle={{
              paddingBottom: 220,
              paddingTop: 20,
              paddingHorizontal: 10,
            }}
            keyboardDismissMode="on-drag"
          />
        )
      }
    </View>
  );
};

export default MessageList;