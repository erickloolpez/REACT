import { Message, Role } from '@/utils/interfaces'
import React from 'react'
import { Text, View } from 'react-native'

const ChatMessage = ({ prompt, role }: Message) => {
  return (
    <View className={`max-w-[85%] rounded-2xl px-4 py-3  ${role === Role.User ? 'bg-[#09995b] self-end' : 'bg-gray-100 dark:bg-gray-800 self-start'} p-3 `}>
      <Text className={`flex-1 flex-wrap ${role === Role.Bot ? 'text-white' : 'text-black'}`}>{prompt}</Text>
    </View>
  )
}

export default ChatMessage