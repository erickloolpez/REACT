import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center align-center bg-blue-400">
      <Text className="text-4xl color-white">Welcome to my "Proyecto de Titulacion"</Text>
      <Link className="text-5xl" href="/movies/uia">👉</Link>
    </View>
  );
}
