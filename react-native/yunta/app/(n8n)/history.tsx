import { TikTokMessages } from '@/components/(n8n)/TikTokMessage';
import { ChatItem, generateMessage } from "@/constants/chat";
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';

const chatSpeed = {
  slow: [1000, 500],
  medium: [500, 550],
  fast: [250, 250],
  "insane 🚀": [50, 100]
}

const History = () => {
  const [messages, setMessages] = useState<ChatItem[]>(
    [...Array(10).keys()].map(generateMessage)
  )

  const timeout = useRef<NodeJS.Timeout | null>(null)

  const [speed, setSpeed] = useState<keyof typeof chatSpeed>('slow')

  const generateData = () => {
    clearTimeout(timeout.current)
    const selectedSpeed = chatSpeed[speed]
    const timer = Math.random() * selectedSpeed[0] + selectedSpeed[1]

    timeout.current = setTimeout(() => {
      setMessages((data) => {
        return [generateMessage(), ...data]
      })
      generateData()
    }, timer)
  }

  useEffect(() => {
    generateData()
  }, [speed])
  return (
    <View className="flex-1 items-center justify-center">
      <TikTokMessages
        data={messages}
        renderItem={({ item }) => (
          <View className="gap-2 items-start p-4 rounded-lg">
            <View className="flex-row gap-4 justify-end items-center">
              <Image
                source={{ uri: item.user.avatar }}
                className="w-10 h-10 rounded-full aspect-[1]"
              />
              <Text>{item.user.name}</Text>
            </View>
            <View
              className="bg-[#ddd] p-4 rounded-md"
            >
              <Text>{item.description}</Text>
            </View>
          </View>
        )}
      />
      <View
        style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}
      >
        <SegmentedControl
          values={Object.keys(chatSpeed)}
          style={{ width: 300 }}
          selectedIndex={Object.keys(chatSpeed).indexOf(speed)}
          onChange={(e) => {
            setSpeed(e.nativeEvent.value as keyof typeof chatSpeed)
          }}
        />

      </View>
    </View>
  )
}

export default History