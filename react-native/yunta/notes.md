import ChatInput from '@/components/(chat)/ChatInput';
import MessageList from '@/components/(chat)/MessageList';
import MessagesIdeas from '@/components/(chat)/MessagesIdeas';
import { Message } from '@/utils/interfaces';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [height, setHeight] = useState(0)
  const [pendingImages, setPendingImages] = useState<string[]>([]);
  const [streamingMessage, setStreamingMessage] = useState<string>('');

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height / 2)
  }

  const handleSendMessage = async (content: string) => {
    console.log("Getting completition for", content)
    const newMessage: Message = {
      role: 'user',
      content,
      ...(pendingImages.length > 0 && { image_data: pendingImages }),
    };
  }


  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1 px-4 py-4" onLayout={onLayout}>
        <MessageList messages={messages} height={height} />
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={70}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="absolute bottom-0 left-0 w-full  bg-white dark:bg-gray-900"
      >
        {
          messages.length === 0 && <MessagesIdeas onSelectCard={handleSendMessage} />
        }
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </KeyboardAvoidingView>
    </View >
  );
};

export default Chat;