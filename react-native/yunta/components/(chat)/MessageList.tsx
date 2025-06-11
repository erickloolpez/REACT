import { icons } from "@/constants";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Image, View } from "react-native";
import ChatMessage from "./ChatMessage";

type Props = {
  messages: any;
  height: number;
}

const MessageList = ({ messages, height }: Props) => {
  console.log('heigth', height)
  return (
    <>
      {
        messages.length === 0 && (
          <View style={[{ marginTop: height === 17.5 ? 200 : height - 20, alignItems: 'center', gap: 16 }]}>
            <View className="self-center items-center justify-center w-14 h-14 bg-white rounded-full" >
              <Image source={icons.person} className="w-12 h-12" resizeMode={'cover'} />
            </View>
          </View >
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