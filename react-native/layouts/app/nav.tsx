import { MotiView } from 'moti';
import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, { FadeInLeft, FadeOutRight, LinearTransition } from 'react-native-reanimated';

export default function Index() {
  const parksID = ['Fotografia', 'Buceo', 'Camping', 'Ciclismo', 'Canotaje', 'Senderismo']
  const [selectedIndex, setSelectedIndex] = useState(null)
  const activeColor = "#fff"
  const inactiveColor = "#ggg"
  const activeBackgroundColor = "#cf613c"
  const inactiveBackgroundColor = "#17301a"

  return (
    <Animated.View className="w-full h-12 flex-row justify-around mb-2">
      {
        parksID.map((park, index) => {
          const isSelected = selectedIndex === index
          return (
            <MotiView
              key={index}
              className=""
              layout={LinearTransition.springify().damping(80).stiffness(200)}
              animate={{
                backgroundColor: isSelected ? activeBackgroundColor : inactiveBackgroundColor,
                borderRadius: 8,
                overflow: 'hidden'
              }}
            >
              <Pressable onPress={() => {
                if (selectedIndex === index) {
                  setSelectedIndex(null);
                } else {
                  setSelectedIndex(index);
                }
              }

              } style={{
              }}
                className="flex-row items-center p-2 "
              >
                <Text>Hola</Text>
                {
                  isSelected &&
                  <Animated.Text
                    className=" justify-center p-2"
                    entering={FadeInLeft.springify().damping(80).stiffness(200)}
                    exiting={FadeOutRight.springify().damping(80).stiffness(200)}
                  >
                    <Text style={{ color: isSelected ? activeColor : inactiveColor }}>{park}</Text>
                  </Animated.Text>
                }
              </Pressable>

            </MotiView>
          )
        })
      }
    </Animated.View>
  )
}
