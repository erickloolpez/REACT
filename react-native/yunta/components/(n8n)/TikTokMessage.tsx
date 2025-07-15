import React from 'react'
import { FlatListProps, ListRenderItem } from 'react-native'
import Animated, { FadeInDown, LinearTransition, useAnimatedStyle, useDerivedValue, withSpring } from 'react-native-reanimated'

type TikTokMessageProps<T> = FlatListProps<T> & {
  renderItem: ListRenderItem<T>
}

function AnimatedItem({ index, children }: { index: number, children: React.ReactNode }) {
  const newIndex = useDerivedValue(() => {
    return withSpring(index, { damping: 80, stiffness: 200 })
  })

  const stylez = useAnimatedStyle(() => {
    return {
      // opacity: interpolate(newIndex.value, [0, 1], [1, 1 - 1 / MAX_MESSAGES])
    }
  })
  return (
    <Animated.View
      entering={FadeInDown.springify().damping(80).stiffness(200).withInitialValues({
        opacity: 0,
        transform: [{ translateY: 100 }]
      })}
    >
      <Animated.View
        style={stylez}
      >
        {children}
      </Animated.View>
    </Animated.View>
  )
}

export function TikTokMessages<T>({ renderItem, ...rest }: TikTokMessageProps<T>) {
  return (
    <Animated.FlatList
      {...rest}
      itemLayoutAnimation={LinearTransition.springify().damping(80).stiffness(200)}
      inverted
      renderItem={props => {
        return (
          <AnimatedItem index={props.index}>
            {renderItem(props)}
          </AnimatedItem>
        )
      }}
    />

  )
}