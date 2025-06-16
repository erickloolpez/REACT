import { useState } from "react";
import { Switch, Text, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import DayBlock from "./DayBlock";


export default function Day({ day, _color, _borderRadius, _spacing, _damping }: { day: any, _color: string, _borderRadius: number, _spacing: number, _damping: number }) {
  const [isOn, setIsOn] = useState(false);
  const _layout = LinearTransition.springify().damping(_damping);
  return (
    <Animated.View
      style={{
        width: "100%",
        borderWidth: 1,
        borderColor: _color,
        borderRadius: _borderRadius,
        padding: _spacing,
        backgroundColor: isOn ? _color : "transparent",
        gap: _spacing,
      }}
      layout={_layout}
    >

      <View
        className="flex-row  items-center justify-between"
      >
        <Text className={`${isOn ? 'text-black' : 'text-white'} font-Waku`}>{day}</Text>
        <Switch
          value={isOn}
          onValueChange={(value) => setIsOn(value)}
          trackColor={{ true: "#F9A620" }}
          style={{
            transformOrigin: ["100%", "50%", 0],//x, y, z
            transform: [{
              scale: 0.7
            }
            ]
          }}
        />
      </View>
      {isOn && <DayBlock _borderRadius={_borderRadius} _damping={_damping} _spacing={_spacing} _color={_color} />}
    </Animated.View>
  )
}