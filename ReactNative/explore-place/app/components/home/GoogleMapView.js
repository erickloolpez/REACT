import { View, Text, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MapView, {Marker} from 'react-native-maps'
import { UserLocationContext } from '@/app/context/UserLocationContext'

export default function GoogleMapView() {
  const [mapRegion, setMapRegion] = useState({
    latitude: -0.3077631314438677,
    longitude: -78.4500717340893,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const { location, setLocation } = useContext(UserLocationContext)

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
      })
    }
  }, [])


  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{
        fontSize: 20,
        marginBottom: 10,
        fontWeight: '600',
      }}>
        Top Near By Places
      </Text>
      <View>
        <MapView
          style={{
            width: Dimensions.get('screen').width * 0.9,
            height: Dimensions.get('screen').height * 0.23,
            borderRadius: 20,
          }}
          showsUserLocation={true}
          region={mapRegion}

        >
          <Marker 
          title='You'
          coordinate={mapRegion}
          
          />

        </MapView>

      </View>
    </View>
  )
}