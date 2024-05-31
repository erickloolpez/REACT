import { useState, useEffect } from 'react'
import { View, Text, Image, TextInput, Button, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import Header from './Header'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';


export default function LoginForm() {
    const [error, setError] = useState("");
    const { login, auth, listAuth } = useAuth()

    const navigator = useNavigation()
    const onSignUpClick = () => {
        navigator.navigate('register')
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: (formValue) => {
            const { username, password } = formValue;

            let usuario

            listAuth.forEach((item) => {
                if (item[0].nombre == username) {
                    usuario = item[0]
                }
            })

            console.log('FILTRO USUARIO', usuario)

            if (usuario.nombre != username || usuario.contra != password) {
                setError("El usuario o la contraseña no son correcto");
                console.log('se cayo')
            } else {
                login(usuario);
            }
        },
    });

    return (
        <View style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Image source={require('../../../assets/images/waveAlreves.png')} style={{ width: 250, height: 230, objectFit: 'cover', position: 'absolute', right: 0, top: 0, zIndex: 2 }} />
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }}>
                <View style={{ width: '100%', height: '50%', backgroundColor: 'green', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                    <View>
                        <Text>Hola de nuevo!</Text>
                    </View>
                    <View>
                        <TextInput style={{ borderWidth: 1 }} placeholder={'Email'} placeholderTextColor={'gray'} />
                        <TextInput style={{ borderWidth: 1 }} placeholder={'Clave'} placeholderTextColor={'gray'} />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text>Iniciar Sesion</Text>
                        <View style={{backgroundColor: '#5D6A70', borderRadius:50}}>
                            <AntDesign name="arrowright" size={28} color="white" />
                        </View>
                    </View>
                    <Text>O continua con ...</Text>
                    <View style={{display:'flex', flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{width:50, height:50,backgroundColor: 'white', padding:5, borderRadius:50, shadowOffset:{width:-1, height:2}, shadowOpacity:0.6, shadowRadius:1}}>
                            <Image source={require('../../../assets/images/facebook.png')} style={{width:'100%', height:'100%'}} />
                        </View>
                        <View style={{width:50, height:50,backgroundColor: 'white', padding:5, borderRadius:50, shadowOffset:{width:-1, height:2}, shadowOpacity:0.6, shadowRadius:1}}>
                            <Image source={require('../../../assets/images/google.png')} style={{width:'100%', height:'100%'}} />
                        </View>
                        <View style={{width:50, height:50,backgroundColor: 'white', padding:5, borderRadius:50, shadowOffset:{width:-1, height:2}, shadowOpacity:0.6, shadowRadius:1}}>
                            <Image source={require('../../../assets/images/instagram.png')} style={{width:'100%', height:'100%'}} />
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Text>No cuentas con una cuenta?<Text style={{textDecorationLine:'underline'}}> Registrate</Text></Text>
                    </TouchableOpacity>

                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

function initialValues() {
    return {
        username: "",
        password: "",
    };
}

function validationSchema() {
    return {
        username: Yup.string().required("El usuario es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria"),
    };
}