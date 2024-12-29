import { View, Image, Text, TouchableOpacity, Modal, Dimensions, Pressable } from 'react-native'
import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleXmark, faHeart as faHeartSolid, faSquareCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

import { parks } from '../../constants'
import LaurelRight from '../../assets/svgs/laurel_right'
import LaurelLeft from '../../assets/svgs/laurel_left'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'

const Header = ({ logo, image, isFavorite, submit, delFavorite, collections }) => {

    const [like, setLike] = useState(isFavorite)

    const handlePress = async () => {
        if (!isFavorite) {
            setLike(true);
            await submit();
        } else {
            setLike(false);
            await delFavorite();
        }
    };

    useEffect(() => {
        setLike(isFavorite);
    }, [isFavorite]);


    const { width } = Dimensions.get('window')
    const _slideWidth = width * 1
    const _slideHeight = _slideWidth * 1

    const scrollX = useSharedValue(0)

    const onScroll = useAnimatedScrollHandler((e) => {
        scrollX.value = e.contentOffset.x / (_slideWidth)
    })

    function DotIndex({ index, scrollX }) {
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

    return (
        <View className="w-full h-[50vh] relative items-center justify-center ">
            <View className="w-full h-[20%] z-10 flex-row items-center justify-center relative  ">
                <Pressable
                    className="absolute top-6 left-2"
                    onPress={() => router.back()}
                >
                    <FontAwesomeIcon icon={faSquareCaretLeft} color='#fff' size={32} />
                </Pressable>
                <LaurelLeft />
                <Image source={logo} className="w-48 h-[70%]" resizeMode="contain" />
                <LaurelRight />
            </View>

            <View className="w-full h-10 flex-row absolute bottom-0 justify-center ">
                {
                    collections.map((park, index) => (
                        <DotIndex
                            key={`bg-photo-${index}`}
                            index={index}
                            scrollX={scrollX}
                        />
                    ))
                }
            </View>
            <View className="w-full h-[80%] relative ">
                <Animated.FlatList
                    data={collections}
                    keyExtractor={(image, index) => `bg-photo-park${index}`}
                    renderItem={({ item: collection, index }) => (
                        <View style={{ width: _slideWidth, height: _slideHeight, position: 'relative' }}>
                            <Image source={collection.image} className="w-full h-full" resizeMode='cover' />
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
                    onPress={handlePress}
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
        </View>
    )
}

export default Header