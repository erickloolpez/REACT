import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import SearchInput from '../../components/SearchInput'
import FollowingIcon from '../../components/FollowingIcon'
import EmptyState from '../../components/EmptyState'
import { images, icons, parks } from '../../constants'
import { ArrowLeft01Icon, DirectionRight02Icon, MapsIcon } from 'hugeicons-react-native'

const SearchValue = () => {
    const { query } = useLocalSearchParams()
    const results = parks.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                className="pl-2"
                data={results}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress = {()=>router.push(`/modals/${item.name}`)}
                    >
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
                                        <DirectionRight02Icon
                                            size={28}
                                            color={"black"}
                                            variant={"stroke"}
                                        />
                                        <Text>Provincia de Pichincha</Text>
                                    </View>
                                    <View className="flex-row gap-1 items-center">
                                        <MapsIcon
                                            size={28}
                                            color={"black"}
                                            variant={"stroke"}
                                        />
                                        <Text>121 km²</Text>
                                    </View>
                                    <View className="flex-row justify-center items-center">
                                        <Text className="text-terciary font-bold">Actividades</Text>
                                    </View>
                                    <View className="flex-wrap flex-row content-center relative w-full h-12 bg-secondary">
                                        {
                                            item.icons.map((icon, index) => (
                                                < FollowingIcon key={index} icon={icon.image} />
                                            ))
                                        }
                                    </View>
                                </View>
                            </View>
                            <View className="w-full h-full rounded-xl bg-secondary z-10 absolute top-2"></View>
                        </View>

                    </TouchableOpacity>
                )}
                ListHeaderComponent={() => (
                    <View className="w-full items-center">
                        <View className="w-[94%] h-[80px] relative ">
                            <View className="w-[10%] h-16 mt-4 absolute ">
                                <TouchableOpacity onPress={() => router.back()}>
                                    <ArrowLeft01Icon
                                        size={42}
                                        color={"#cf613c"}
                                        variant={"stroke"}
                                    />
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
                        title="Ningun parque encontrado."
                        subtitle="Recuerda usar el nombre del parque."
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default SearchValue 