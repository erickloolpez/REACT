import ChatInput from '@/components/(chat)/ChatInput';
import MessageList from '@/components/(chat)/MessageList';
import { chatAPI } from '@/lib/fetch';
import { Message } from '@/types/chat';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingImages, setPendingImages] = useState<string[]>([]);
  const [streamingMessage, setStreamingMessage] = useState<string>('');

  const handleAddImage = (imageData: string) => {
    setPendingImages(prev => [...prev, imageData]);
  };

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      role: 'user',
      content,
      ...(pendingImages.length > 0 && { image_data: pendingImages }),
    };

    try {
      setIsLoading(true);
      setPendingImages([]);
      setMessages(prev => [...prev, newMessage]);
      setStreamingMessage('');

      await chatAPI.sendMessage([...messages, newMessage], (chunk) => {
        if (chunk.status === 'streaming' && chunk.content) {
          setStreamingMessage(chunk.content);
        } else if (chunk.status === 'generating_image') {
          setStreamingMessage('Generando imagen...');
        } else if (chunk.status === 'done' && chunk.content) {
          const assistantMessage: Message = {
            role: 'assistant',
            content: chunk.content,
          };
          setMessages(prev => [...prev, assistantMessage]);
          setStreamingMessage('');
        }
      });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
      setPendingImages([]);
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1 px-4 py-4">
        <MessageList messages={messages} streamingMessage={streamingMessage} />
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={70}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ChatInput
          onSendMessage={handleSendMessage}
          onAddImage={handleAddImage}
          pendingImages={pendingImages}
          isLoading={isLoading}
        />
      </KeyboardAvoidingView>
    </View >
  );
};

export default Chat;