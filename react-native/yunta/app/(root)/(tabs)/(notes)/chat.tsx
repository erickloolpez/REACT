import ChatInput from '@/components/(chat)/ChatInput';
import MessageList from '@/components/(chat)/MessageList';
import { images } from '@/constants';
import { generateAPIUrl } from '@/utils/utils';
import { useChat } from '@ai-sdk/react';
import { fetch as expoFetch } from 'expo/fetch';
import React from 'react';
import { Dimensions, ImageBackground, KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height: screenHeight } = Dimensions.get('window');
const _tabBottomHeight = 90;
const _tabTopHeight = 50

const Notes = () => {

  const { messages, error, handleInputChange, input, handleSubmit } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl('/(api)/chat'),
    onError: error => console.error(error, 'ERROR'),
  });

  return (
    <SafeAreaView edges={'top'} className="flex-1">
      <ImageBackground source={images.bgNotes} className="flex-1">
        <View className="w-full relative" style={{ height: screenHeight - _tabBottomHeight - _tabTopHeight }}>
          <View className="flex-1 px-4 py-4" >
            <MessageList messages={messages} />
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={50}
            className="w-full h-12 justify-end"
          >
            <ChatInput onSendMessage={handleInputChange} input={input} handleSubmit={handleSubmit} isLoading={false} />
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Notes