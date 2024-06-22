import { View, Image, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import ModalForm from '../components/report/ReportModal'
import ReportForm from '../components/report/ReportForm'

export default function Report({ stateModal, closeModalTicket }) {
    const [openModal, setOpenModal] = useState(false)
    const [image, setImage] = useState()


    const uploadImage = async (mode) => {
        let result = {}
        try {
            if (mode == 'gallery') {
                await ImagePicker.requestMediaLibraryPermissionsAsync()
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                })

            } else {
                await ImagePicker.requestCameraPermissionsAsync()
                result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.back,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                })
            }

            if (!result.canceled) {
                await saveImage(result.assets[0].uri)
            }
        } catch (error) {
            alert('Error uploading image:' + error.message)
            setOpenModal(false)
        }
    }

    const saveImage = async (image) => {
        try {
            setImage(image)
            setOpenModal(false)
        } catch (error) {
            throw error
        }
    }

    const removeImage = () => {
        try {
            saveImage(null)
        } catch ({ message }) {
            alert(message)
            setOpenModal(false)
        }
    }



    return (
            <Modal visible={stateModal} transparent={true}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    <View style={{
                        width: '90%',
                        height: '80%',
                        display: 'flex',
                        flexDirection: 'col',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View style={{//Contenedor donde esta el MAIL grande
                            width: '90%',
                            height: '20%',
                            backgroundColor: 'white',
                            borderTopLeftRadius: 50,
                            borderTopRightRadius: 50,
                            borderWidth: 2,
                            borderBottomWidth: 0,
                            overflow: 'hidden',
                        }}>
                            <View style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderStyle: 'dotted',
                                borderWidth: 2,
                                margin: -2,
                                marginBottom: 0,
                            }}>
                                <View style={{//Contenedor donde esta la foto del MAIN grande
                                    width: '60%',
                                    height: '80%',
                                    position: 'relative',
                                }}>
                                    <Image style={{ width: '100%', height: '100%', objectFit: 'contain' }} source={require('../../assets/images/Icon Container.png')} />
                                    <Image style={{ position: 'absolute', right: '20%', bottom: '-1%', backgroundColor: '#60A096', width: 30, height: 30, borderRadius: 50 }} source={require('../../assets/images/check_white.png')} />

                                </View>
                            </View>
                        </View>
                        <ReportForm image={image} setImage={setImage} setOpenModal={setOpenModal} closeModalTicket={closeModalTicket} />
                        <ModalForm openModal={openModal} removeImage={removeImage} uploadImage={uploadImage} />
                    </View>


                </View>

            </Modal>
    )
}