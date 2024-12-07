import { TextInput, TouchableOpacity, Alert, View } from 'react-native'
import { useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { usePathname, router } from 'expo-router'

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons'

const SearchInput = ({animation, animatedStyle, setOpenSearch, openSearch}) => {
    const pathname = usePathname()
    const [query, setQuery] = useState('')

    return (
        <Animated.View className={`border-green-800  absolute right-0 h-14 px-4  rounded-full items-center flex-row bg-white `} style={animatedStyle}>
            <TextInput
                className=" h-10 px-2 text-[#CF613C] flex-1  "
                value={query}
                placeholder={'   Busca tu parque favorito.'}
                placeholderTextColor="#CF613C"
                onChangeText={(e) => setQuery(e)}
                // returnKeyType='intro'
                onSubmitEditing={() => {
                    if (!query) {
                        return Alert.alert('Valor Faltante', "Por favor ingresa algo para buscarlo en la base de datos.")
                    }

                    router.push(`/search/${query}`)
                }}
            />

            <TouchableOpacity
                className="w-12 h-12 absolute right-0 "
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