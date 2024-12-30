import { View, Text, Pressable } from 'react-native'
import { faBicycle, faCamera, faCampground, faPersonHiking, faPersonSwimming, faSailboat } from '@fortawesome/free-solid-svg-icons';
import { MotiView } from 'moti';
import Animated, { FadeInDown, FadeInLeft, FadeOutRight, FadeOutUp, LinearTransition } from 'react-native-reanimated'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { parks } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';


const options = [faCamera, faPersonSwimming, faCampground, faBicycle, faSailboat, faPersonHiking]

function Icon({ index }) {
    const activity = options[index]
    return <FontAwesomeIcon icon={activity} color='white' size={32} />
}

const Nav = ({ setData, query }) => {
    const { topFiveParks } = useGlobalContext()
    const parksID = ['Fotografia', 'Buceo', 'Camping', 'Ciclismo', 'Canotaje', 'Senderismo']
    const [selectedIndex, setSelectedIndex] = useState(null)
    const activeColor = "#fff"
    const inactiveColor = "#ggg"
    const activeBackgroundColor = "#cf613c"
    const inactiveBackgroundColor = "#17301a"

    return (
        <Animated.View className="w-full h-12 flex-row justify-around mb-2">
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
                            <Pressable onPress={() => {
                                if (selectedIndex === index) {
                                    setSelectedIndex(null);
                                    let listOfParks = query === "Popular" ? topFiveParks : parks;
                                    setData(listOfParks); // Restablecer los datos a `parks`
                                } else {
                                    setSelectedIndex(index);
                                    let listOfParks = query === "Popular" ? topFiveParks : parks;
                                    let filterPark = listOfParks.filter((park) =>
                                        park.icons.some((activity) => activity.name === parksID[index])
                                    );
                                    setData(filterPark);
                                }
                            }

                            } style={{
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
                                        entering={FadeInLeft.springify().damping(80).stiffness(200)}
                                        exiting={FadeOutRight.springify().damping(80).stiffness(200)}
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

export default Nav