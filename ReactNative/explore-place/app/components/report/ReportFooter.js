import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import useLocation from '../../hooks/useLocation'

export default function ReportFooter({ dropdown, image, inputValue, setImage, setInputValue, setDropDown }) {
    const { location, addPlace } = useLocation()

    const cleanInputs = async (image) => {
        try {
            setImage(null)
            setInputValue('')
            setDropDown(null)
        } catch (error) {
            throw error
        }
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
            <TouchableOpacity style={styles.containerButtons}>
                <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.containerButtons, { backgroundColor: '#ffa929' }]}
                onPress={() => {
                    let newPlace = {
                        id: '1',
                        latitude: location.latitude,
                        longitude: location.longitude,
                        nombre: 'Basurero Urb Bohios',
                        peticiones: 8,
                        imagen: `${image}`,
                        estado: 'pendiente',
                        descripcion: `${inputValue}`,
                        tipo: 'basurero'
                    }
                    cleanInputs()
                    addPlace(newPlace)
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