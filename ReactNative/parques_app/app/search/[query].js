import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, TextInput, Alert, Pressable } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { router, useLocalSearchParams } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import EmptyState from '../../components/EmptyState';
import { parks } from '../../constants';
import Nav from '../../components/search/nav';
import { LinearGradient } from 'expo-linear-gradient';

const SearchValue = () => {
    const { query } = useLocalSearchParams();
    const [data, setData] = useState([]);
    const [newQuery, setNewQuery] = useState('')

    const attractives = parks.flatMap((park) => park.trend);

    useEffect(() => {
        if (query === "Parks") {
            setData(parks);
        } else if (query === "Attractives") {
            setData(attractives);
        } else if (query === "Popular") {
            const results = attractives.slice(0, 10)
            setData(results)
        } else {
            const results = parks.filter((park) => park.name.toLowerCase().includes(query.toLowerCase()))
            setData(results)
        }
    }, []);

    return (
        <LinearGradient className="w-full h-full" colors={['#5A3F37', '#2C7744']}>
            <SafeAreaView edges={['top']} className="h-full">
                <View className="w-full h-[8vh] flex-row justify-around items-center ">
                    <Pressable
                        onPress={() => router.back()}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} color='white' size={32} />
                    </Pressable>
                    <TextInput
                        className="w-[84%] h-10 bg-white rounded-full px-4"
                        value={newQuery}
                        placeholder={'Busca tu parque favorito.'}
                        placeholderTextColor="#CF613C"
                        onChangeText={(e) => setNewQuery(e)}
                        // returnKeyType='intro'
                        onSubmitEditing={() => {
                            const results = parks.filter((park) => park.name.toLowerCase().includes(newQuery.toLowerCase()))
                            setData(results)
                        }}
                    />
                </View>

                <Nav setData={setData} />

                {data.length > 0 ? (
                    <MasonryList
                        data={data}
                        keyExtractor={(item) => item.name}
                        numColumns={2} // Puedes ajustar este valor según el diseño
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    if (query === "Parks") {
                                        router.push(`/modals/${item.name}`)

                                    } else {
                                        let parkTrend = parks.find((park) =>
                                            park.trend.some((trend) => trend.name === item.name)
                                        );

                                        router.push({
                                            pathname: `/attractive/${item.desc}`,
                                            params: { modalPark: true, trend: JSON.stringify(item), park: JSON.stringify(parkTrend) }
                                        })
                                    }
                                }}
                                style={{ width: '100%', margin: 5, overflow: 'hidden' }}
                            >
                                <Image
                                    source={item.image}
                                    resizeMode="cover"
                                    style={{ width: '96%', height: Math.random() * 150 + 100, borderRadius: 10 }} // Altura aleatoria para diseño estilo Pinterest
                                />
                                <Text className="text-white font-semibold">{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <EmptyState
                        title="Ningun parque encontrado."
                        subtitle="Recuerda usar el nombre del parque."
                    />
                )}

            </SafeAreaView >
        </LinearGradient>
    );
};

export default SearchValue;
