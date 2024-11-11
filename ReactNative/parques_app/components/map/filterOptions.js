import { View, Text, Pressable } from 'react-native'
import Animated, { FadeInDown, FadeOutUp, LinearTransition } from 'react-native-reanimated'
import { useState } from 'react'
import { MotiView } from 'moti';
import { Bicycle01Icon, Camera02Icon, CampfireIcon, SailboatOffshoreIcon, SwimmingCapIcon, WorkoutRunIcon } from 'hugeicons-react-native';

const options = [Camera02Icon, SwimmingCapIcon, CampfireIcon, Bicycle01Icon, SailboatOffshoreIcon, WorkoutRunIcon]

function Icon({ index }) {
    const IconComponent = options[index]
    return <IconComponent
        size={40}
        color={"#ffffff"}
        variant={"stroke"}
    />

}

const FilterOptions = ({ animation, selectedIndex, setSelectedIndex }) => {

    const parksID = ['Fotografia', 'Buceo', 'Camping', 'Ciclismo', 'Canotajo', 'Senderismo']

    const activeColor = "#fff"
    const inactiveColor = "#ggg"
    const activeBackgroundColor = "#cf613c"
    const inactiveBackgroundColor = "#17301a"

    return (
        <Animated.View
            className="absolute w-36  h-[52vh] gap-2 justify-around items-start  top-32 left-3 rounded-sm"
            style={animation}
        >
            {
                parksID.map((park, index) => {
                    const isSelected = selectedIndex === index
                    return (
                        <MotiView
                            key={index}
                            className=""
                            layout={LinearTransition.springify().damping(80).stiffness(200)}
                            animate={{
                                backgroundColor: isSelected ? activeBackgroundColor : inactiveBackgroundColor,
                                borderRadius: 8,
                                overflow: 'hidden'
                            }}
                        >
                            <Pressable onPress={() => selectedIndex !== index ? setSelectedIndex(index) : setSelectedIndex(null)} style={{
                            }}
                                className="flex-row items-center p-2 "
                            >

                                <Icon
                                    index={index}
                                />
                                {
                                    isSelected &&
                                    <Animated.Text
                                        className=" justify-center p-2"
                                        entering={FadeInDown.springify().damping(80).stiffness(200)}
                                        exiting={FadeOutUp.springify().damping(80).stiffness(200)}
                                    >
                                        <Text style={{ color: isSelected ? activeColor : inactiveColor }}>{park}</Text>
                                    </Animated.Text>
                                }
                            </Pressable>

                        </MotiView>
                    )
                })
            }

        </Animated.View>
    )
}

export default FilterOptions