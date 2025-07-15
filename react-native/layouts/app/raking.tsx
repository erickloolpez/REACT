import React from 'react'
import { View } from 'react-native'
import Animated, { FadeInRight, interpolate, runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withSpring } from 'react-native-reanimated'

const users = [
  { name: 'User 1', score: 100 },
  { name: 'User 2', score: 90 },
  { name: 'User 3', score: 80 },
  { name: 'User 4', score: 70 },
  { name: 'User 5', score: 60 },
]

const _avatarSize = 28
const _spacing = 4
const _stagger = 50

type PlaceProps = {
  user: typeof users[0]
  index: number
  onFinish?: () => void
  anim?: Animated.SharedValue<number>
}

function Place({ user, index, onFinish, anim }: PlaceProps) {
  const _anim = useDerivedValue(() => {
    return withDelay(_stagger * index, withSpring(anim.value, {
      damping: 80,
      stiffness: 200
    }))
  })

  const stylez = useAnimatedStyle(() => {
    return {
      height: interpolate(_anim.value, [0, 1], [_avatarSize, Math.max(user.score * 3, _avatarSize)]),
    }
  })
  return (
    <Animated.View
      entering={FadeInRight.delay(index * _stagger).springify().damping(80).stiffness(200).withCallback(finished => {
        if (finished && onFinish) {
          runOnJS(onFinish)()
        }
      })}
    >
      <Animated.View
        style={[{
          backgroundColor: 'gold',
          width: _avatarSize,
          height: _avatarSize,
        }, stylez]}
      >
        <View style={{
          width: _avatarSize,
          aspectRatio: 1,
        }}>
          <View
            style={{
              flex: 1,
              borderRadius: _avatarSize,
              backgroundColor: "#ccc"
            }}
          />
        </View>
      </Animated.View>
    </Animated.View >
  )
}

const Ranking = () => {
  const _anim = useSharedValue(0)
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View style={{
        flexDirection: 'row',
        gap: _spacing,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: 200,
        backgroundColor: 'red'
      }}>
        {
          users.map((user, index) => (
            <Place
              key={index}
              user={user}
              index={index}
              anim={_anim}
              onFinish={index === users.length - 1 ? () => {
                _anim.value = 1
                console.log('has finished', index)
              } : null}
            />
          ))
        }

      </View>
    </View>
  )
}

export default Ranking