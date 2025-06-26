import { useGlobalContext } from '@/context/GlobalProvider';
import { BottomSheetModal, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import axios from 'axios';
import { XIcon } from 'lucide-react-native';
import type { RefObject } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Keyboard, Pressable, Text, TouchableOpacity, View } from 'react-native';

interface ModalFeedBackProps {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  comment?: { text: string; rating: number };
  newWord?: string;
  setNewWord?: (newWord: any) => void;
}

const ModalFeedBack = ({ bottomSheetModalRef, comment, newWord, setNewWord }: ModalFeedBackProps) => {
  const { addWord, updateWords } = useGlobalContext();
  const handleEnterPress = () => bottomSheetModalRef.current?.snapToIndex(1)
  const handleExitPress = () => bottomSheetModalRef.current?.close()
  const snapPoints = useMemo(() => ['45%'], [])
  const [value, setValue] = useState();

  useEffect(() => {
    if (newWord) {
      setValue(newWord.relation);
    } else {
      setValue(null)
    }
  }, [newWord]);


  const nameRef = useRef(null)
  const relationRef = useRef(null)

  const [name, setName] = useState('')
  const [relation, setRelation] = useState('')
  const [option, setOption] = useState('Guardar')

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      index={1}
      enablePanDownToClose={true}
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
    >
      <BottomSheetView className="px-4">
        <View className="w-full items-center justify-around ">
          {
            !newWord ? (
              <View className="w-full">
                <View className="w-full flex-row justify-between items-center">
                  <Text className="font-BlockHead">Crea una nueva palabra</Text>
                  <Pressable
                    className="w-10 h-10 bg-gray-300 rounded-full items-center justify-center "
                    onPress={handleExitPress}
                  >
                    <XIcon size={24} color="black" />
                  </Pressable>
                </View>
                <View className="w-full mt-4">
                  <Text className="font-Waku text-gray-500">Nombre</Text>
                  <BottomSheetTextInput
                    ref={nameRef}
                    onChangeText={(e) => setName(e)}
                    className="font-Waku"
                    style={{
                      width: '100%',
                      height: 40,
                      marginTop: 8,
                      borderRadius: 5,
                      fontSize: 20,
                      borderWidth: 1,
                      padding: 4
                    }}
                    placeholder="Escribe un nombre..."
                    placeholderTextColor={"gray"}
                    onSubmitEditing={handleEnterPress}
                  />
                  <Text className="font-Waku text-gray-500 mt-4">Asociacion</Text>
                  <BottomSheetTextInput
                    ref={relationRef}
                    onChangeText={(e) => setRelation(e)}
                    className="font-Waku"
                    style={{
                      width: '100%',
                      height: 40,
                      marginTop: 8,
                      borderRadius: 5,
                      fontSize: 20,
                      borderWidth: 1,
                      padding: 4
                    }}
                    placeholder="Escribe una asociacion..."
                    placeholderTextColor={"gray"}
                    onSubmitEditing={handleEnterPress}
                  />
                </View>
              </View>
            ) : (
              <View className="p-2">
                <View className="w-full flex-row justify-between items-center">
                  <View className="w-3/4">
                    <Text className="font-BlockHead">Edita el contenido de tu asociacion</Text>
                  </View>
                  <Pressable
                    className="w-10 h-10 bg-gray-300 rounded-full items-center justify-center "
                    onPress={() => {
                      setNewWord(null)
                      handleExitPress()
                    }}
                  >
                    <XIcon size={24} color="black" />
                  </Pressable>
                </View>
                <View className="h-28 mt-10 overflow-hidden">
                  <BottomSheetTextInput
                    className="flex-1 p-2 border border-gray-800 rounded-lg"
                    multiline
                    onFocus={() => {
                      setOption('Listo')
                    }}
                    onSubmitEditing={Keyboard.dismiss}
                    value={value}
                    onChangeText={(text) => setValue(text)}
                  />
                </View>
              </View>
            )

          }
          <TouchableOpacity
            className="w-full h-14 justify-center items-center bg-[#003366] rounded-lg mt-10 "
            onPress={() => {
              if (option === 'Listo') {
                Keyboard.dismiss()
                setOption('Guardar')
                handleEnterPress()

              } else if (option === 'Guardar' && value) {
                axios.put(`http://192.168.100.10:3003/associations/${newWord.association_id}`, {
                  relation: value
                })
                  .then(response => {
                    updateWords()
                    console.log('Cambios guardados del Usuario ✅');
                    Alert.alert('Éxito', 'Cambios guardados correctamente');
                    setNewWord(null);
                    handleExitPress()
                    // setUser(response.data);
                  })
                  .catch(err => {
                    console.error('Error guardando cambios:', err);
                  });

              } else {
                let form = { name, relation, stories: [{ title: 'Nueva historia' }] }
                addWord(form)
                handleExitPress()
              }
            }}
          >
            <Text className="font-BlockHead text-white">{option}</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

export default ModalFeedBack