// components/(dictionary)/Alphabet.tsx
import { ArrowDown, ArrowUp } from 'lucide-react-native';
import { MotiView } from 'moti';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';

const lettersToNice = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

const fontSize = 40;
const JUMP = 6;
const _staggerCounter = 50

/* ──────────────────────────  Tick  ────────────────────────── */
type TickProps = {
  index: number;
  selectedIndex: number | null;
  setSelectedIndex: (i: number | null) => void;
  setLetter: (l: string) => void;
};

function Tick({
  index,
  selectedIndex,
  setSelectedIndex,
  setLetter,
}: TickProps) {
  const isSelected = selectedIndex === index;

  const handlePress = useCallback(() => {
    if (isSelected) {
      // Permite “deseleccionar” si quiere
      setSelectedIndex(null);
      return;
    }

    setSelectedIndex(index);                        // para la animación
    setLetter(lettersToNice[index].toLowerCase());  // avisa al padre
  }, [isSelected, index, setSelectedIndex, setLetter]);

  return (
    <MotiView
      layout={LinearTransition.springify().damping(80).stiffness(200)}
      animate={{ backgroundColor: isSelected ? '#dc2626' : 'transparent' }}
      style={{ marginBottom: 10, borderRadius: 10 }}
    >
      <Pressable onPress={handlePress}>
        <Text
          className="font-BlockHead"
          style={{
            fontSize: fontSize - 10,
            lineHeight: fontSize * 1.1,
            textAlign: 'center',
            color: 'white',
          }}
        >
          {lettersToNice[index]}
        </Text>
      </Pressable>
    </MotiView>
  );
}

/* ────────────────────────  TickerList  ─────────────────────── */
type TickerListProps = {
  scrollIndex: number;
  selectedIndex: number | null;
  setSelectedIndex: (i: number | null) => void;
  setLetter: (l: string) => void;
};

function TickerList({
  scrollIndex,
  selectedIndex,
  setSelectedIndex,
  setLetter,
}: TickerListProps) {
  return (
    <View style={{ height: fontSize, width: fontSize }}>
      <MotiView
        animate={{
          translateY: -fontSize * 1.12 * scrollIndex,
        }}
        transition={{
          delay: _staggerCounter,
          damping: 80,
          stiffness: 200
        }}
      >
        {lettersToNice.map((_, idx) => (
          <Tick
            key={`letter-${idx}`}
            index={idx}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            setLetter={setLetter}
          />
        ))}
      </MotiView>
    </View>
  );
}

/* ─────────────────────────  Alphabet  ───────────────────────── */
type AlphabetProps = {
  letter: string;                    // letra actual que viene de Dictionary
  setLetter: (l: string) => void;    // setter que viene de Dictionary
};

export default function Alphabet({ letter, setLetter }: AlphabetProps) {
  /* Índice actual para el scroll (A‑Z en saltos) */
  const [currentIndex, setCurrentIndex] = useState(0);

  /* Índice de la letra seleccionada para resaltar */
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  /* Mantener seleccionado actualizado si cambia letra desde afuera */
  useEffect(() => {
    const idx = lettersToNice.findIndex(
      (l) => l.toLowerCase() === letter.toLowerCase()
    );
    setSelectedIndex(idx);
  }, [letter]);

  /* Botones ↑↓ para avanzar o retroceder 6 posiciones */
  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(prev + JUMP, lettersToNice.length - 1));

  const handlePrev = () =>
    setCurrentIndex((prev) => Math.max(prev - JUMP, 0));

  return (
    <View className="w-14 h-[400px] items-center">
      {/* Flecha arriba */}
      <TouchableOpacity onPress={handlePrev}>
        <View className="w-10 h-10 mb-3 bg-[#003366] rounded-full items-center justify-center">
          <ArrowUp size={30} color="white" />
        </View>
      </TouchableOpacity>

      {/* Lista de letras */}
      <View className="w-full h-[280px] p-3" style={{ overflow: 'hidden' }}>
        <TickerList
          scrollIndex={currentIndex}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setLetter={setLetter}
        />
      </View>

      {/* Flecha abajo */}
      <TouchableOpacity onPress={handleNext} style={{ marginTop: 10 }}>
        <View className="w-10 h-10 bg-[#003366] rounded-full items-center justify-center">
          <ArrowDown size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
