import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const Navbar = ({ children, navBarOptions, setCategory }) => {
    const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
    const [currentIndex, setCurrentIndex] = useState(0)

    const translateX = useSharedValue(0);

    const handleTabPress = (index) => {
        setCategory(navBarOptions[index])
        setCurrentIndex(index)

        const tabWidth = dimensions.width / navBarOptions.length;
        translateX.value = withTiming(index * tabWidth, { duration: 300 });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        };
    });

    return (
        <View onLayout={(e) => setDimensions({ height: e.nativeEvent.layout.height, width: e.nativeEvent.layout.width })} className="w-full ">
            <View className="w-full h-12 bg-secondary flex-row items-center relative">
                <Animated.View style={[animatedStyle, { width: dimensions.width / navBarOptions.length }]} className="h-full bg-primary absolute left-0 rounded-tr-xl rounded-tl-xl" />
                {navBarOptions.map((nav, index) => {
                    let color = currentIndex === index ? '#cf613c' : '#ffffff'
                    return (
                        <Pressable
                            key={index}
                            className="flex-1"
                            onPress={() => handleTabPress(index)}
                        >
                            <Text style={{ color: color, alignSelf: 'center' }}>{nav.name}</Text>
                        </Pressable>
                    );
                })}
            </View>
            {
                children
            }
        </View>
    );
};

export default Navbar;
