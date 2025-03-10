import { View, Dimensions, Image, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import PlaceDetailTags from './PlaceDetailTags'
import PlaceDetailDesc from './PlaceDetailDesc'
import PlaceDetailState from './PlaceDetailState'
import PlaceDetailChat from './PlaceDetailChat'
import PlaceDetailPipol from './PlaceDetailPipol'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native"

export default function PlaceDetailItem({ place}) {
    const navigator = useNavigation()

    const [mapRegion, setMapRegion] = useState({
        latitude: place.latitude,
        longitude: place.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0121,
    })

    return (
        <View style={{position:'relative'}}>
            <View style={{ width: '10%', height: 40, backgroundColor: 'transparent', position: 'absolute', zIndex:2,top:10, left:4 }}>
                <AntDesign name="left" size={32} style={{ position: 'absolute', top: '4%', left: '5%' }} color="white" onPress={() => navigator.goBack()} />
            </View>
            <View style={{ position: 'relative', zIndex: 1 }}>
                <MapView
                    style={{
                        width: Dimensions.get('screen').width * 1,
                        height: Dimensions.get('screen').height * 0.28,
                    }}
                    region={mapRegion}

                >
                    <Marker
                        title={place.nombre}
                        coordinate={mapRegion}

                    />
                </MapView>

            </View>
            <PlaceDetailTags place={place} />
            <PlaceDetailDesc place={place} />
            <PlaceDetailState place={place} />
            <Text style={{ padding: 8, fontSize: 16, fontWeight: 500, marginTop: 24, marginBottom: 10 }}>Personas que sigue el caso: #{place.peticiones}</Text>
            <PlaceDetailPipol />
            <PlaceDetailChat place={place} />

        </View>
    )
}
