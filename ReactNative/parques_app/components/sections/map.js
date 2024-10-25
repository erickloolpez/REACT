import { View, Text } from 'react-native'
import { useState } from 'react'
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps'
import { useGlobalContext } from '../../context/GlobalProvider'

const Map = ({ place }) => {
    const { userLocation, setUserLocation } = useGlobalContext()
    const [origin, setOrigin] = useState({
        latitude: place.latitude,
        longitude: place.longitude,
    })

    if (userLocation) console.log(userLocation)
    return (
        <View className="w-full bg-green-400">
            <View className="mt-3 mb-4">
                <Text className="text-xl text-terciary">Ubicacion:</Text>
            </View>
            <View className="w-full h-[38vh] items-center">
                <MapView className="w-[80%] h-full"
                    initialRegion={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        latitudeDelta: userLocation ? 5 : 0.4,
                        longitudeDelta: userLocation ? 0.4 : 0.1
                    }}
                >
                    <Polygon
                        coordinates={place.polygon}
                        fillColor={'rgba(100,100,200,0.3)'}
                        strokeWidth={1}
                    />
                    <Marker
                        coordinate={origin}
                        title={place.name}
                    />
                    {
                        userLocation && (
                            <Marker
                                coordinate={userLocation}
                                title={'Tu'}
                            />
                        )
                    }
                    {
                        userLocation && (
                            <Polyline
                                coordinates={[userLocation, origin] }
                                strokColor="yellow"
                                strokeWidth={2}
                            />
                        )

                    }
                </MapView>

            </View>

        </View>
    )
}

export default Map