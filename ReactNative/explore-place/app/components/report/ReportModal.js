import { View, Text, Modal, Image, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

export default function ReportModal({ openModal, removeImage, uploadImage }) {
    return (
        <Modal
            visible={openModal}
            transparent={true}
        >
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)'
            }}>
                <View style={{
                    width: '80%',
                    height: '28%',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'col',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    borderRadius: 10
                }}>
                    <View style={{
                        height: '20%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{ fontSize: 18 }}>Sube una Fotografia</Text>
                    </View>
                    <View style={{
                        width: '100%',
                        height: '80%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',

                    }}>
                        <TouchableOpacity style={styles.containerOptions}
                            onPress={() => uploadImage()}
                        >
                            <Image source={require('../../../assets/images/cameraIcon.png')} />
                            <Text>Camara</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.containerOptions}
                            onPress={() => uploadImage('gallery')}
                        >
                            <Image source={require('../../../assets/images/albumIcon.png')} />
                            <Text>Album</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.containerOptions}
                            onPress={() => removeImage()}
                        >
                            <Image source={require('../../../assets/images/Close.png')} />
                            <Text style={{}}>Cancelar</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    containerOptions: {
        width: '30%',
        height: '60%',
        backgroundColor: '#e6e4df',
        display: 'flex',
        flexDirection: 'col',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 8,
    },

})