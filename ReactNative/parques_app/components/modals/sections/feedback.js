import { View, Text, Image, Pressable, FlatList, ScrollView, Dimensions, Alert } from 'react-native'
import Review from '../../Comment'
import { useRef, useCallback, useMemo, useState, useEffect } from 'react'
import { faArrowRight, faCircleXmark, faPenToSquare, faSquareCheck, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { BottomSheetModal, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import { images } from '../../../constants'
import { faFaceLaughBeam, faStar } from '@fortawesome/free-regular-svg-icons'
import useAppwrite from '../../../lib/useAppwrite'
import { createReview, getAllParks, getAllReviewsByPark, getAllRiviews } from '../../../lib/appwrite'
import { useGlobalContext } from '../../../context/GlobalProvider'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const Feedback = ({ name, park }) => {
    const { user } = useGlobalContext()
    const bottomSheetModalRef = useRef(null)
    const handlePresentModalPress = () => bottomSheetModalRef.current?.present()
    const handleEnterPress = () => bottomSheetModalRef.current?.snapToIndex(1)
    const handleExitPress = () => bottomSheetModalRef.current?.close()
    const snapPoints = useMemo(() => ['45%'], [])
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

    const [listComments, setListComments] = useState([
        { name: 'lol', text: "Pero que bonito parque, de verdad es una experiencia unica que todas las personas deben conocer :)" }
    ])

    const [query, setQuery] = useState('')
    const { width, height } = Dimensions.get('window')
    const _slideWidth = width * 0.88
    const _slideHeight = height * 0.47
    const _spacing = 18

    const { data: reviews, refetch } = useAppwrite(() => getAllReviewsByPark(park.$id))

    const onRefresh = async () => {
        await refetch()
    }
    const submit = async () => {
        let form = { rating: 3, text: query, userId: user.$id, parkId: park.$id }
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

    let stars = []
    // const [filled,setFilled] = useState(false)
    const [rating, setRating] = useState(5)
    const scale = useSharedValue(0)

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
        <View className="w-full h-[36vh] min-h-[10vh] items-center  relative ">
            <Pressable
                onPress={handlePresentModalPress}
                className="flex-row absolute bottom-0 w-full h-11 px-1 overflow-hidden z-10">
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
            <View className="w-full h-[80%] ">
                <FlatList
                    data={reviews}
                    keyExtractor={(comment, index) => comment.$id}
                    renderItem={({ item: comment, index }) => (
                        <Review key={`comment-${index}-${comment.users.username}`} width={_slideWidth} height={144} text={comment.text} name={comment.users.username} />
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
                            placeholder='Escribe tu comentario ....'
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
        </View>
    )
}

export default Feedback