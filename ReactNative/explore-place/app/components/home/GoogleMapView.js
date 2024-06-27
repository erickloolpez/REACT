import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { Marker, Circle, Callout } from 'react-native-maps'
import useLocation from '../../hooks/useLocation'
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native'
import { EvilIcons } from '@expo/vector-icons';

export default function GoogleMapView({ placeList }) {

  const navigator = useNavigation()
  const openMap = (mapRegion) => {
    navigator.navigate('map-complete', { coords: mapRegion, placeList: placeList })
  }

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

  const { location, setLocation } = useLocation()
  const [errorMsg, setErrorMsg] = useState(null);
  let yourLocation

  const [mapRegion, setMapRegion] = useState({
    latitude: -0.3077631314438677,
    longitude: -78.4500717340893,
    latitudeDelta: 0.09,
    longitudeDelta: 0.035,
  })


  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access loctaion was denied')
    }
    yourLocation = await Location.getCurrentPositionAsync({ enabledHighAcurracy: true })

    setLocation({
      ...location,
      latitude: yourLocation.coords.latitude,
      longitude: yourLocation.coords.longitude
    })

    setMapRegion({
      latitude: yourLocation.coords.latitude,
      longitude: yourLocation.coords.longitude,
      latitudeDelta: 0.016,
      longitudeDelta: 0.005,
    })
  }

  useEffect(() => {
    userLocation()
  }, [])


  return (
    <View style={{
      width: '90%',
      height: 230,
      marginTop: 20,
    }}>
      <View style={{
        width: '100%',
        height: '10%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
      }}>
        <Text style={{fontSize:16, fontWeight:600}}>
        Reportes en el Mapa
        </Text>
        <EvilIcons name="arrow-right" size={30} color="black" onPress={()=>openMap(mapRegion)} />
      </View>
      <View style={{
        width: '100%',
        height: '84%',
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 10,
        borderWidth: 2
      }} >
        <MapView
          style={{
            width: '100%',
            height: '100%',
          }}
          region={mapRegion}
          // onPress={() => openMap(mapRegion)}
        >
          <Marker
            title='You'
            coordinate={mapRegion}

          />
          {
            placeList.map((marker, index) => (
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
                    <Image style={{ width: '100%', height: 50 }} source={{uri:marker.imagen}} />
                    <Text>{marker.nombre}</Text>
                  </Callout>
                </Marker>
              </React.Fragment>
            ))
          }

        </MapView>

      </View>
    </View>
  )
}