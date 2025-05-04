import ModalFeedBack from '@/components/ModalFeedback';
import { podocarpusTrends } from '@/mocks/trends-podocarpus';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { Dimensions, FlatList, Image, Pressable, Text, View } from 'react-native';

const Feedback = () => {
  const bottomSheetModalRef = useRef<BottomSheet>(null)
  const handlePresentModalPress = () => bottomSheetModalRef.current?.present()

  const { width } = Dimensions.get('window')
  const _slideWidth = width * 0.58
  const _spacing = 18

  return (
    <View className="flex-1 bg-blue-300  items-center justify-center  relative ">
      <View className="w-full h-[36vh]">
        <Pressable
          onPress={handlePresentModalPress}
          className="flex-row absolute bottom-0 w-full h-11 px-1 overflow-hidden z-10">
          <View className="w-[15%] items-center justify-center">
            <View>
              <Image source={podocarpusTrends[0]} resizeMode="cover" className="w-10 h-10 rounded-full" />
            </View>
          </View>
          <View className="w-[85%] bg-gray-500 items-start px-3 justify-center relative rounded-full">
            <Text className="text-primary">Añadir comentario...</Text>
            <View className="absolute right-0 mr-5">
              <Text>+ Comentario</Text>
            </View>
          </View>
        </Pressable>
        <View className=" h-[80%] bg-green-400 ">
          <FlatList
            data={podocarpusTrends}
            keyExtractor={(comment, index) => "text" + index}
            renderItem={({ item: comment, index }) => (
              <View className="w-24 h-28  bg-white rounded-lg shadow-md m-2 items-center justify-center" key={index}>
                <Text>{index}</Text>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={"fast"}
            snapToInterval={_slideWidth + _spacing}
            contentContainerStyle={{
              gap: _spacing,
              paddingHorizontal: (width - _slideWidth) / 2,
              alignItems: "center",
            }}

            scrollEventThrottle={100 / 60}
          />
        </View>
      </View>

      <ModalFeedBack bottomSheetModalRef={bottomSheetModalRef} comment="Hola " />

    </View>
  )
}

export default Feedback