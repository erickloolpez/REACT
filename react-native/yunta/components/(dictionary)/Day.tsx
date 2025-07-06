import { useState } from "react";
import { Switch, Text, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import DayBlock from "./DayBlock";

interface DayType {
  word: string;
  fetchedRelations?: any[];
}

export default function Day({
  day,
  _color,
  _borderRadius,
  _spacing,
  _damping,
  lastOne,
  weekLength,
  handlePresentModalPress,
  setNewWord,
  setCustomData,
  setOpenModal
}: {
  day: DayType;
  _color: string;
  _borderRadius: number;
  _spacing: number;
  _damping: number;
  lastOne?: number;
  weekLength: number;
  handlePresentModalPress: () => void;
  setNewWord: (newWord: string) => void;
  setCustomData: React.Dispatch<React.SetStateAction<any[]>>;
  setOpenModal: (open: boolean) => void;
}) {
  const [showRelations, setShowRelations] = useState(false);
  const _layout = LinearTransition.springify().damping(_damping);

  return (
    <Animated.View
      layout={_layout}
      style={{
        width: "100%",
        borderWidth: 1,
        borderColor: _color,
        borderRadius: _borderRadius,
        padding: _spacing,
        backgroundColor: showRelations ? _color : "transparent",
        gap: _spacing,
        marginBottom: lastOne !== undefined && lastOne === weekLength - 1 ? 220 : 0,
      }}
    >
      <View className="flex-row items-center justify-between">
        <Text className={`${showRelations ? "text-black" : "text-white"} font-Waku`}>
          {day.word}
        </Text>
        <Switch
          value={showRelations}
          onValueChange={setShowRelations}
          trackColor={{ true: "#F9A620" }}
          style={{ transform: [{ scale: 0.7 }] }}
        />
      </View>

      {showRelations && (
        <DayBlock
          _borderRadius={_borderRadius}
          _damping={_damping}
          _spacing={_spacing}
          day={day}
          handlePresentModalPress={handlePresentModalPress}
          setNewWord={setNewWord}
          setCustomData={setCustomData}
          setOpenModal={setOpenModal}
        />
      )}
    </Animated.View>
  );
}
