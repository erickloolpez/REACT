import { TextInput, TouchableOpacity, Alert, View } from 'react-native'
import { useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { usePathname, router } from 'expo-router'

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons'

const SearchInput = () => {
    const pathname = usePathname()
    const [query, setQuery] = useState('')
    const widthLength = '90%'

    const [openSearch, setOpenSearch] = useState(0)

    const animation = useSharedValue(0)
    const animatedStyle = useAnimatedStyle(() => {
        return {
            width:
                animation.value == 1 ? withTiming(widthLength, { duration: 500 }) : withTiming('14%', { duration: 500 }),
        }
    })

    return (
        <Animated.View className={`border-green-800 bg-white absolute right-0 mt-2 h-12 px-4  rounded-full focus:border-[#CF613C] items-center flex-row space-x-4 `} style={animatedStyle}>
            <TextInput
                className="text-base h-full text-[#CF613C] flex-1  font-regular "
                value={query}
                placeholder={'   Busca tu parque favorito.'}
                placeholderTextColor="#CF613C"
                onChangeText={(e) => setQuery(e)}
                // returnKeyType='intro'
                onSubmitEditing={() => {
                    if (!query) {
                        return Alert.alert('Missing query', "Please input something to search results across database.")
                    }

                    router.push(`/search/${query}`)
                }}
            />

            <TouchableOpacity
                className="w-12 h-10 absolute right-0"
                onPress={() => {
                    if (animation.value == 1) {
                        animation.value = 0
                        setOpenSearch(0)
                        setQuery('')
                    } else {
                        animation.value = 1
                        setOpenSearch(1)
                    }

                }}
            >
                {
                    openSearch === 1 && (
                        <View className="w-full h-full bg-white items-center justify-center rounded-full">
                            <FontAwesomeIcon icon={faEyeSlash} color='black' size={28} />
                        </View>
                    )
                }
                {
                    openSearch === 0 && (
                        <View className="w-full h-full bg-white  items-center justify-center rounded-full ">
                            <FontAwesomeIcon icon={faMagnifyingGlass} color='black' size={28} />
                        </View>
                    )
                }
            </TouchableOpacity>


        </Animated.View>
    )
}

export default SearchInput