import ChatInput from '@/components/(chat)/ChatInput';
import MessageList from '@/components/(chat)/MessageList';
import { images } from '@/constants';
import { generateAPIUrl } from '@/utils/utils';
import { useChat } from '@ai-sdk/react';
import { fetch as expoFetch } from 'expo/fetch';
import React, { useState } from 'react';
import { Dimensions, ImageBackground, KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height: screenHeight } = Dimensions.get('window');
const _tabHeight = 90;

const Notes = () => {

  const { messages, error, handleInputChange, input, handleSubmit } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl('/(api)/chat'),
    onError: error => console.error(error, 'ERROR'),
  });

  const [relativeHeight, setHeight] = useState(0);

  const mountLayout = (event: any) => {
    console.log('onLayout event:', event.nativeEvent.layout);
    const { height } = event.nativeEvent.layout;

    setHeight(height / 2);
  }

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground source={images.bgNotes} className="flex-1">
        <View className="w-full relative" style={{ height: screenHeight - _tabHeight }}>
          <View className="flex-1 px-4 py-4" >
            <MessageList messages={messages} height={relativeHeight} />
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={20}
            className="w-full absolute bottom-10 "
            onLayout={mountLayout}
          >
            <ChatInput onSendMessage={handleInputChange} input={input} handleSubmit={handleSubmit} isLoading={false} />
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Notes