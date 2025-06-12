import { Plus, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOut, LinearTransition } from 'react-native-reanimated';

const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const _spacing = 10;
const _color = "#ececec";
const _borderRadius = 16;
const _startHour = 8;
const _damping = 14;
const _entering = FadeInDown.springify().damping(_damping);
const _exiting = FadeOut.springify().damping(_damping)
const _layout = LinearTransition.springify().damping(_damping);
const AnimatedPressionable = Animated.createAnimatedComponent(Pressable);

function HourBlock({ block }: { block: number }) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: _color,
        borderRadius: _borderRadius - _spacing,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: _spacing / 4,
      }}
    >
      <Text>
        {block > 9 ? block : `0${block}`}:00{" "}
        {block > 11 && block < 24 ? "PM" : "AM"}
      </Text>
    </View>
  );
}

function DayBlock() {
  const [hours, setHours] = useState([_startHour])
  return (
    <Animated.View
      entering={_entering}
      exiting={_exiting}
      layout={_layout}
      style={{
        gap: _spacing
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
          <Text>From:</Text>
          <HourBlock block={hour} />
          <Text>To:</Text>
          <HourBlock block={hour} />
          <AnimatedPressionable
            layout={_layout}
            onPress={() => {
              console.log("Remove hour: ", hour);
              setHours((prev) => [...prev.filter((k) => k !== hour)]);
            }}
          >
            <View
              style={{
                backgroundColor: "black",
                height: 24,
                aspectRatio: 1,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: _borderRadius - _spacing,
              }}
            >
              <X size={14} color="#fff" />
            </View>
          </AnimatedPressionable>
        </Animated.View>
      ))
      }
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
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: _spacing / 2,
          }}
        >
          <Plus size={18} color="#fff" />
          <Text style={{ fontSize: 14, color: "#fff" }}>Add more</Text>
        </View>
      </Pressable>
    </Animated.View >
  )
}

function Day({ day }: { day: typeof weekDays[number] }) {
  const [isOn, setIsOn] = React.useState(false);
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
        className="flex-row items-center justify-between"
      >
        <Text className={`${isOn ? 'text-black' : 'text-white'}`}>{day}</Text>
        <Switch
          value={isOn}
          onValueChange={(value) => setIsOn(value)}
          trackColor={{ true: "#666" }}
          style={{
            transformOrigin: ["100%", "50%", 0],//x, y, z
            transform: [{
              scale: 0.7
            }
            ]
          }}
        />
      </View>
      {isOn && <DayBlock />}
    </Animated.View>
  )
}


const Horaries = () => {
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{
        padding: _spacing,
        gap: _spacing,
      }}
    >
      {weekDays.map((day) => (
        <Day
          day={day}
          key={`day-${day}`}
        />
      ))}
    </View>
  )
}

export default Horaries