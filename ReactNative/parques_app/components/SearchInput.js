import { TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { usePathname, router } from 'expo-router'

import { icons } from '../constants'
import { Search01Icon, SearchSquareIcon, ViewOffSlashIcon } from 'hugeicons-react-native'

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
                animation.value == 1 ? withTiming(widthLength, { duration: 500 }) : withTiming('20%', { duration: 500 }),
        }
    })

    let iconToShow

    if (openSearch === 0) {
        iconToShow =
            <SearchSquareIcon
                size={38}
                color={"#17301A"}
                variant={"stroke"}
            />
    } else {
        iconToShow =
            <ViewOffSlashIcon
                size={24}
                color={"#cf613c"}
                variant={"stroke"}
            />
    }


    return (
        <Animated.View className={`${openSearch ? 'border-2 bg-white' : 'border-0'} border-green-800  absolute right-0 mt-2  w-[90%] h-12 px-4  rounded-full focus:border-[#CF613C] items-center flex-row space-x-4 `} style={animatedStyle}>
            <TextInput
                className="text-base  text-[#CF613C]  font-regular flex-1"
                value={query}
                placeholder={'   Busca tu parque favorito.'}
                placeholderTextColor="#CF613C"
                onChangeText={(e) => setQuery(e)}
                returnKeyType='intro'
                onSubmitEditing={() => {
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
                    } else {
                        animation.value = 1
                        setOpenSearch(1)
                    }

                }}
            >
                {
                    iconToShow
                }
            </TouchableOpacity>


        </Animated.View>
    )
}

export default SearchInput