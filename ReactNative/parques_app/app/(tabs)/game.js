import { View, Text, ScrollView, Image, Button, Modal, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import Animated, { FadeInRight, interpolate, interpolateColor, runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withSpring } from 'react-native-reanimated'
import { MotiView } from 'moti'
import { useState } from 'react'
import { PuzzleIcon } from 'hugeicons-react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleXmark, faGem, faTrophy } from '@fortawesome/free-solid-svg-icons'

//consts
const _avatarSize = 40//because it's the same like h-10
const _spacing = 4
const _stagger = 150

function Place({ user, index, onFinish, anim }) {

  const _anim = useDerivedValue(() => {
    return withDelay(_stagger * index, withSpring(anim.value, {
      damping: 80,
      stiffness: 200
    }))
  })

  const stylez = useAnimatedStyle(() => {
    return {
      // height: user.score * 3 * _anim.value
      height: interpolate(_anim.value, [0, 1], [_avatarSize, Math.max(user.score * 3, _avatarSize + _spacing)]),
      backgroundColor: index === 5 ?
        interpolateColor(
          _anim.value,
          [0, 1],
          ["rgba(0,0,0,0.1)", "gold"]
        )
        : "rgba(0,0,0,0.1)"
    }
  })

  const textStylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(_anim.value, [0, 0.2, 1], [0, 0, 1])
    }
  })

  return (
    <Animated.View
      className="items-center"
      entering={FadeInRight.delay(_stagger * index).springify().damping(80).stiffness(200).withCallback(finished => {
        if (finished && onFinish) {
          runOnJS(onFinish)()
        }
      })}
    >
      <Animated.Text style={textStylez}>{user.score}</Animated.Text>
      <Animated.View
        className="w-10 h-10 items-center" //We need to pay attention for the size of the Image below
        style={[{ backgroundColor: "rgba(0,0,0,0.1)", borderRadius: _avatarSize }, stylez]}
      >
        <Image source={images.avatar} className="w-10 h-10 rounded-full" resizeMode="cover" />
      </Animated.View>
    </Animated.View>
  )
}

const numberToNice = [...Array(10).keys()] //[0,1,2,3,4,5,6,7,8,9]
const fontSize = 40
const _staggerCounter = 50

function Tick({ children, ...rest }) {
  return (
    <Text {...rest}>
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
            return <Tick key={`number-${num}-${index}`} style={{ fontSize: fontSize, lineHeight: fontSize * 1.1, fontVariant: ['tabular-nums'] }}>{num}</Tick>
          })
        }
      </MotiView>
    </View>
  )
}

const Game = () => {
  const [openModal, setOpenModal] = useState(false)
  const [value, setValue] = useState(12351)
  const _anim = useSharedValue(0)
  const users = [
    { name: "Maria", score: 12 },
    { name: "Juana", score: 22 },
    { name: "Pascal", score: 32 },
    { name: "Neo", score: 42 },
    { name: "Abigail", score: 10 },
    { name: "Pedro", score: 62 },
    { name: "Jonh", score: 36 },
  ]
  const splittedValue = value.toString().split('')

  function renderModal() {
    return (
      <Modal visible={openModal} animationType='slide' transparent={true}>
        <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View className="bg-white w-[90%] h-[70%] rounded-lg relative p-2 justify-center ">
            <TouchableOpacity onPress={() => setOpenModal(false)} className="absolute top-3 right-2 bg-white rounded-full z-10">
              <FontAwesomeIcon icon={faCircleXmark} color='red' size={32} />
            </TouchableOpacity>
            <View className="w-full h-[15vh] bg-green-200">
              <Text className="text-3xl">Explorando Ecuador: ¿Listo para la pregunta?</Text>
            </View>
            <View>
              <Text>* Cual es el parque nacional mas grande del Ecuador?</Text>
            </View>
          </View>
        </View>

      </Modal>
    )
  }

  return (
    <SafeAreaView edges={['top']} className="h-full bg-primary">
      <ScrollView>
        <View className="w-full h-[10vh] items-center justify-between flex-row">
          <View className="flex-row">
            <Text className="text-2xl font-bold text-terciary">Premios y Campeones</Text>
            <View className="items-center ml-2 rotate-12 ">
              <FontAwesomeIcon icon={faTrophy} color='#eab308' size={28} />
            </View>
          </View>
          <View className="flex-row bg-white items-center justify-around border-2 rounded-full p-2 mr-1">
            <FontAwesomeIcon icon={faGem} color='#93c5fd' size={28} />
            <Text className="ml-2">120</Text>
          </View>
        </View>

        <View className="w-full h-[30vh] flex-row justify-center items-end" style={{ gap: _spacing }}>
          {
            users.map((user, index) => (
              <Place
                key={index}
                user={user}
                index={index}
                anim={_anim}
                onFinish={
                  index === users.length - 1 ?
                    () => {
                      _anim.value = 1
                      console.log('has finished', index)
                    }
                    : null}
              />
            ))
          }
        </View>

        <View className="w-full h-[25vh] mt-10 items-center flex-row border-b-2">
          <View className="w-1/2 h-full justify-around pl-2 border-r-2">
            <Text className="text-xl text-green-900 font-medium">Miercoles</Text>
            <Text className="text-7xl font-bold text-green-900">25</Text>
            <Text className="text-5xl font-light text-green-900">ENERO</Text>
          </View>
          <View className="w-1/2 h-full  items-center justify-around">
            <View>
              <Text className="text-green-900">¿Que tanto conoces los parques nacionales?</Text>
            </View>
            <View className="flex-row">
              {
                splittedValue.map((number, index) => {
                  if (index === 2) {
                    return <Text className="text-4xl">:</Text>
                  } else {
                    return <TickerList key={index} number={number} index={index} />
                  }
                })
              }
            </View>
            <TouchableOpacity onPress={()=> setOpenModal(true)}>
              <View className="w-32 h-10 bg-green-900 rounded-xl flex-row items-center justify-center">
                <PuzzleIcon
                  size={32}
                  color={"#fff"}
                  variant={"stroke"}
                />
                <Text className="text-xl ml-3 text-white">Jugar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title="Random Value"
          onPress={() => setValue(Math.floor(Math.random() * 100000))}
        />
        {
          renderModal()
        }

      </ScrollView>
    </SafeAreaView>
  )
}

export default Game