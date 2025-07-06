import { useGlobalContext } from '@/context/GlobalProvider';
import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import axios from 'axios';
import { XIcon } from 'lucide-react-native';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ModalFeedBackProps {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  comment?: { text: string; rating: number };
  newWord?: any;
  setNewWord?: (word: any | null) => void;
  setCustomData: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function ModalFeedBack({
  bottomSheetModalRef,
  comment,
  newWord,
  setNewWord,
  setCustomData
}: ModalFeedBackProps) {
  const { addWord, updateWords } = useGlobalContext();

  const snapPoints = useMemo(() => ['45%'], []);
  const [relationText, setRelationText] = useState('');
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [buttonText, setButtonText] = useState<'Guardar' | 'Listo'>('Guardar');

  const nameRef = useRef(null);
  const relationRef = useRef(null);

  // Actualiza el valor del input cuando se edita una palabra existente
  useEffect(() => {
    if (newWord) {
      setRelationText(newWord.relation || '');
    } else {
      setRelationText('');
      setName('');
      setRelation('');
    }
  }, [newWord]);

  const handleClose = () => {
    bottomSheetModalRef.current?.close();
  };

  const handleConfirm = () => {
    if (buttonText === 'Listo') {
      Keyboard.dismiss();
      bottomSheetModalRef.current?.snapToIndex(1);
      setButtonText('Guardar');
      return;
    }

    // ✏️ Si estamos editando una palabra ya existente
    if (newWord && relationText) {
      axios
        .put(`http://192.168.100.10:3003/associations/${newWord.association_id}`, {
          relation: relationText,
        })
        .then(() => {
          updateWords();
          setCustomData((prev) =>
            prev.map((group) =>
              group.letter === newWord.word.charAt(0).toLowerCase()
                ? {
                  ...group,
                  data: group.data.map((item) =>
                    item.word === newWord.word
                      ? { ...item, relation: relationText }
                      : item
                  ),
                }
                : group
            )
          );
          Alert.alert('✅ Éxito', 'Cambios guardados correctamente');
          setNewWord?.(null);
          handleClose();
        })
        .catch((err) => {
          console.error('Error guardando cambios:', err);
        });
      return;
    }

    // 🆕 Si estamos creando una palabra nueva
    if (name && relation) {
      const form = {
        word: name,
        relation,
      };

      addWord(form).then((newWord) => {
        if (!newWord) return;

        const firstLetter = name.charAt(0).toLowerCase();

        setCustomData((prev) => {
          const exists = prev.find((group) => group.letter === firstLetter);
          if (exists) {
            return prev.map((group) =>
              group.letter === firstLetter
                ? {
                  ...group,
                  data: [...group.data, { ...newWord, fetchedRelations: [] }],
                }
                : group
            );
          } else {
            return [
              ...prev,
              {
                letter: firstLetter,
                data: [{ ...newWord, fetchedRelations: [] }],
              },
            ];
          }
        });

        setName('');
        setRelation('');
        handleClose();
        Alert.alert('✅ Éxito', 'Palabra creada correctamente');
      });
    }
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      index={1}
      enablePanDownToClose
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
    >
      <BottomSheetView className="px-4">
        <View className="w-full items-center">
          {!newWord ? (
            <View className="w-full">
              {/* Header */}
              <View className="w-full flex-row justify-between items-center">
                <Text className="font-BlockHead">Crea una nueva palabra</Text>
                <Pressable
                  className="w-10 h-10 bg-gray-300 rounded-full items-center justify-center"
                  onPress={handleClose}
                >
                  <XIcon size={24} color="black" />
                </Pressable>
              </View>

              {/* Formulario */}
              <View className="w-full mt-4">
                <Text className="font-Waku text-gray-500">Nombre</Text>
                <BottomSheetTextInput
                  ref={nameRef}
                  value={name}
                  onChangeText={setName}
                  className="font-Waku"
                  style={inputStyle}
                  placeholder="Escribe un nombre..."
                  placeholderTextColor="gray"
                  onSubmitEditing={() => { }}
                />

                <Text className="font-Waku text-gray-500 mt-4">Asociación</Text>
                <BottomSheetTextInput
                  ref={relationRef}
                  value={relation}
                  onChangeText={setRelation}
                  className="font-Waku"
                  style={inputStyle}
                  placeholder="Escribe una asociación..."
                  placeholderTextColor="gray"
                  onSubmitEditing={() => { }}
                />
              </View>
            </View>
          ) : (
            // Si se está editando una palabra
            <View className="p-2 w-full">
              <View className="w-full flex-row justify-between items-center mb-4">
                <Text className="font-BlockHead w-3/4">
                  Edita el contenido de tu asociación
                </Text>
                <Pressable
                  className="w-10 h-10 bg-gray-300 rounded-full items-center justify-center"
                  onPress={() => {
                    setNewWord?.(null);
                    handleClose();
                  }}
                >
                  <XIcon size={24} color="black" />
                </Pressable>
              </View>

              <BottomSheetTextInput
                className="p-2 border border-gray-800 rounded-lg"
                multiline
                value={relationText}
                onFocus={() => setButtonText('Listo')}
                onChangeText={setRelationText}
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>
          )}

          {/* Botón Guardar/Listo */}
          <TouchableOpacity
            className="w-full h-14 justify-center items-center bg-[#003366] rounded-lg mt-10"
            onPress={handleConfirm}
          >
            <Text className="font-BlockHead text-white">{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

// Estilo reutilizable para los campos
const inputStyle = {
  width: '100%',
  height: 40,
  marginTop: 8,
  borderRadius: 5,
  fontSize: 20,
  borderWidth: 1,
  padding: 4,
};
