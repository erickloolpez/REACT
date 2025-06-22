import { BottomSheetFlashList, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { ArrowLeft, ArrowRightLeft, XIcon } from 'lucide-react-native';
import type { RefObject } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

interface Story {
  description: string;
  character: string;
  title: string;
}
interface ModalFeedBackProps {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  comment?: string;
  setComment?: (comment: string) => void;
  filterWords?: string[];
  storyWords?: string[];
  newWord?: string;
  setNewWord?: (newWord: string) => void;
  setStory?: React.Dispatch<React.SetStateAction<Story>>;
}


const ModalFeedBack = ({ bottomSheetModalRef, comment, filterWords, storyWords, setNewWord, newWord, setStory, setComment }: ModalFeedBackProps) => {

  // callbacks
  const handleEnterPress = useCallback((index: number) => {
    bottomSheetModalRef.current?.snapToIndex(index);
  }, []);
  const handleExitPress = useCallback(() => {
    bottomSheetModalRef.current?.close()
  }, []);
  const snapPoints = useMemo(() => ['35%', '55%'], [])

  const [showList, setShowList] = useState(false);
  const [changeOption, setChangeOption] = useState([]);
  const [optionsList, setOptionsList] = useState('current')

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
    >
      <BottomSheetView className="w-full h-full px-4">
        {/* Header */}
        <View className="w-full flex-row justify-between items-center">
          <Text className="font-BlockHead">Cambio de palabra</Text>
          <Pressable
            className="w-10 h-10 bg-gray-300 rounded-full items-center justify-center"
            onPress={() => {
              handleExitPress();
              setShowList(false);
            }}
          >
            <XIcon size={24} color="black" />
          </Pressable>
        </View>

        {/* Contenido condicional */}
        {!showList ? (
          <View className="w-full items-center justify-around mt-4">
            <View className="w-full flex-row justify-center">
              <Pressable
                className="w-32 h-20 border border-black rounded-lg items-center justify-center p-4"
                onPress={() => {
                  setShowList(true);
                  setOptionsList('current');
                  setChangeOption(storyWords);
                  handleEnterPress(1);
                }}
              >
                <Text className="font-Waku text-gray-500">{comment}</Text>
              </Pressable>
              <View className="w-20 h-20 items-center justify-center">
                <ArrowRightLeft size={24} color="black" />
              </View>
              <Pressable
                className="w-32 h-20 border border-black rounded-lg items-center justify-center p-4"
                onPress={() => {
                  setShowList(true);
                  setOptionsList('db');
                  setChangeOption(filterWords);
                  handleEnterPress(1);
                }}
              >
                <Text className="font-Waku text-gray-500">{newWord}</Text>
              </Pressable>
            </View>
            <TouchableOpacity
              className="w-full h-14 justify-center items-center bg-[#003366] rounded-lg mt-10"
              onPress={() => {
                console.log('cambio de palabra', comment, newWord);
                setStory(prev => ({
                  ...prev,
                  description: prev.description.replace(comment, newWord)
                }))
                handleExitPress()
              }}
            >
              <Text className="font-BlockHead text-white">Guardar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <BottomSheetFlashList
            data={changeOption}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <Pressable
                className="flex-1 h-14 border border-black items-center justify-between flex-row px-4 rounded-lg mr-2 ml-2 mt-2"
                onPress={() => {
                  if (optionsList === 'current') {
                    setComment(item);
                  } else {
                    setNewWord(item);
                  }
                  setShowList(false);
                  handleEnterPress(0);
                }}
              >
                <Text className="font-Waku">{item}</Text>
              </Pressable>
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
            numColumns={2}
            estimatedItemSize={50}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <View className="bg-red-400 mb-6">
                <View className="w-10 h-10 bg-blue-400 rounded-full items-center justify-center">
                  <ArrowLeft
                    size={24}
                    color="black"
                    onPress={() => {
                      setShowList(false);
                      handleEnterPress(0);
                    }}
                  />
                </View>
              </View>
            )}
          />
        )}
      </BottomSheetView>
    </BottomSheetModal>
  )
}

export default ModalFeedBack