import { View , TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import {useState} from 'react'
import Animated,{ useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { icons } from '../constants'

const SearchInput = ({ }) => {
    const animation = useSharedValue(0)
    const animatedStyle = useAnimatedStyle(()=>{
        return{
            width:
                animation.value == 1 ? withTiming('100%',{duration:500}) :withTiming('20%',{duration:500})
        }
    })
    const [openSearch, setOpenSearch] = useState(0)

    return (
        <Animated.View className="border-2 absolute right-0 mt-2  border-black-200 w-[90%] h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4" style={animatedStyle}>
            <TextInput
                className="text-base mt-0.5 text-white flex-1 font-regular bg-red-400"
                value={''}
                placeholder= "Search for a video topic."
                placeholderTextColor="#cdcde0"
                onChangeText={(e)=> setQuery(e)}
            />

            <TouchableOpacity
                onPress = {()=>{
                    if(animation.value == 1){
                        animation.value = 0
                        setOpenSearch(0)
                    }else{
                        animation.value = 1
                        setOpenSearch(1)
                    }
                    // if(!query){
                    //     return Alert.alert('Missing query',"Please input something to search results across database.")
                    // }

                    // if(pathname.startsWith('/search')) router.setParams({query})
                    //     else router.push(`/search/${query}`)
                }}
            >
                <Image
                    source = { openSearch == 1 ? icons.eyeHide : icons.search}
                    className ="w-5 h-5 "
                    resizeMode = "contain"
                />
            </TouchableOpacity>


        </Animated.View>
    )
}

export default SearchInput