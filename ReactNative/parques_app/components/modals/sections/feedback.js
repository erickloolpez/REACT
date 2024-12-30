import { View, Text, Image, Pressable, FlatList, ScrollView, Dimensions, Alert, TouchableWithoutFeedback } from 'react-native'
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
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import ModalFeedBack from '../../modalFeedback'

const Feedback = ({ name, park }) => {
    const bottomSheetModalRef = useRef(null)
    const handlePresentModalPress = () => bottomSheetModalRef.current?.present()


    const { width } = Dimensions.get('window')
    const _slideWidth = width * 0.88
    const _spacing = 18

    const { data: reviews, refetch } = useAppwrite(() => getAllReviewsByPark(park.$id))



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
                        <Review key={`comment-${index}-${comment.users.username}`} width={_slideWidth} height={144} text={comment.text} name={comment.users.username} rating={comment.rating} date={comment.$updatedAt} avatar={comment.users.avatar} />
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


            <ModalFeedBack bottomSheetModalRef={bottomSheetModalRef} park={park} refetch={refetch} />

        </View>
    )
}

export default Feedback