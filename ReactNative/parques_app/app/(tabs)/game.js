import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import Animated, { FadeInRight, interpolate, interpolateColor, runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withSpring } from 'react-native-reanimated'

//consts
const _avatarSize = 40//because it's the same like h-10
const _spacing = 4
const _stagger = 200

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

  const textStylez = useAnimatedStyle(()=>{
    return {
      opacity : interpolate(_anim.value, [0,0.2,1], [0,0,1])
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
  return (
    <SafeAreaView edges={['top']} className="h-full bg-primary">
      <ScrollView>
        <View className="w-full h-[50vh] flex-row justify-center items-end mt-10 border-2 border-blue-400" style={{ gap: _spacing }}>
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
      </ScrollView>
    </SafeAreaView>
  )
}

export default Game