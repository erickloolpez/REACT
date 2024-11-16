import { View, Text, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { Search02Icon } from 'hugeicons-react-native'

const SearchInput = () => {
    const [query, setQuery] = useState('')
    return (
        <View className="w-full h-16 absolute top-0 items-center justify-center">
            <View className="flex-row w-[90%] h-12 bg-white items-center rounded-full p-2">
                <Search02Icon
                    className="mr-2"
                    size={32}
                    color={"#17301A"}
                    variant={"stroke"}
                />
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