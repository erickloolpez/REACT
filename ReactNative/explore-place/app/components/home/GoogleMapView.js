import { View, Text, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import useLocation from '../../hooks/useLocation'
import * as Location from 'expo-location';

export default function GoogleMapView() {
  const { location, setLocation } = useLocation()
  const [errorMsg, setErrorMsg] = useState(null);
  let yourLocation

  const [mapRegion, setMapRegion] = useState({
    latitude: -0.3077631314438677,
    longitude: -78.4500717340893,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })


  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access loctaion was denied')
    }
     yourLocation = await Location.getCurrentPositionAsync({ enabledHighAcurracy: true })

     setLocation({...location,
      latitude: yourLocation.coords.latitude,
      longitude: yourLocation.coords.longitude
     })

    setMapRegion({
      latitude: yourLocation.coords.latitude,
      longitude: yourLocation.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,

    })
  }

  useEffect(() => {
    userLocation()
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