import { View, Dimensions, Image, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import PlaceDetailDesc from './PlaceDetailDesc'

export default function PlaceDetailItem({ place }) {

    const barStyles = (state) => {
        if (state == 'pendiente') {
            return {
                width: `8%`,
                backgroundColor: '#73c902'
            }
        } else if (state == 'proceso') {
            return {
                width: `50%`,
                backgroundColor: '#73c902'
            }
        } else {
            return {
                width: `100%`,
                backgroundColor: '#73c902'
            }
        }
    }
    const iconStyles = (state, index) => {
        if (state == 'pendiente' && index == 0) {
            return {
                backgroundColor: '#73c902'
            }
        } else if (state == 'proceso' && (index == 1 || index == 0)) {
            return {
                backgroundColor: '#73c902'
            }
        } else if (state == 'completado' && index <= 2) {
            return {
                backgroundColor: '#73c902'
            }
        } else {
            return {
                backgroundColor: 'white'
            }
        }
    }

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
            <Text style={{
                fontSize: 20,
                marginTop: 12
            }}> Status </Text>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 20
            }}>
                <View style={styles.cardContainer}>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={require('../../../assets/images/send.png')} />
                    </View>
                    <Text style={{ marginTop: 8 }}>Pendiente</Text>
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={require('../../../assets/images/process.png')} />
                    </View>
                    <Text style={{ marginTop: 8 }}>En Proceso</Text>
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={require('../../../assets/images/complete.png')} />
                    </View>
                    <Text style={{ marginTop: 8 }}>Completado</Text>
                </View>
            </View>
            <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 22,
            }}>
                <View style={styles.bgBar}>
                    <View style={[styles.bar, barStyles(place.estado)]} />
                    <View style={[styles.icon, { left: -1, top: -10 }, iconStyles(place.estado, 0)]}>
                        <Image source={require('../../../assets/images/Check.png')} />
                    </View>
                    <View style={[styles.icon, { right: '46%', top: -10 }, iconStyles(place.estado, 1)]}>
                        <Image source={require('../../../assets/images/Check.png')} />
                    </View>
                    <View style={[styles.icon, { right: -1, top: -10 }, iconStyles(place.estado, 2)]}>
                        <Image source={require('../../../assets/images/Check.png')} />
                    </View>
                </View>
            </View>
            <PlaceDetailDesc place={place}/>

        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'col',
        alignItems: 'center',
    },
    imgContainer: {
        padding: 5,
        borderWidth: 2,
        borderRadius: 10,
    },
    img: {
        width: 50,
        height: 50,
    },
    bgBar: {
        backgroundColor: '#dedede',
        width: '78%',
        height: 5,
        borderRadius: 20,
        position: 'relative',
        borderWidth: 1,
    },
    bar: {
        height: '100%',
        borderRadius: 20,
    },
    icon: {
        position: 'absolute',
        zIndex: 2,
        borderRadius: 50,
        borderWidth: 2

    }
})