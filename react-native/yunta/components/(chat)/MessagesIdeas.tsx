import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

const _predefinedMessages = [
  { title: 'Idea 1', text: 'Description for idea 1' },
  { title: 'Idea 2', text: 'Description for idea 2' },
  { title: 'Idea 3', text: 'Description for idea 3' },
]

type Props = {
  onSelectCard: (message: string) => void
}
const MessagesIdeas = ({ onSelectCard }: Props) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 16 }}>
        {_predefinedMessages.map((message, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectCard(`${message.title}${message.text}`)}
            className="text-white p-3 rounded-lg bg-slate-400"
          >
            <Text className="text-lg font-semibold" >{message.title}</Text>
            <Text>{message.text}</Text>

          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default MessagesIdeas