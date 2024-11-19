import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, TextInput, Pressable } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { router, useLocalSearchParams } from 'expo-router';
import { MotiView } from 'moti';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Animated, { FadeInDown, FadeOutUp, LinearTransition } from 'react-native-reanimated'
import { faBicycle, faCamera, faCampground, faPersonHiking, faPersonSwimming, faSailboat } from '@fortawesome/free-solid-svg-icons';

import EmptyState from '../../components/EmptyState';
import { parks } from '../../constants';
import Nav from '../../components/search/nav';

const SearchValue = () => {
    const { query } = useLocalSearchParams();
    const [data, setData] = useState([]);

    const attractives = parks.flatMap((park) => park.trend);

    useEffect(() => {
        if (query === "Parks") {
            setData(parks);
        } else {
            setData(attractives);
        }
    }, []);

    const parksID = ['Fotografia', 'Buceo', 'Camping', 'Ciclismo', 'Canotaje', 'Senderismo']
    const [selectedIndex, setSelectedIndex] = useState(null)
    const activeColor = "#fff"
    const inactiveColor = "#ggg"
    const activeBackgroundColor = "#cf613c"
    const inactiveBackgroundColor = "#17301a"
    const options = [faCamera, faPersonSwimming, faCampground, faBicycle, faSailboat, faPersonHiking]

    function Icon({ index }) {
        const activity = options[index]
        return <FontAwesomeIcon icon={activity} color='white' size={32} />
    }
    return (
        <SafeAreaView className="bg-primary w-full h-full">
            <View className="w-full h-[8vh] flex-row justify-around items-center ">
                <FontAwesomeIcon icon={faAngleLeft} color='black' size={32} />
                <TextInput
                    className="w-[84%] h-10 bg-white rounded-full"
                />
            </View>
            <Nav setData={setData}/>
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
                            style={{width:'100%', margin: 5, overflow: 'hidden' }}
                        >
                            <Image
                                source={item.image}
                                resizeMode="cover"
                                style={{ width: '96%', height: Math.random() * 150 + 100, borderRadius: 10 }} // Altura aleatoria para diseño estilo Pinterest
                            />
                            <Text className="text-terciary font-semibold">{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <EmptyState
                    title="Ningun parque encontrado."
                    subtitle="Recuerda usar el nombre del parque."
                />
            )}
        </SafeAreaView>
    );
};

export default SearchValue;
