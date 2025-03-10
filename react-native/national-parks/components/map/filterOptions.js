import { Text, Pressable } from 'react-native'
import Animated, { FadeInLeft, FadeOutRight, LinearTransition } from 'react-native-reanimated'
import { useEffect } from 'react'
import { MotiView } from 'moti';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBicycle, faCamera, faCampground, faPersonHiking, faPersonSwimming, faSailboat } from '@fortawesome/free-solid-svg-icons';
import { parks } from '../../constants';

const options = [faCamera, faPersonSwimming, faCampground, faBicycle, faSailboat, faPersonHiking]

function Icon({ index }) {
    const activity = options[index]
    return <FontAwesomeIcon icon={activity} color='white' size={32} />
}

const FilterOptions = ({ animation, selectedIndex, setSelectedIndex, setFilteredParks }) => {

    const parksID = ['Fotografia', 'Buceo', 'Camping', 'Ciclismo', 'Canotaje', 'Senderismo']

    const activeColor = "#fff"
    const inactiveColor = "#ggg"
    const activeBackgroundColor = "#cf613c"
    const inactiveBackgroundColor = "#17301a"

    useEffect(() => {
        if (selectedIndex === null) {
            setFilteredParks(parks)
        } else {
            let filterPark = parks.filter((park) =>
                park.icons.some((activity,index) => activity.name === parksID[selectedIndex])
            );

            setFilteredParks(filterPark)


        }

    }, [selectedIndex])

    return (
        <Animated.View
            className="absolute w-36 h-[52vh] gap-2 justify-around items-start  top-32 left-3 rounded-sm"
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
                            <Pressable
                                onPress={() => {
                                    selectedIndex !== index ? setSelectedIndex(index) : setSelectedIndex(null)
                                }}
                                style={{
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

export default FilterOptions