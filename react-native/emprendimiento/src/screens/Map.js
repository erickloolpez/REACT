import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View,Button } from 'react-native';
import * as Location from 'expo-location';

export default function Map() {
    //Esto de aqui es para que salga una ubicacion por defecto
    const [mapRegion, setMapRegion] = useState({
        latitude: -0.3077631314438677,
        longitude: -78.4500717340893,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    //Codigo para obtener la ubicacion actual del la persona
    const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            setErrorMsg('Permission to access loctaion was denied')
        }
        let location = await Location.getCurrentPositionAsync({ enabledHighAcurracy: true })
        setMapRegion({
            latitude: location.coords.latitude ,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,

        })
    }

    useEffect(()=>{
        userLocation()
    },[])
    //Este marker de aqui se puede quitar, asi como tambien el mapView dejarle sin child
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={mapRegion}
            >
                <Marker coordinate={mapRegion} title='Marker' />
            </MapView>
            <Button title='Get Location' onPress={userLocation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
