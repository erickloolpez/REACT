import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker'
import camera from '../../assets/images/camara.png'
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

    const removeImage = ()=>{
        try{
            saveImage(null)
        }catch({message}){
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
                display: 'flex',
                flexDirection: 'col',
                alignItems: 'center',
                backgroundColor: '#dedede'
            }}>
                <View style={{
                    width: '90%',
                    height: '30%',
                    backgroundColor: 'white',
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderBottomWidth: 0
                }}>
                    <View style={{
                        width: '60%',
                        height: '100%',
                        position: 'relative',
                    }}>
                        <Image style={{ width: '100%', height: '100%', objectFit: 'contain' }} source={require('../../assets/images/Icon Container.png')} />
                        <Image style={{ position: 'absolute', right: 0, bottom: 10, backgroundColor: '#60A096', width: 50, height: 50, borderRadius: 50 }} source={require('../../assets/images/check_white.png')} />

                    </View>



                </View>
                <View style={{
                    width: '90%',
                    height: '70%',
                    backgroundColor: 'red',
                    position: 'relative',
                    borderWidth: 2,
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
                            placeholder="Select item"
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
                    <TouchableOpacity style={{
                        width: '90%',
                        height: '30%',
                        backgroundColor: 'blue',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                        onPress={()=>{
                            setOpenModal(true)
                        }}
                    
                    >
                        <Image source={image ? { uri: image } : camera} style={{ width: '50%', height: '100%', resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <TextInput style={{
                        width: '90%',
                        height: '20%',
                        backgroundColor: 'white',
                    }} multiline />
                </View>
                <Modal
                    visible={openModal}
                    transparent={true}
                >
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>
                        <TouchableOpacity style={{
                            width: 100,
                            height: 30,
                            backgroundColor: 'white'
                        }}
                            onPress={()=>uploadImage()}
                        >
                        <Text>Camara</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: 100,
                            height: 30,
                            backgroundColor: 'white'
                        }}
                            onPress={()=>uploadImage('gallery')}
                        
                        >
                        <Text>Album</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: 100,
                            height: 30,
                            backgroundColor: 'white'
                        }}
                            onPress={()=> removeImage()}
                        
                        >
                        <Text>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>

        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
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