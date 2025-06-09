import ChatInput from '@/components/(chat)/ChatInput';
import MessageList from '@/components/(chat)/MessageList';
import { Message, Role } from '@/utils/interfaces';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

export default function App() {
  // const { messages, error, handleInputChange, input, handleSubmit } = useChat({
  //   fetch: expoFetch as unknown as typeof globalThis.fetch,
  //   api: generateAPIUrl('/(api)/chat'),
  //   onError: error => console.error(error, 'ERROR'),
  // });

  // const [message, setMessage] = useState('Create ghibli styled imaged of a developer') //new
  //------------------->
  const [messages, setMessages] = useState<Message[]>([]);
  const [height, setHeight] = useState(0);
  const [working, setWorking] = useState(false);

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height / 2);
  };

  // const { complete, completion, isLoading } = useCompletion({
  //   api: generateAPIUrl('/(api)/generate-image'),
  //   fetch: expoFetch as unknown as typeof globalThis.fetch,
  //   onError: error => console.error(error, 'ERROR'),
  //   streamProtocol: 'text'
  // });

  // const onSubmit = async () => {
  //   complete(message)
  // }

  const getCompletion = (text: string) => {
    setWorking(true);
    setMessages([...messages, { role: Role.User, content: 'hola', prompt: text }]);
    setMessages((prev) => [...prev, { role: Role.Bot, content: 'Perro hp', imageUrl: '', prompt: 'perro hp' }]);

    setWorking(false);
  };

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
        <ChatInput onSendMessage={getCompletion} isLoading={false} />
      </KeyboardAvoidingView>
    </View>

    //-------------------------------------------------->
    // <SafeAreaView style={{ height: '100%' }}>
    //   <View
    //     style={{
    //       height: '95%',
    //       display: 'flex',
    //       flexDirection: 'column',
    //       paddingHorizontal: 8,
    //     }}
    //   >
    //     <ScrollView style={{ flex: 1 }}>
    //       {messages.map(m => (
    //         <View key={m.id} style={{ marginVertical: 8 }}>
    //           <View>
    //             <Text style={{ fontWeight: 700 }}>{m.role}</Text>
    //             <Text>{m.content}</Text>
    //           </View>
    //         </View>
    //       ))}
    //     </ScrollView>

    //     <View style={{ marginTop: 8 }}>
    //       <TextInput
    //         style={{ backgroundColor: 'white', padding: 8 }}
    //         placeholder="Say something..."
    //         value={input}
    //         onChange={e =>
    //           handleInputChange({
    //             ...e,
    //             target: {
    //               ...e.target,
    //               value: e.nativeEvent.text,
    //             },
    //           } as unknown as React.ChangeEvent<HTMLInputElement>)
    //         }
    //         onSubmitEditing={e => {
    //           handleSubmit(e);
    //           e.preventDefault();
    //         }}
    //         autoFocus={true}
    //       />
    //     </View>
    //   </View>
    // </SafeAreaView>

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