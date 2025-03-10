import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, FlatList, Dimensions, TouchableOpacity, Modal } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import MasonryList from '@react-native-seoul/masonry-list';


const CardPop = ({ images, activity, isExpanded, handleImagePress }) => {
    const width = useSharedValue(0);
    const yValue = useSharedValue(90);
    const opacity = useSharedValue(0);
    const xPosition = useSharedValue(180);

    const menuStylez = useAnimatedStyle(() => ({
        width: width.value,
        transform: [{ translateY: yValue.value }],
        opacity: opacity.value,
    }));

    useEffect(() => {
        if (isExpanded) {
            width.value = withTiming(380, { duration: 300 });
            yValue.value = withTiming(-8, { duration: 300 });
            opacity.value = withTiming(1, { duration: 300 });
            xPosition.value = withTiming(90, { duration: 300 });
        } else {
            width.value = withTiming(0, { duration: 300 });
            yValue.value = withTiming(90, { duration: 300 });
            opacity.value = withTiming(0, { duration: 260 });
            xPosition.value = withTiming(180, { duration: 300 });
        }
    }, [isExpanded]);

    return (
        <View className="w-40 items-center bg-red-40 ">
            <Animated.View className="h-36 items-center" style={menuStylez}>
                <MasonryList
                contentContainerStyle={{padding: 10}}
                    data={activity.picture}
                    keyExtractor={(item, index) => `senderismo-${index}`}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                width: 110,
                                height: 110,
                                overflow: "hidden",
                                marginRight: 10,
                                marginTop: 10,
                            }}
                            onPress={() => {
                                handleImagePress(item.image)
                            }}
                        >
                            <Image
                                source={item.image}
                                resizeMode="cover"
                                style={{ width: "100%", height: "100%", borderRadius: 10 }}
                            />
                        </TouchableOpacity>
                    )}
                />
            </Animated.View>
            <View
                className="w-28 h-24 bg-[#44A08D] mt-8 mr-3 rounded-3xl items-center"
            >
                <View className="w-20 h-10  relative">
                    <View className="w-20 h-20 bg-[#093637] absolute rounded-full top-[-30px] overflow-hidden">
                        <Image source={activity.image} resizeMode="contain" className="w-full h-full" />
                    </View>
                </View>
                <View className="mt-4">
                    <Text className="text-lg font-semibold text-primary">{activity.name}</Text>
                </View>
            </View>
        </View>
    );
};


const Activities = ({ place }) => {
    const [openModal, setOpenModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const { width } = Dimensions.get("window");
    const _slideWidth = width * 0.38;
    const _spacing = 10;

    const [expandedIndex, setExpandedIndex] = useState(null);
    const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const nextIndex = viewableItems[0].index; // Índice del primer ítem visible
            setExpandedIndex(nextIndex);
        }
    }).current;

    const handleImagePress = (image) => {
        setSelectedImage(image)
        setOpenModal(true)
    }

    function renderModal(image) {
        return (
            <Modal visible={openModal} animationType='slide' transparent={true}>
                <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View className="bg-white w-[90%] h-[70%] rounded-lg relative p-2 ">
                        <Image source={selectedImage} resizeMode='cover' className="w-full h-full" />
                        <TouchableOpacity onPress={() => setOpenModal(false)} className="absolute top-3 right-2 bg-white rounded-full">
                            <FontAwesomeIcon icon={faCircleXmark} color='red' size={32} />
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        )
    }

    return (
        <View className="mt-4">
            <View className="flex-row h-12 rounded-lg  mb-4 items-center ">
                <Text className="text-white text-xl  font-bold">Actividades</Text>
            </View>
            <FlatList
                data={place.icons}
                keyExtractor={(activity) => activity.name}
                renderItem={({ item: activity, index }) => (
                    <CardPop
                        activity={activity}
                        isExpanded={expandedIndex === index}
                        handleImagePress={handleImagePress}
                        onPressExpand={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={_slideWidth + _spacing}
                decelerationRate={"fast"}
                contentContainerStyle={{
                    gap: _spacing,
                    paddingHorizontal: (width - _slideWidth) / 2,
                    alignItems: "center",
                }}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                scrollEventThrottle={16}
            />
            {
                renderModal()
            }
        </View>
    );
};

export default Activities;
