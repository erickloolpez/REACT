import { View, Image, Text, TouchableOpacity, Modal, Dimensions, Pressable } from 'react-native'
import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleXmark, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

import { parks } from '../../constants'
import LaurelRight from '../../assets/svgs/laurel_right'
import LaurelLeft from '../../assets/svgs/laurel_left'
import { useGlobalContext } from '../../context/GlobalProvider'
import { createFavorite, deleteFavorite, getAllFavoritesByUser } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'

const Header = ({ logo, image, park }) => {
    const { user } = useGlobalContext()
    const [openModal, setOpenModal] = useState(false)

    const { data: favorites, refetch } = useAppwrite(() => getAllFavoritesByUser(user.$id))

    useEffect(() => {
        if (favorites) {
            const isFavorite = favorites.some((favorite) => favorite.parks.nombre === park.nombre)
            setLike(isFavorite);
        }
    }, [favorites]);

    const [like, setLike] = useState(false)

    const submit = async () => {
        let form = { userId: user.$id, parkId: park.$id }
        try {
            await createFavorite(form)
        } catch (error) {
            console.log("error", error)
            Alert.alert('Verts', error.message)
        }
    }

    const delFavorite = async () => {
        try {
            const rowToDelete = favorites.filter((favorite) => favorite.parks.nombre === park.nombre)
            // console.log("ROWTODELETE", rowToDelete[0].$id)
             await deleteFavorite(rowToDelete[0].$id)
        } catch (error) {
            console.log("error", error)
            Alert.alert('Verts', error.message)
        }
    }

    const { width } = Dimensions.get('window')
    const _slideWidth = width * 1
    const _slideHeight = _slideWidth * 1

    const scrollX = useSharedValue(0)

    const onScroll = useAnimatedScrollHandler((e) => {
        scrollX.value = e.contentOffset.x / (_slideWidth)
    })

    function DotIndex({ name, index, scrollX }) {
        const stylez = useAnimatedStyle(() => {
            return {
                width: interpolate(
                    scrollX.value,
                    [index - 1, index, index + 1],
                    [10, 22, 10],
                    Extrapolation.CLAMP
                ),
                backgroundColor:
                    interpolateColor(
                        scrollX.value,
                        [index - 1, index, index + 1],
                        ["#fff", "#cf613c", "#fff"]
                    )
            }
        })

        return (
            <Animated.View
                className="w-8 h-3 mr-1 bg-orange-500 rounded-full z-10"
                style={stylez}
            >
            </Animated.View>
        )

    }

    function renderModal() {
        return (
            <Modal visible={openModal} animationType='slide' transparent={true}>
                <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View className="bg-white w-[90%] h-[70%] rounded-lg relative p-2 ">
                        <Image source={image} resizeMode='cover' className="w-full h-full" />
                        <TouchableOpacity onPress={() => setOpenModal(false)} className="absolute top-3 right-2 bg-white rounded-full">
                            <FontAwesomeIcon icon={faCircleXmark} color='red' size={32} />
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        )
    }


    return (
        <View className="w-full h-[50vh] relative items-center justify-center ">
            <View className="w-full h-[20%] z-10 flex-row items-center justify-center rounded-xl border-2 border-white ">
                {/* <LinearGradient className="w-full h-full absolute" colors={['#5A3F37', '#2C7744']}/> */}
                <LaurelLeft />
                <Image source={logo} className="w-44 h-full" resizeMode="contain" />
                <LaurelRight />
            </View>

            <View className="w-full h-10 flex-row absolute bottom-0 justify-center ">
                {
                    parks.slice(4, 8).map((park, index) => (
                        <DotIndex
                            key={`bg-photo-${park.name}`}
                            index={index}
                            scrollX={scrollX}
                        />
                    ))
                }
            </View>
            <View className="w-full h-[80%] relative ">
                <Animated.FlatList
                    data={parks.slice(4, 8)}
                    keyExtractor={(park) => park.name}
                    renderItem={({ item: park, index }) => (
                        <View style={{ width: _slideWidth, height: _slideHeight, position: 'relative' }}>
                            <Image source={park.image} className="w-full h-full" resizeMode='cover' />
                            <LinearGradient className="w-full h-full absolute" colors={['rgba(0,0,0,0.2)', 'transparent']} />
                        </View>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={_slideWidth}
                    decelerationRate={"fast"}
                    contentContainerStyle={{
                        alignItems: "center",
                    }}
                    onScroll={onScroll}
                    scrollEventThrottle={100 / 60}
                />
                <Pressable
                    className="absolute top-4 right-4 "
                    onPress={() => {
                        setLike((prevLike) => {
                            if (!prevLike) {
                                submit()
                                return true
                            } else {
                                delFavorite()
                                return false
                            }
                        })
                    }}
                >
                    {
                        !like && (
                            <FontAwesomeIcon icon={faHeart} color='white' size={28} />
                        )
                    }
                    {
                        like && (
                            <FontAwesomeIcon icon={faHeartSolid} color='red' size={28} />
                        )
                    }
                </Pressable>
            </View>
            {
                renderModal()
            }
        </View>
    )
}

export default Header