import { MotiView } from 'moti';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

const abecedary = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
const VISIBLE_LETTERS = 5;

export default function AlphabetCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Limita el índice para no salirte del array
  const canGoUp = startIndex > 0;
  const canGoDown = startIndex + VISIBLE_LETTERS < abecedary.length;

  const visibleLetters = abecedary.slice(startIndex, startIndex + VISIBLE_LETTERS);

  return (
    <View style={{ alignItems: 'center' }}>
      <Pressable
        onPress={() => canGoUp && setStartIndex(startIndex - 1)}
        disabled={!canGoUp}
        style={{
          opacity: canGoUp ? 1 : 0.3,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 24 }}>⬆️</Text>
      </Pressable>

      <Animated.View style={{ gap: 8 }}>
        {visibleLetters.map((letter, idx) => {
          const isSelected = selectedIndex === idx
          return (
            <MotiView
              key={startIndex + idx}
              layout={LinearTransition.springify().damping(80).stiffness(200)}
              animate={{
                backgroundColor: isSelected ? '#dc2626' : '#003366',
                borderRadius: 8,
              }}
              style={{
                marginVertical: 2,
                width: 48,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 8,
              }}
            >
              <Pressable onPress={() => {
                if (selectedIndex === idx) {
                  setSelectedIndex(null);
                } else {
                  setSelectedIndex(idx);
                }
              }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>{letter}</Text>

              </Pressable>
            </MotiView>
          )
        })}
      </Animated.View>

      <Pressable
        onPress={() => canGoDown && setStartIndex(startIndex + 1)}
        disabled={!canGoDown}
        style={{
          opacity: canGoDown ? 1 : 0.3,
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 24 }}>⬇️</Text>
      </Pressable>
    </View>
  );
}