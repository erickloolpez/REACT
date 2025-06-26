import { useGlobalContext } from "@/context/GlobalProvider";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Animated, { FadeInDown, FadeOut, LinearTransition } from "react-native-reanimated";

export default function DayBlock({ _spacing, _damping, _borderRadius, day, handlePresentModalPress, setNewWord }: { _spacing: number, _damping: number, _borderRadius: number, day: any, setCustomData: (data: any[]) => void, handlePresentModalPress: () => void, setNewWord?: (newWord: string) => void }) {
  const { deleteWord, updateWords } = useGlobalContext();
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
          <TextInput
            multiline
            editable={false}
            className="flex-1 border border-gray-300 p-2 rounded-lg  "
            value={day.relation}
          />
        </Animated.View>
      ))
      }
      <Text className="font-Waku">Historias</Text>
      <View className="flex-row gap-1">
        {
          day.fetchedRelations.map((story: any, index: number) => (
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
      <View className="w-full flex-row gap-2">
        <Pressable
          className="flex-1"
          onPress={() => {
            setNewWord(day)
            handlePresentModalPress()
            // if (hours.length === 0) {
            //   setHours([_startHour]);
            //   return;
            // }
            // setHours((prev) => [...prev, prev[prev.length - 1] + 1]);
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
            <Text className="font-Waku" style={{ fontSize: 14, color: "#fff" }}>Editar Contenido</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            console.log(day)
            deleteWord(day.name)
            axios.delete(`http://192.168.100.10:3003/associations/${day.association_id}`)
              .then(response => {
                console.log('Asociacion eliminada correctamente ✅');
                updateWords()
                Alert.alert('Éxito', 'Cambios guardados correctamente');
                // setUser(response.data);
              })
              .catch(err => {
                console.log('Error eliminando palabra:', err);
              });
          }}
        >
          <View
            style={{
              width: 40,
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
            <Trash2 size={18} color="#fff" />
          </View>
        </Pressable>

      </View>
    </Animated.View >
  )
}