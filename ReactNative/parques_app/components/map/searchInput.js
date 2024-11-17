import { View, Text, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { usePathname, router } from 'expo-router'

const SearchInput = () => {
    const pathname = usePathname()
    const [query, setQuery] = useState('')
    return (
        <View className="w-full h-16 absolute top-0 items-center justify-center">
            <View className="flex-row w-[90%] h-12 bg-white items-center rounded-full p-2">
                <FontAwesomeIcon icon={faMagnifyingGlass} color='black' size={32} />
                <TextInput
                    className="flex-1 h-full text-base "
                    placeholder=' Encuentra tu parque favorito'
                    onChangeText={(e) => setQuery(e)}
                    onSubmitEditing={() => {
                        if (!query) {
                            return Alert.alert('Missing query', "Please input something to search results across database.")
                        }
                    }}
                />

            </View>
        </View>
    )
}

export default SearchInput