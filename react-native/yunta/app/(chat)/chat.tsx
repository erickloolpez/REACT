import { generateAPIUrl } from '@/utils/utils';
import { useCompletion } from '@ai-sdk/react';
import { fetch as expoFetch } from 'expo/fetch';
import { useState } from 'react';
import { ActivityIndicator, Button, Image, SafeAreaView, TextInput } from 'react-native';

export default function App() {
  // const { messages, error, handleInputChange, input, handleSubmit } = useChat({
  //   fetch: expoFetch as unknown as typeof globalThis.fetch,
  //   api: generateAPIUrl('/(api)/chat'),
  //   onError: error => console.error(error, 'ERROR'),
  // });

  const [message, setMessage] = useState('Create ghibli styled imaged of a developer') //new

  const { complete, completion, isLoading } = useCompletion({
    api: generateAPIUrl('/(api)/generate-image'),
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    onError: error => console.error(error, 'ERROR'),
    streamProtocol: 'text'
  });

  const onSubmit = async () => {
    complete(message)
  }

  return (
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
    <SafeAreaView className="flex-1">
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type something"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
          margin: 8,
          backgroundColor: 'green'
        }}
      />
      <Button title="Ask AI" onPress={onSubmit} />
      {
        isLoading ? (
          <ActivityIndicator />
        ) : (
          <Image source={{ uri: completion }} style={{ width: 300, height: 300, margin: 8 }} />
        )
      }

    </SafeAreaView>
  );
}