import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import SearchInput from '../../components/SearchInput'
import FollowingIcon from '../../components/FollowingIcon'
import { images, icons, parks } from '../../constants'

const SearchValue = () => {
    const { query } = useLocalSearchParams()
    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                className="pl-2"
                data={parks}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <View className="w-[98%] min-h-[24vh] h-[24vh]  mb-5 relative">
                        <View className="w-full h-full flex-row absolute bg-primary border-2 rounded-xl  z-20">
                            <View className="w-1/2 h-[97%]" >
                                <Image source={item.image} className="w-full h-full rounded-tl-xl rounded-bl-xl " resizeMode="cover" />
                            </View>
                            <View className="w-1/2 px-1 justify-around ">
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
                                <View className="flex-wrap flex-row content-center relative w-full h-12 bg-secondary">
                                    {
                                        item.icons.map((icon, index) => (
                                            < FollowingIcon key={index} places={icon} index={index} margin={item.margin * (index)} />
                                        ))
                                    }
                                </View>
                            </View>
                        </View>
                        <View className="w-full h-full rounded-xl bg-secondary z-10 absolute top-2"></View>
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
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default SearchValue 