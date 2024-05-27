import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import MapView, { Marker, Circle, Callout } from 'react-native-maps'

export default function Map() {
    const params = useRoute().params

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
                    params.placeList.map((marker, index) => (
                        <React.Fragment key={index}>
                            <Circle
                                center={{ latitude: marker.latitude, longitude: marker.longitude }}
                                radius={500}
                                fillColor={circleStyle(marker.estado)}
                            />
                            <Marker
                                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                title={marker.name}
                            >
                                <Callout>
                                    <Image style={{ width: '100%', height: 50 }} source={require('../../../assets/images/basurero.jpg')} />
                                    <Text>{marker.nombre}</Text>
                                </Callout>
                            </Marker>
                        </React.Fragment>
                    ))
                }


            </MapView>

        </View>
    )
}