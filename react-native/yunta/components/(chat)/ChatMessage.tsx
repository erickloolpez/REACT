import React from 'react'
import { Text, View } from 'react-native'

const ChatMessage = ({ content, role }: any) => {
  return (
    <View className={`max-w-[70%] rounded-2xl px-2 py-3  ${role === 'user' ? 'bg-[#09995b] self-end mb-3' : 'bg-gray-100 dark:bg-gray-800 self-start mb-3'}`}>
      <Text className={`flex-1 flex-wrap ${role === 'assistant' ? 'text-white' : 'text-black'}`}>{content}</Text>
    </View>
  )
}

export default ChatMessage