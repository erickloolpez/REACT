import { useGlobalContext } from "@/context/GlobalProvider";
import { Plus, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Animated, {
  FadeInDown,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

// Define types
interface Relation {
  title: string;
}

interface DayType {
  name: string;
  word: string;
  relation?: string;
  fetchedRelations: Relation[];
  association_id?: string;
}

interface Props {
  _spacing: number;
  _damping: number;
  _borderRadius: number;
  day: DayType;
  handlePresentModalPress: () => void;
  setNewWord: (word: DayType) => void;
  setCustomData: React.Dispatch<React.SetStateAction<any[]>>;
  setOpenModal?: (open: boolean) => void;
}

export default function DayBlock({
  _spacing,
  _damping,
  _borderRadius,
  day,
  handlePresentModalPress,
  setNewWord,
  setCustomData,
  setOpenModal,
}: Props) {
  const { deleteWord, updateWords, setWordToDelete } = useGlobalContext();

  const [hours] = useState([8]); // está fijo por ahora

  const _entering = FadeInDown.springify().damping(_damping);
  const _exiting = FadeOut.springify().damping(_damping);
  const _layout = LinearTransition.springify().damping(_damping);

  const colors = [
    "#31773C", "#FD7D24", "#4592C4",
    "#719F3F", "#EED535", "#A38C21", "#7B62A3"
  ];


  const handleDelete = () => {
    setWordToDelete({ association_id: day.association_id, word: day.word });
    setOpenModal?.(true);
  };

  const handleEdit = () => {
    setNewWord(day);
    handlePresentModalPress();
  };

  return (
    <Animated.View
      entering={_entering}
      exiting={_exiting}
      layout={_layout}
      style={{ gap: _spacing }}
    >
      {/* TextInput de relación */}
      {hours.map((hour) => (
        <Animated.View
          key={`hour-${hour}`}
          className="flex-row"
          style={{ gap: _spacing, alignItems: "center" }}
          entering={_entering}
          exiting={_exiting}
          layout={_layout}
        >
          <TextInput
            multiline
            editable={false}
            className="flex-1 border border-gray-300 p-2 rounded-lg"
            value={day.relation || ""}
          />
        </Animated.View>
      ))}

      {/* Historias relacionadas */}
      <Text className="font-Waku">Historias en las que esta presente:</Text>
      <View className="flex-row flex-wrap gap-1">
        {
          day.fetchedRelations.length > 0 ? (
            day.fetchedRelations.map((story, index) => (
              <View
                key={`story-${index}`}
                className="p-2 border border-black rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              >
                <Text className="font-Waku text-white">{story.title}</Text>
              </View>
            ))
          ) : (
            <View
              className="p-2 border border-black rounded-full"
            >
              <Text className="font-Waku text-red-400">Ninguna</Text>
            </View>
          )
        }
      </View>

      {/* Botones */}
      <View className="w-full flex-row gap-2 mt-2">
        {/* Botón editar */}
        <Pressable className="flex-1" onPress={handleEdit}>
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
            <Text className="font-Waku text-white" style={{ fontSize: 14 }}>
              Editar Contenido
            </Text>
          </View>
        </Pressable>

        {/* Botón eliminar */}
        <Pressable onPress={handleDelete}>
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
    </Animated.View>
  );
}
