import { Plus } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Animated, { FadeInDown, FadeOut, LinearTransition } from "react-native-reanimated";

export default function DayBlock({ _spacing, _damping, _borderRadius, day }: { _spacing: number, _damping: number, _borderRadius: number, day: any }) {
  const _entering = FadeInDown.springify().damping(_damping);
  const _exiting = FadeOut.springify().damping(_damping)
  const _layout = LinearTransition.springify().damping(_damping);
  const _startHour = 8;

  const [hours, setHours] = useState([_startHour])
  const AnimatedPressionable = Animated.createAnimatedComponent(Pressable);

  const colors = ["#31773C", "#FD7D24", "#4592C4", "#719F3F", "#EED535", "#A38C21", "#7B62A3"]

  return (
    <Animated.View
      entering={_entering}
      exiting={_exiting}
      layout={_layout}
      style={{
        gap: _spacing,
      }}
    >
      {hours.map((hour) => (
        <Animated.View
          key={`hour-${hour}`}
          className="flex-row"
          style={{
            gap: _spacing,
            alignItems: 'center'
          }}
          entering={_entering}
          exiting={_exiting}
          layout={_layout}
        >
          {/* <Text className="font-Waku">From:</Text>
          <HourBlock block={hour} _borderRadius={_borderRadius} _color={_color} _damping={_damping} _spacing={_spacing} />
          <Text className="font-Waku">To:</Text>
          <HourBlock block={hour} _borderRadius={_borderRadius} _color={_color} _damping={_damping} _spacing={_spacing} /> */}
          <TextInput
            className="flex-1 border border-gray-300 p-2 rounded-lg "
            value={day.relation}
          />
          {/* <AnimatedPressionable
            layout={_layout}
            onPress={() => {
              console.log("Remove hour: ", hour);
              setHours((prev) => [...prev.filter((k) => k !== hour)]);
            }}
          >
            <View
              style={{
                backgroundColor: "#003366",
                height: 24,
                aspectRatio: 1,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
              }}
            >
              <X size={14} color="#fff" />
            </View>
          </AnimatedPressionable> */}
        </Animated.View>
      ))
      }
      <Text className="font-Waku">Historias</Text>
      <View className="flex-row gap-1">
        {
          day.stories.map((story: any, index: number) => (
            <View
              className="p-2 border border-black rounded-full "
              style={{ backgroundColor: colors[index % colors.length] }}
              key={`story-${index}`}
            >
              <Text className="font-Waku text-white">{story.title}</Text>
            </View>
          ))
        }
      </View>
      <Pressable
        onPress={() => {
          if (hours.length === 0) {
            setHours([_startHour]);
            return;
          }
          setHours((prev) => [...prev, prev[prev.length - 1] + 1]);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: _spacing / 2,
            padding: _spacing,
            borderRadius: _borderRadius - _spacing / 2,
            backgroundColor: "#003366",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: _spacing / 2,
          }}
        >
          <Plus size={18} color="#fff" />
          <Text className="font-Waku" style={{ fontSize: 14, color: "#fff" }}>Add more</Text>
        </View>
      </Pressable>
    </Animated.View >
  )
}