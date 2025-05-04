import { BottomSheetModal, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import { useMemo, useRef, useState } from 'react'
import { Pressable, Text, TouchableWithoutFeedback, View } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'


const ModalFeedBack = ({ bottomSheetModalRef, comment }) => {
  const handleEnterPress = () => bottomSheetModalRef.current?.snapToIndex(1)
  const handleExitPress = () => bottomSheetModalRef.current?.close()
  const snapPoints = useMemo(() => ['45%'], [])
  const [isEditing, setIsEditing] = useState(false)
  const textInputRef = useRef(null)
  const [query, setQuery] = useState(comment ? comment.text : '')
  const scale = useSharedValue(0)
  const [rating, setRating] = useState(comment ? comment.rating : 5)


  const toggleEditMode = () => {
    setIsEditing((prev) => !prev); // Alterna el modo de edición
  };

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scale.value,
            [0, 1],
            [1, 1.2]
          )
        }
      ]
    }
  })

  let stars = []
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <TouchableWithoutFeedback
        key={i}
        onPress={() => {
          setRating(i)
          scale.value = withTiming(1, { duration: 200 }, () => {
            scale.value = withTiming(0, { duration: 200 })
          })
        }}
        className=" w-8 h-8 justify-center"
      >
        <Animated.View style={stylez}>
          <Text>*</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      index={1}
      enablePanDownToClose={true}
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
    >
      <BottomSheetView>
        <View className="w-full items-center ">
          <Pressable
            className="self-end mr-4"
            onPress={handleExitPress}
          >
            <Text>X</Text>
          </Pressable>
          <BottomSheetTextInput
            ref={textInputRef}
            onChangeText={(e) => setQuery(e)}
            style={{
              width: '80%',
              height: 90,
              marginTop: 8,
              marginBottom: 10,
              borderRadius: 10,
              fontSize: 16,
              lineHeight: 20,
              paddingBottom: 30,
              textAlignVertical: 'center',
              backgroundColor: 'rgba(151, 151, 151, 0.25)',
            }}
            placeholder={comment ? comment.text : 'Escribe tu comentario ....'}
            onSubmitEditing={handleEnterPress}
          />
          <View className="flex-row w-[80%] h-10 ">
            {stars}
          </View>
          <View className="mt-4 w-full h-12 flex-row justify-around">
            <Pressable
              className="flex-row items-center justify-center w-24 h-full  border-2  rounded-lg bg-yellow-500"
              onPress={toggleEditMode}>
              <Text className="ml-2 text-white">Editar</Text>
            </Pressable>
            <Pressable
              className="flex-row items-center justify-center w-28 h-full  border-2  rounded-lg bg-green-500"
              onPress={() => { }}
            >
              <Text className="ml-2 text-white ">Holitas</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

export default ModalFeedBack