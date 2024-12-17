import { View, Text, Pressable, TouchableWithoutFeedback } from 'react-native'
import { useEffect, useState, useRef, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleXmark, faPenToSquare, faSquareCheck, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import Animated, { withTiming } from 'react-native-reanimated'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { BottomSheetModal, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import { usePathname } from 'expo-router'
import { useGlobalContext } from '../context/GlobalProvider'
import { createReview } from '../lib/appwrite'


const ModalFeedBack = ({ bottomSheetModalRef, park, refetch, comment }) => {
    const { user } = useGlobalContext()
    const pathname = usePathname()
    const handleEnterPress = () => bottomSheetModalRef.current?.snapToIndex(1)
    const handleExitPress = () => bottomSheetModalRef.current?.close()
    const snapPoints = useMemo(() => ['45%'], [])
    const [isEditing, setIsEditing] = useState(false)
    const textInputRef = useRef(null)
    const [query, setQuery] = useState(comment? comment.text : '')
    const scale = useSharedValue(0)
    const [rating, setRating] = useState(comment ? comment.rating : 5)


    const toggleEditMode = () => {
        setIsEditing((prev) => !prev); // Alterna el modo de edición
    };

    useEffect(() => {
        if (isEditing) {
            textInputRef.current?.focus();
        }
    }, [isEditing]);
    useEffect(() => {
        if (comment) {
            setRating(comment.rating);
            setQuery(comment.text)
        }
    }, [comment]);

    const onRefresh = async () => {
        await refetch()
    }
    const submit = async () => {
        if (pathname.startsWith('/profile')) {

        } else if (pathname.startsWith('/modals')) {
            let form = { rating: rating, text: query, userId: user.$id, parkId: park.$id }
            try {
                await createReview(form)
                setQuery('')
                handleExitPress()
                onRefresh()
            } catch (error) {
                console.log("error", error)
                Alert.alert('Verts', error.message)
            }
        }
    }

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
                    <FontAwesomeIcon icon={i <= rating ? faStarSolid : faStar} color={i <= rating ? "#eab308" : "black"} size={25} />
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
                        <FontAwesomeIcon icon={faCircleXmark} color='black' size={32} />
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
                        value={query}
                        onSubmitEditing={handleEnterPress}
                    />
                    <View className="flex-row w-[80%] h-10 ">
                        {stars}
                    </View>
                    <View className="mt-4 w-full h-12 flex-row justify-around">
                        <Pressable
                            className="flex-row items-center justify-center w-24 h-full  border-2  rounded-lg"
                            onPress={toggleEditMode}>
                            <FontAwesomeIcon icon={faPenToSquare} color='black' size={25} />
                            <Text className="ml-2">Editar</Text>
                        </Pressable>
                        <Pressable
                            className="flex-row items-center justify-center w-24 h-full  border-2  rounded-lg"
                            onPress={submit}
                        >
                            <FontAwesomeIcon icon={faSquareCheck} color='black' size={25} />
                            <Text className="ml-2">Enviar</Text>
                        </Pressable>
                    </View>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    )
}

export default ModalFeedBack