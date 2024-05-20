import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker'
import placeholder from '../../assets/images/placeholder.jpg'
export default function Report() {
    const [openModal, setOpenModal] = useState(false)
    const [value, setValue] = useState(null);
    const [image, setImage] = useState()

    const data = [
        { label: 'Basurero', value: '1' },
        { label: 'Parque', value: '2' },
        { label: 'Calle', value: '3' },
    ];

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


    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === value && (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
            </View>
        );
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{
                width:'100%',
                height:'100%',
                display: 'flex',
                flexDirection: 'col',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#dedede'
            }}>
                <View style={{//Contenedor donde esta el MAIL grande
                    width: '90%',
                    height: '20%',
                    backgroundColor: 'white',
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    overflow: 'hidden',
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
                <View style={{//Contenedor donde esta el formulario
                    width: '90%',
                    height: '70%',
                    backgroundColor: 'white',
                    position: 'relative',
                    borderWidth: 2,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    borderTopWidth: 0,
                    display: 'flex',
                    flexDirection: 'col',
                    alignItems: 'center'
                }}>
                    <View style={{
                        position: 'absolute',
                        width: 30,
                        height: 30,
                        backgroundColor: '#dedede',
                        borderRightWidth: 2,
                        borderRadius: 50,
                        top: -18,
                        left: -12,
                    }} />
                    <View style={{
                        position: 'absolute',
                        width: 30,
                        height: 30,
                        backgroundColor: '#dedede',
                        borderLeftWidth: 2,
                        borderRadius: 50,
                        top: -18,
                        right: -12,
                    }} />
                    <View style={{
                        width: '90%',
                        height: '10%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{ fontSize: 16 }}>Por favor completa el formuario</Text>
                    </View>
                    <View style={{ width: '90%', height: '20%' }}>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Selecciona una categoria"
                            searchPlaceholder="Search..."
                            value={value}
                            onChange={item => {
                                setValue(item.value);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                            )}
                            renderItem={renderItem}
                        />
                    </View>
                    <View style={{
                        width: '90%',
                        height: '20%',
                    }}>
                        <TextInput
                            placeholderTextColor={'gray'}
                             placeholder='Ingresa una descripcion del reporte que vas a realizar....' multiline style={{height:'80%', backgroundColor:'white'}}
                        />
                    </View>
                    <TouchableOpacity style={{
                        width: '90%',
                        height: '30%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        borderWidth:1,
                        borderRadius:4
                    }}
                        onPress={() => {
                            setOpenModal(true)
                        }}
                    >
                        <Image source={image ? { uri: image } : placeholder} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </TouchableOpacity>
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
                        <TouchableOpacity style={[styles.containerButtons, { backgroundColor: '#ffa929' }]}>
                            <Text>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
                                    <Image source={require('../../assets/images/cameraIcon.png')} />
                                    <Text>Camara</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.containerOptions}
                                    onPress={() => uploadImage('gallery')}
                                >
                                    <Image source={require('../../assets/images/albumIcon.png')} />
                                    <Text>Album</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.containerOptions}
                                    onPress={() => removeImage()}
                                >
                                    <Image source={require('../../assets/images/Close.png')} />
                                    <Text style={{}}>Cancelar</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </Modal>
            </View>

        </TouchableWithoutFeedback>
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
    dropdown: {
        margin: 16,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});