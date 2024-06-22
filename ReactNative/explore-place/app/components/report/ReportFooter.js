import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import useLocation from '../../hooks/useLocation'
import useAuth from '../../hooks/useAuth'

export default function ReportFooter({ dropdown, image, inputValue, setImage, setInputValue, setDropDown, triggerModalForm, setVerifyAddress, closeModalTicket }) {
    const { auth } = useAuth()
    const { location, addPlace, placeList } = useLocation()

    const cleanInputs = async (image) => {
        try {
            setImage(null)
            setInputValue('')
            setDropDown(null)
        } catch (error) {
            throw error
        }
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    function haversineDistance(userLocation, circleCenter) {
        const R = 6371e3; // radio medio de la Tierra en metros
        const φ1 = toRadians(userLocation.latitude);
        const φ2 = toRadians(circleCenter.latitude);
        const Δφ = toRadians(circleCenter.latitude - userLocation.latitude);
        const Δλ = toRadians(circleCenter.longitude - userLocation.longitude);

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    return (
        <View style={{
            width: '90%',
            height: '20%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        }}>
            <TouchableOpacity style={styles.containerButtons} onPress={() => closeModalTicket()}>
                <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.containerButtons, { backgroundColor: '#ffa929' }]}
                onPress={() => {
                    let flag = true
                    let newPlace = {
                        id: '1',
                        latitude: location.latitude,
                        longitude: location.longitude,
                        nombre: 'Basurero Urb Bohios',
                        peticiones: 12,
                        imagen: `${image}`,
                        estado: 'pendiente',
                        descripcion: `${inputValue}`,
                        tipo: `${dropdown}`
                    }

                    cleanInputs()
                    placeList.forEach(place => {
                        const circleCenter = { latitude: place.latitude, longitude: place.longitude }
                        if (haversineDistance(location, circleCenter) <= 100) {
                            flag = false
                        }
                    })
                    if (flag) {
                        setVerifyAddress({
                            value: true,
                            title: 'REPORTE EXITOSO!',
                            text: 'Felicitaciones! Tu reporte se ha generado con exito.',
                            button: 'HECHO',
                        })
                        addPlace(newPlace)
                        auth.reportes.push(newPlace)
                    } else {
                        console.log('no puedes, ya existen un punto ahi.')
                        setVerifyAddress({
                            value: false,
                            title: 'OH NO...',
                            text: 'Algo salio mal, intentalo de nuevo.',
                            button: 'INTENTAR',
                        })
                    }
                    triggerModalForm()
                }}
            >
                <Text>Enviar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    containerButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '32%',
        height: '60%',
        borderWidth: 1,
        borderRadius: 8,
    },

})