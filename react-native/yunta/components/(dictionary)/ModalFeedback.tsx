import { useGlobalContext } from '@/context/GlobalProvider';
import { BottomSheetModal, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { XIcon } from 'lucide-react-native';
import type { RefObject } from 'react';
import { useMemo, useRef, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

interface ModalFeedBackProps {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  comment?: { text: string; rating: number };
}

const ModalFeedBack = ({ bottomSheetModalRef, comment }: ModalFeedBackProps) => {
  const { addWord } = useGlobalContext();
  const handleEnterPress = () => bottomSheetModalRef.current?.snapToIndex(1)
  const handleExitPress = () => bottomSheetModalRef.current?.close()
  const snapPoints = useMemo(() => ['45%'], [])

  const nameRef = useRef(null)
  const relationRef = useRef(null)

  const [name, setName] = useState('')
  const [relation, setRelation] = useState('')

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
          <TouchableOpacity
            className="w-full h-14 justify-center items-center bg-[#003366] rounded-lg mt-10 "
            onPress={() => {
              let form = { name, relation, stories: [{ title: 'Nueva historia' }] }
              addWord(form)
              handleExitPress()
            }}

          >
            <Text className="font-BlockHead text-white">Guardar</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

export default ModalFeedBack