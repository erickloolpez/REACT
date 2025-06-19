import { MotiView } from 'moti'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const lettersToNice = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

const fontSize = 40
const _staggerCounter = 50
const JUMP = 9 // salto de 9 posiciones

function Tick({ children }) {
  return (
    <Text style={{ fontSize: fontSize, lineHeight: fontSize * 1.1, fontVariant: ['tabular-nums'], color: 'white' }}>
      {children}
    </Text>
  )
}

function TickerList({ index }) {
  return (
    <View style={{ height: fontSize }}>
      <MotiView
        animate={{
          translateY: -fontSize * 1.1 * index
        }}
        transition={{
          delay: _staggerCounter,
          damping: 80,
          stiffness: 200
        }}
      >
        {
          lettersToNice.map((letter, idx) => {
            return <Tick key={`letter-${letter}-${idx}`} >{letter}</Tick>
          })
        }
      </MotiView>
    </View>
  )
}

export default function Counter() {
  const [currentIndex, setCurrentIndex] = useState(4)

  // Función para avanzar 9 posiciones
  const handleNext = () => {
    setCurrentIndex(prev => {
      const next = prev + JUMP
      return next < lettersToNice.length ? next : prev // no pasar del final
    })
  }

  // Función para retroceder 9 posiciones
  const handlePrev = () => {
    setCurrentIndex(prev => {
      const next = prev - JUMP
      return next >= 0 ? next : prev // no pasar del inicio
    })
  }

  return (
    <View className="w-14 h-44 bg-green-400 flex-col  items-center justify-around">
      <View
        className="w-full h-[400px] items-center justify-center bg-[#cf613c] rounded-2xl"
        style={{ overflow: 'hidden' }}
      >
        <TickerList index={currentIndex} />
      </View>
      <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
        <TouchableOpacity onPress={handlePrev}>
          <View className="w-16 h-10 bg-green-900 rounded-xl flex-row items-center justify-center">
            <Text className="text-xl text-white">Prev</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <View className="w-16 h-10 bg-green-900 rounded-xl flex-row items-center justify-center">
            <Text className="text-xl text-white">Next</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}