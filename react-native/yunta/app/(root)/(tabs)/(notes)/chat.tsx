import ChatInput from '@/components/(chat)/ChatInput';
import MessageList from '@/components/(chat)/MessageList';
import { images } from '@/constants';
import { generateAPIUrl } from '@/utils/utils';
import { useChat } from '@ai-sdk/react';
import { fetch as expoFetch } from 'expo/fetch';
import React from 'react';
import { Dimensions, ImageBackground, KeyboardAvoidingView, Platform, Text, View } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');
const _tabTopHeight = 50

const Notes = () => {

  const { messages, error, handleInputChange, input, handleSubmit } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl('/(api)/chat'),
    onError: error => console.error(error, 'ERROR'),
  });

  const templateMessages = [
    {
      role: 'system',
      content: 'You are a helpful assistant.',
    },
    {
      role: 'user',
      content: 'Hello, who are you?',
    },
    {
      role: 'assistant',
      content: 'I am an AI assistant, here to help you with your questions.',
    },
    {
      role: 'user',
      content: 'I am an AI assistant, here to help you with your questions.',
    },
  ];

  return (
    <ImageBackground source={images.bgLessons} className="flex-1">
      <View className="flex-1 w-full relative" >
        <View className="flex-1 items-center justify-start" >
          <MessageList messages={messages} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={90}
          className="w-full absolute h-12 justify-end"
          style={{
            bottom: _tabTopHeight,
            left: 0,
            right: 0,
          }}
        >
          <View className="flex-row flex-wrap gap-2 items-center justify-center">
            {
              templateMessages.map((item, index) => (
                <View className="w-[40%] h-24 items-center justify-center bg-white">
                  <Text>{item.role}</Text>
                </View>
              ))
            }
          </View>
          <ChatInput onSendMessage={handleInputChange} input={input} handleSubmit={handleSubmit} isLoading={false} />
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  )
}

export default Notes