import { TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { usePathname, router } from 'expo-router'

import { icons } from '../constants'

const SearchInput = ({ initialQuery, widthMeasure }) => {
    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery || '')
    const widthLength = widthMeasure || '100%'
    const [placeholder, setPlaceHolder] = useState('')

    const [openSearch, setOpenSearch] = useState(0)

    const animation = useSharedValue(0)
    const animatedStyle = useAnimatedStyle(() => {
        return {
            width:
                animation.value == 1 ? withTiming(widthLength, { duration: 500 }) : withTiming('18%', { duration: 500 })
        }
    })

    return (
        <Animated.View className={`${openSearch ? 'border-0' : 'border-0'} border-green-800 bg-[#FBEECC]  absolute right-0 mt-2  w-[90%] h-16 px-4  rounded-md focus:border-[#CF613C] items-center flex-row space-x-4`} style={animatedStyle}>
            <TextInput
                className="text-base mt-0.5 text-[#CF613C] flex-1 font-regular "
                value={query}
                placeholder={placeholder}
                placeholderTextColor="#CF613C"
                onChangeText={(e) => setQuery(e)}
                returnKeyType='intro'
                onSubmitEditing={()=>{
                    if (!query) {
                        return Alert.alert('Missing query', "Please input something to search results across database.")
                    }

                    if (pathname.startsWith('/search')) router.setParams({ query })
                    else router.push(`/search/${query}`)
                }}
            />

            <TouchableOpacity
                onPress={() => {
                    if (animation.value == 1) {
                        animation.value = 0
                        setOpenSearch(0)
                        setQuery('')
                        setPlaceHolder('')
                    } else {
                        animation.value = 1
                        setPlaceHolder('Busca tu parque favorito.')
                        setOpenSearch(1)
                    }

                }}
            >
                <Image
                    source={openSearch == 1 ? icons.eyeHide : icons.search}
                    className="w-5 h-5 "
                    resizeMode="contain"
                />
            </TouchableOpacity>


        </Animated.View>
    )
}

export default SearchInput