import { View, Text, Image, Pressable } from 'react-native'
import Review from '../../Comment'
import { useRef, useCallback, useMemo, useState, useEffect } from 'react'
import { faArrowRight, faCircleXmark, faPenToSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { BottomSheetModal, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import { images } from '../../../constants'
import { faFaceLaughBeam } from '@fortawesome/free-regular-svg-icons'

const Feedback = () => {
    const bottomSheetModalRef = useRef(null)
    // const handlePresentModalPress = useCallback(() => {
    //     bottomSheetModalRef.current?.present();
    // }, []);
    const handlePresentModalPress = () => bottomSheetModalRef.current?.present()
    const handleEnterPress = () => bottomSheetModalRef.current?.snapToIndex(1)
    const handleExitPress = () => bottomSheetModalRef.current?.close()
    const snapPoints = useMemo(() => ['35%'], [])
    const [isEditing, setIsEditing] = useState(false)
    const textInputRef = useRef(null)

    const toggleEditMode = () => {
        setIsEditing((prev) => !prev); // Alterna el modo de edición
    };

    useEffect(() => {
        if (isEditing) {
            textInputRef.current?.focus();
        }
    }, [isEditing]);

    return (
        <View className="w-full h-[56vh] min-h-[50vh] items-center  relative">
            <Review height={144} />

            <Pressable
                onPress={handlePresentModalPress}
                className=" flex-row bottom-8 absolute  w-full h-11 px-1 overflow-hidden">
                <View className="w-[15%] items-center justify-center">
                    <View>
                        <Image source={images.avatar} resizeMode="cover" className="w-10 h-10 rounded-full" />
                    </View>
                </View>
                <View className="w-[85%] bg-gray-500 items-start px-3 justify-center relative rounded-full">
                    <Text className="text-primary">Añadir comentario...</Text>
                    <View className="absolute right-0 mr-5">
                        <FontAwesomeIcon icon={faFaceLaughBeam} color='white' size={25} />
                    </View>
                </View>
            </Pressable>

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
                            <FontAwesomeIcon icon={faCircleXmark} color='black' size={32} />
                        </Pressable>
                        <BottomSheetTextInput
                            ref={textInputRef}
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
                            placeholder='Escribe tu comentario ....'
                            onSubmitEditing={handleEnterPress}
                        />
                        <View className="mt-4 w-full h-12 flex-row justify-around">
                            <Pressable
                                className="flex-row items-center justify-center w-24 h-full  border-2  rounded-lg"
                                onPress={toggleEditMode}>
                                <FontAwesomeIcon icon={faPenToSquare} color='black' size={25} />
                                <Text className="ml-2">Editar</Text>
                            </Pressable>
                            <Pressable
                                className="flex-row items-center justify-center w-24 h-full  border-2  rounded-lg"
                                onPress={toggleEditMode}>
                                <FontAwesomeIcon icon={faSquareCheck} color='black' size={25} />
                                <Text className="ml-2">Editar</Text>
                            </Pressable>
                        </View>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </View>
    )
}

export default Feedback