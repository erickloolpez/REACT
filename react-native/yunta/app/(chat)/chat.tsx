import ChatInput from '@/components/(chat)/ChatInput';
import MessageList from '@/components/(chat)/MessageList';
import { generateAPIUrl } from '@/utils/utils';
import { useChat, useCompletion } from '@ai-sdk/react';
import { fetch as expoFetch } from 'expo/fetch';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

export default function App() {
  const { messages, error, handleInputChange, input, handleSubmit } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl('/(api)/chat'),
    onError: error => console.error(error, 'ERROR'),
  });

  // const [message, setMessage] = useState('Create ghibli styled imaged of a developer') //new
  //------------------->
  // const [messages, setMessages] = useState<Message[]>([]);
  const [height, setHeight] = useState(0);
  // const [working, setWorking] = useState(false);

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height / 2);
  };

  const { complete, completion, isLoading } = useCompletion({
    api: generateAPIUrl('/(api)/generate-image'),
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    onError: error => console.error(error, 'ERROR'),
    streamProtocol: 'text'
  });

  // const onSubmit = async () => {
  //   complete(message)
  // }

  return (
    <View className="flex-1">
      <View className="flex-1 px-4 py-4" onLayout={onLayout}>
        <MessageList messages={messages} height={height} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={70}
        style={{
          // position: 'absolute',
          // bottom: 10,
          // left: 0,
          // width: '100%',
        }}>
        <ChatInput onSendMessage={handleInputChange} input={input} handleSubmit={handleSubmit} isLoading={false} />
      </KeyboardAvoidingView>
    </View>

    // <SafeAreaView className="flex-1">
    //   <TextInput
    //     value={message}
    //     onChangeText={setMessage}
    //     placeholder="Type something"
    //     style={{
    //       borderWidth: 1,
    //       borderColor: "#ccc",
    //       padding: 8,
    //       margin: 8,
    //       backgroundColor: 'green'
    //     }}
    //   />
    //   <Button title="Ask AI" onPress={onSubmit} />
    //   {
    //     isLoading ? (
    //       <ActivityIndicator />
    //     ) : (
    //       <Image source={{ uri: completion }} style={{ width: 300, height: 300, margin: 8 }} />
    //     )
    //   }

    // </SafeAreaView>
  );
}
