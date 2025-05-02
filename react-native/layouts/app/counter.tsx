import { MotiView } from 'moti'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const numberToNice = [...Array(10).keys()] //[0,1,2,3,4,5,6,7,8,9]
const fontSize = 40
const _staggerCounter = 50

function Tick({ children }) {
  return (
    <Text style={{ fontSize: fontSize, lineHeight: fontSize * 1.1, fontVariant: ['tabular-nums'], color: 'white' }}>
      {children}
    </Text>
  )
}

function TickerList({ number, index }) {
  return (
    <View style={{ height: fontSize, overflow: 'hidden' }}>
      <MotiView
        animate={{
          translateY: -fontSize * 1.1 * number
        }}
        transition={{
          delay: index * _staggerCounter,
          damping: 80,
          stiffness: 200
        }}
      >
        {
          numberToNice.map((num, index) => {
            return <Tick key={`number-${num}-${index}`} >{num}</Tick>
          })
        }
      </MotiView>
    </View>
  )
}

export default function Counter() {
  const [randomNumber, setRandomNumber] = useState(500)
  const splittedRandomNumber = randomNumber.toString().split('')

  return (
    <View className="w-full h-full flex-col mt-4 items-center justify-around">
      <View className="w-[55%] h-44  items-center justify-center bg-[#cf613c] rounded-2xl">
        <View className="flex-row">
          {
            splittedRandomNumber.map((number, index) => (
              <TickerList key={index} number={number} index={index} />
            ))
          }
        </View>
        <TouchableOpacity onPress={() => {
          setRandomNumber(Math.floor(Math.random() * 1000))
        }}>
          <View className="w-32 h-10 bg-green-900 rounded-xl flex-row items-center justify-center">
            <Text className="text-xl ml-3 text-white">Random</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  )
}
