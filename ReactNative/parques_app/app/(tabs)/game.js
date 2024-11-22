import { View, Text, ScrollView, Image, Button, Modal, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { FadeInRight, interpolate, interpolateColor, runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withSpring } from 'react-native-reanimated'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGem, faTrophy } from '@fortawesome/free-solid-svg-icons'


import { images } from '../../constants'
import ModalGame from '../../components/game/modal'
import CardCounter from '../../components/game/card'

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

  function renderModal() {
    return (
      <ModalGame openModal={openModal} setOpenModal={setOpenModal} />
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

        <CardCounter setOpenModal={setOpenModal} />
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