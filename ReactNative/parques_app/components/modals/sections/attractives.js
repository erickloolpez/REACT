import { router } from 'expo-router'
import MasonryList from '@react-native-seoul/masonry-list';
import { View, Text, Image, TouchableOpacity } from 'react-native'

const Attractives = ({ attractives, park }) => {
    return (
        <View className="w-full min-h-[56vh] px-2 pt-4">
            <MasonryList
                data={attractives}
                keyExtractor={(item) => item.name}
                numColumns={2} // Puedes ajustar este valor según el diseño
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            router.push({
                                pathname: `/attractive/${item.desc}`,
                                params: { modalPark: true, trend: JSON.stringify(item), park: JSON.stringify(park) }
                            })
                        }}
                        style={{ width: '100%', margin: 5, overflow: 'hidden' }}
                    >
                        <Image
                            source={item.image}
                            resizeMode="cover"
                            style={{ width: '96%', height: Math.random() * 150 + 100, borderRadius: 10 }} // Altura aleatoria para diseño estilo Pinterest
                        />
                        <Text className="text-primary font-semibold">{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Attractives