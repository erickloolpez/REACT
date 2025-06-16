import { Text, View } from "react-native";

export default function HourBlock({ block, _color, _borderRadius, _spacing, _damping }: { block: number, _color: string, _borderRadius: number, _spacing: number, _damping: number }) {

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
      <Text className="font-Waku">
        {block > 9 ? block : `0${block}`}:00{" "}
        {block > 11 && block < 24 ? "PM" : "AM"}
      </Text>
    </View>
  );
}