import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import SearchInput from '../../components/SearchInput'
import FollowingIcon from '../../components/FollowingIcon'
import { images, icons, parks } from '../../constants'

const SearchValue = () => {
    const { query } = useLocalSearchParams()
    const margin = 32
    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                className="pl-4"
                data={parks}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <View className="w-[94%] flex-row mb-3">
                        <View className="w-1/2 h-[18vh] overflow-hidden rounded-md">
                            <Image source={item.image} className="w-full h-full " resizeMode="cover" />
                        </View>
                        <View className="w-1/2 px-1 justify-around">
                            <View className="w-full items-center justify-center">
                                <Text className="font-bold">{item.name}</Text>
                            </View>
                            <View className="flex-row gap-1 items-center">
                                <Image source={icons.location} className="w-5 h-5" resizeMode="contain" />
                                <Text>Provincia de Pichincha</Text>
                            </View>
                            <View className="flex-row gap-1 items-center">
                                <Image source={icons.rule} className="w-5 h-5" resizeMode="contain" />
                                <Text>121 km²</Text>
                            </View>
                            <View className="flex-row justify-between items-center">
                                <Image source={icons.flame} className="w-5 h-5" resizeMode="contain" />
                                <Text>Provincia de Pichincha</Text>
                            </View>
                            <View className="flex-row relative w-full h-12">
                                {
                                    item.icons.map((icon, iconIndex) => (
                                        < FollowingIcon key={iconIndex} places={icon} index={iconIndex} margin={item.margin * (iconIndex)} />
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                )}
                ListHeaderComponent={() => (
                    <View className="w-full items-center">
                        <View className="w-[94%] h-[80px] relative ">
                            <View className="w-[10%] h-16 mt-2 absolute ">
                                <TouchableOpacity onPress={() => router.back()}>
                                    <Image source={icons.leftArrowOrange} resizeMode="contain" className="w-full h-full" />
                                </TouchableOpacity>
                            </View>
                            <View className='absolute w-[65%]   h-16  left-12 mt-2 items-center justify-center'>
                                <Text className="text-2xl text-[#CF613C] font-bold">{query}</Text>
                            </View>
                            <SearchInput widthMeasure={"90%"} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No videos found."
                        subtitle="No videos found for this search query."
                    />
                )}
            />
        </SafeAreaView>
    )
}

export default SearchValue 