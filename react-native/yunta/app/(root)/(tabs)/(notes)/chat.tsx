import ChatInput from '@/components/(chat)/ChatInput';
import MessageList from '@/components/(chat)/MessageList';
import CircleShape from '@/components/CircleShape';
import LineShape from '@/components/LineShape';
import TriangleShape from '@/components/TriangleShape';
import { images } from '@/constants';
import { generateAPIUrl } from '@/utils/utils';
import { useChat } from '@ai-sdk/react';
import { fetch as expoFetch } from 'expo/fetch';
import React from 'react';
import { Dimensions, ImageBackground, KeyboardAvoidingView, Platform, Text, View } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');
const _tabTopHeight = 50
const _bottomHeight = 90

const Notes = () => {

  const { messages, error, handleInputChange, input, handleSubmit } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl('/(api)/chat'),
    onError: error => console.error(error, 'ERROR'),
  });

  const [hideOptions, setHideOptions] = React.useState(false);

  const templateMessages = [
    {
      role: 'Hola 👋',
      triangle: { top: 10, left: 10, rotate: '45deg' },
      circle: { bottom: 10, right: 10 },
      line: { bottom: 10, left: 10, rotate: '135deg' },
    },
    {
      role: '¿Cuál fue mi último tema de estudio?',
      triangle: { bottom: 5, right: 0, rotate: '0deg' },
      circle: { top: 2, left: 5 },
      line: { bottom: 0, left: 10, rotate: '180deg' },
    },
    {
      role: 'Cuando es mi proxima leccion?',
      triangle: { top: 8, right: 4, rotate: '240deg' },
      circle: { bottom: 5, left: 10 },
      line: { bottom: 5, right: 5, rotate: '180deg' },
    },
    {
      role: 'Como estas 🤖',
      triangle: { bottom: 8, left: 8, rotate: '15deg' },
      circle: { bottom: 8, right: 8 },
      line: { top: 8, right: 4, rotate: '140deg' },
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
          keyboardVerticalOffset={70}
          className="w-full absolute h-12 justify-end"
          style={{
            bottom: _bottomHeight,
            left: 0,
            right: 0,
          }}
        >
          <View className={` ${hideOptions || messages.length > 0 ? 'hidden' : 'flex-row'} flex-wrap gap-2 items-center justify-center mb-8`}>
            {
              templateMessages.map((item, index) => (
                <View key={index} className="w-[40%] relative h-24 items-center justify-center bg-white rounded-lg">
                  {/* Triángulo */}
                  <TriangleShape
                    width={20}
                    height={20}
                    direction="up"
                    fillColor="#FFD700"
                    strokeColor="#003366"
                    style={{
                      position: 'absolute',
                      ...item.triangle,
                      transform: [{ rotate: item.triangle?.rotate || '0deg' }],
                    }}
                  />

                  {/* Círculo */}
                  <CircleShape
                    size={24}
                    fillColor="#FFD700"
                    strokeColor="#003366"
                    strokeWidth={2}
                    style={{ position: 'absolute', ...item.circle }}
                  />

                  {/* Línea */}
                  <LineShape
                    length={30}
                    thickness={6}
                    strokeColor="#FFD700"
                    direction="horizontal"
                    style={{
                      position: 'absolute',
                      ...item.line,
                      transform: [{ rotate: item.line?.rotate || '0deg' }],
                    }}
                  />

                  {/* Texto */}
                  <Text className="text-center">{item.role}</Text>
                </View>
              ))
            }
          </View>
          <ChatInput onSendMessage={handleInputChange} input={input} handleSubmit={handleSubmit} isLoading={false} setHideOptions={setHideOptions} />
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  )
}

export default Notes