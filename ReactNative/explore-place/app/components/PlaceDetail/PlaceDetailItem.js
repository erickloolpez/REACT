import { View, Dimensions, Image, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import PlaceDetailTags from './PlaceDetailTags'
import PlaceDetailDesc from './PlaceDetailDesc'
import PlaceDetailState from './PlaceDetailState'
import PlaceDetailChat from './PlaceDetailChat'
import PlaceDetailPipol from './PlaceDetailPipol'

export default function PlaceDetailItem({ place }) {


    const [mapRegion, setMapRegion] = useState({
        latitude: place.latitude,
        longitude: place.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0121,
    })

    return (
        <View style={{
        }}>
            <MapView
                style={{
                    width: Dimensions.get('screen').width * 1,
                    height: Dimensions.get('screen').height * 0.28,
                }}
                region={mapRegion}

            >
                <Marker
                    title='You'
                    coordinate={mapRegion}

                />
            </MapView>
            <PlaceDetailTags place={place} />
            <PlaceDetailDesc place={place} />
            <PlaceDetailState place={place}/>
            <PlaceDetailChat place={place}/>
            <Text style={{padding:8, fontSize:16, fontWeight:500, marginBottom:10}}>Personas que sigue el caso: #{place.peticiones}</Text>
            <PlaceDetailPipol/>

        </View>
    )
}
