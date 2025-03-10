import { View, Text, Image, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import MapView, { Marker, Circle, Callout } from 'react-native-maps'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';
import DetailMap from './DetailMap'
import { useNavigation } from '@react-navigation/native'
import useLocation from '../../hooks/useLocation'

export default function Map() {
    const params = useRoute().params
    const navigator = useNavigation()
    const { depureListSearchBar, placeSearch } = useLocation()
    const [searchValue, setSearchValue] = useState('')

    const onPlaceClick = (item) => {
        navigator.navigate('place-detail', { place: item })
    }

    const [mapRegion, setMapRegion] = useState({
        latitude: params.coords.latitude,
        longitude: params.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.015,
    })

    const circleStyle = (estado) => {
        let color

        if (estado == 'pendiente') {
            color = '#ff7676'
        } else if (estado == 'proceso') {
            color = '#ffff77'
        } else {
            color = '#5ccb5f'
        }

        return color
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', height: '18%', position: 'absolute', zIndex: 2 }}>
                <LinearGradient colors={['white', 'transparent']} style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }} start={{ x: 0.5, y: 0.25 }}  >
                    <Text style={{ width: '90%', fontSize: 22, fontWeight: 500, marginTop: 8 }}>Descubre</Text>
                    <View style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                    }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderWidth: 2, width: '90%', height: 42, backgroundColor: 'white', borderRadius: 8, paddingLeft: 10, }}>
                            <AntDesign name="search1" size={24} color="black" />
                            <TextInput placeholder='Busqueda de Reportes' placeholderTextColor={'gray'}
                                style={{ borderColor: '#000', padding: 4, borderRadius: 50, paddingLeft: 10 }}
                                onChangeText={(value) => setSearchValue(value)}
                                onSubmitEditing={() =>{
                                     depureListSearchBar(searchValue)
                                }}
                            />
                        </View>
                    </View>

                </LinearGradient>
            </View>

            <View style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
                <MapView
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    region={mapRegion}
                >
                    <Marker
                        title='You'
                        coordinate={params.coords}
                    />
                    {
                        // params.placeList.map((marker, index) => (
                        placeSearch.map((marker, index) => (
                            <React.Fragment key={index}>
                                <Circle
                                    center={{ latitude: marker.latitude, longitude: marker.longitude }}
                                    radius={100}
                                    fillColor={circleStyle(marker.estado)}
                                />
                                <Marker
                                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                    title={marker.name}
                                >
                                    <Callout>
                                        <Image style={{ width: '100%', height: 50 }} source={{ uri: marker.imagen }} />
                                        <Text>{marker.nombre}</Text>
                                    </Callout>
                                </Marker>
                            </React.Fragment>
                        ))
                    }
                </MapView>
            </View>
            <View style={{ width: '100%', height: '28%', position: 'absolute', zIndex: 2, bottom: 0, paddingHorizontal: 10, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    // data={params.placeList}
                    data={placeSearch}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ marginRight: 30, marginLeft: 6 }} onPress={() => onPlaceClick(item)}>
                            <DetailMap place={item} />
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}