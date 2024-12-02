import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, Pressable, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleLeft, faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import MasonryList from '@react-native-seoul/masonry-list';

import { images, parks } from '../../constants';

const Activities = ({ place }) => {
    const { width } = Dimensions.get("window");
    const _slideWidth = width * 0.42;
    const _spacing = 18;

    const [expandedIndex, setExpandedIndex] = useState(null);
    const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const nextIndex = viewableItems[0].index; // Índice del primer ítem visible
            setExpandedIndex(nextIndex);
        }
    }).current;

    return (
        <View className="mt-4">
            <View className="flex-row mb-8 items-center ">
                <Text className="text-primary text-xl  font-bold">Actividades</Text>
            </View>
            <FlatList
                data={place.icons}
                keyExtractor={(activity) => activity.name}
                renderItem={({ item: activity, index }) => (
                    <CardPop
                        activity={activity}
                        images={parks.slice(0, 3)}
                        isExpanded={expandedIndex === index}
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
        </View>
    );
};

const CardPop = ({ images, activity, isExpanded, onPressExpand }) => {
    const width = useSharedValue(0);
    const yValue = useSharedValue(90);
    const opacitiy = useSharedValue(0);
    const xPosition = useSharedValue(180);

    const menuStylez = useAnimatedStyle(() => ({
        width: width.value,
        transform: [{ translateY: yValue.value }],
        opacity: opacitiy.value,
    }));

    const rotateStylez = useAnimatedStyle(() => ({
        transform: [{ rotateZ: `${xPosition.value}deg` }],
    }));

    useEffect(() => {
        if (isExpanded) {
            width.value = withTiming(350, { duration: 300 });
            yValue.value = withTiming(-8, { duration: 300 });
            opacitiy.value = withTiming(1, { duration: 300 });
            xPosition.value = withTiming(90, { duration: 300 });
        } else {
            width.value = withTiming(0, { duration: 300 });
            yValue.value = withTiming(90, { duration: 300 });
            opacitiy.value = withTiming(0, { duration: 260 });
            xPosition.value = withTiming(180, { duration: 300 });
        }
    }, [isExpanded]);

    return (
        <View className="w-40 px-2 items-center">
            <Animated.View className="h-28 " style={menuStylez}>
                <MasonryList
                    data={images}
                    keyExtractor={(item) => item.name}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                width: 110,
                                height: 90,
                                overflow: "hidden",
                                marginTop: 10,
                                marginLeft: 4,
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
            <Pressable
                className="w-28 h-32 bg-terciary mt-8 mr-3 rounded-3xl items-center"
                onPress={onPressExpand}
            >
                <View className="w-20 h-10  relative">
                    <View className="w-20 h-20 bg-yellow-500 absolute rounded-full top-[-30px] overflow-hidden">
                        <Image source={activity.image} resizeMode="contain" className="w-full h-full" />
                    </View>
                </View>
                <View className="mt-4">
                    <Text className="text-lg font-semibold text-primary">{activity.name}</Text>
                </View>
                <Animated.View className="mt-3" style={rotateStylez}>
                    <FontAwesomeIcon icon={faCircleLeft} color="black" size={25} />
                </Animated.View>
            </Pressable>
        </View>
    );
};

export default Activities;
