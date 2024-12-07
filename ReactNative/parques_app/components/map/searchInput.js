import { View, Text, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { usePathname, router } from 'expo-router'
import { parks } from '../../constants'

const SearchInput = ({  setFilteredParks }) => {
    const pathname = usePathname()
    const [query, setQuery] = useState('')
    return (
        <View className="w-full h-16 absolute top-0 items-center justify-center">
            <View className="flex-row w-[90%] h-12 bg-white items-center rounded-full p-2">
                <FontAwesomeIcon icon={faMagnifyingGlass} color='black' size={28} />
                <TextInput
                    className="flex-1 h-full text-base px-2 "
                    placeholder=' Encuentra tu parque favorito'
                    onChangeText={(e) => setQuery(e)}
                    onSubmitEditing={() => {
                        const results = parks.filter((park) => park.name.toLowerCase().includes(query.toLowerCase()))
                        setFilteredParks(results)
                    }}
                />

            </View>
        </View>
    )
}

export default SearchInput