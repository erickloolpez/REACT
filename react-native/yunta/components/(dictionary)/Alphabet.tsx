import { useGlobalContext } from '@/context/GlobalProvider'
import { ArrowDown, ArrowUp } from 'lucide-react-native'
import { MotiView } from 'moti'
import { useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { LinearTransition } from 'react-native-reanimated'

const lettersToNice = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

const fontSize = 40
const _staggerCounter = 50
const JUMP = 6 // salto de 9 posiciones

function Tick({ children, setSelectedIndex, selectedIndex, index, setCustomData }: { children: string, setSelectedIndex: (index: number) => void, selectedIndex: number | null, index: number, setCustomData: (data: any[]) => void }) {
  // MotiView para animar el fondo
  const { words } = useGlobalContext()
  const isSelected = selectedIndex === index
  return (
    <MotiView
      layout={LinearTransition.springify().damping(80).stiffness(200)}
      animate={{
        backgroundColor: isSelected ? '#dc2626' : 'transparent',
      }}
      style={{ marginBottom: 10, borderRadius: 10 }}
    >
      <Pressable
        onPress={() => {
          if (selectedIndex === index) {
            setSelectedIndex(null);
          } else {
            setSelectedIndex(index);
            const letter = lettersToNice[index]
            const newWords = words.filter((word) => word.name.charAt(0).toUpperCase() === letter);
            setCustomData(newWords)
          }
        }
        }
      >
        <Text className="font-BlockHead" style={{ fontSize: fontSize - 10, lineHeight: fontSize * 1.1, textAlign: 'center', fontVariant: ['tabular-nums'], color: 'white' }}>
          {children}
        </Text>
      </Pressable>
    </MotiView>
  )
}

function TickerList({ index, setSelectedIndex, selectedIndex, setCustomData }: { index: number, setSelectedIndex: (index: number) => void, selectedIndex: number | null, setCustomData: (data: any[]) => void }) {
  return (
    <View
      style={{ height: fontSize, width: fontSize }}
    >
      <MotiView
        animate={{
          translateY: -fontSize * 1.12 * index,
        }}
        transition={{
          delay: _staggerCounter,
          damping: 80,
          stiffness: 200
        }}
      >
        {
          lettersToNice.map((letter, idx) => {
            return <Tick key={`letter-${letter}-${idx}`} index={idx} setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} setCustomData={setCustomData} >{letter}</Tick>
          })
        }
      </MotiView>
    </View>
  )
}

export default function Alphabet({ setCustomData }: { setCustomData: (data: any[]) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Función para avanzar 9 posiciones
  const handleNext = () => {
    setCurrentIndex(prev => {
      const next = prev + JUMP
      return next <= lettersToNice.length + 4 ? next : prev // no pasar del final
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
    <View className="w-14 h-[400px] flex-col items-center justify-start">
      <TouchableOpacity onPress={handlePrev}>
        <View className="w-10 h-10 mb-3 bg-[#003366] rounded-full flex-row items-center justify-center">
          <ArrowUp size={30} color="white" />
        </View>
      </TouchableOpacity>
      <View
        className="w-full h-[280px] items-center justify-start p-3"
        style={{ overflow: 'hidden' }}
      >
        <TickerList setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} index={currentIndex} setCustomData={setCustomData} />
      </View>
      <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
        <TouchableOpacity onPress={handleNext}>
          <View className="w-10 h-10  bg-[#003366] rounded-full flex-row items-center justify-center">
            <ArrowDown size={30} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}