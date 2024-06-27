import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image, Keyboard } from 'react-native'
import { useFormik } from 'formik'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native"
import * as Yup from 'yup'
import useAuth from '../../hooks/useAuth'

export default function RegistrationForm(props) {
    const navigator = useNavigation()
    const { navigation } = props
    const { signUp, listAuth } = useAuth()
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: (formValue) => {
            console.log('Valores del Form Registro:', formValue)

            setError("");

            const { username, email, password, passwordTwo } = formValue;

            const user = {
                username,
                email,
                password,
                passwordTwo,
                reportes: []
            }
            let answer = signUp(user)
            if (answer) {
                navigator.navigate('existLogin')
            } else {
                setError('Ya existe ese usuario')
            }
        },
    });


    return (
        <View style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'white'
        }}>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }}>
                <View style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
                    <Image source={require('../../../assets/images/waveAlreves.png')} style={{ width: 250, height: 160, objectFit: 'fill', position: 'absolute', right: 0, top: 0, zIndex: 1 }} />
                    <AntDesign name="left" size={24} style={{ position: 'absolute', top: '4%', left: '5%' }} color="black" onPress={()=>navigation.goBack()} />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', zIndex: 2, width: 110, position: 'absolute', top: '10%', left: '5%' }}>
                        <Text style={{ fontSize: 28, fontWeight: 500 }}>Crear Cuenta</Text>
                    </View>
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'absolute', top: '24%' }}>
                        <View style={{ width: '90%' }}>
                            <TextInput style={{ borderBottomWidth: 1, borderColor: '#b5bac9', paddingBottom: 14, paddingTop: 4, paddingLeft: 2, marginBottom: 22, fontSize: 16 }} placeholder={'Nombre'} placeholderTextColor={'gray'} autoCapitalize={'none'} value={formik.values.username} onChangeText={(text) => formik.setFieldValue('username', text)} />
                            <TextInput style={{ borderBottomWidth: 1, borderColor: '#b5bac9', paddingBottom: 14, paddingTop: 4, paddingLeft: 2, marginBottom: 22, fontSize: 16 }} placeholder={'Correo'} placeholderTextColor={'gray'} autoCapitalize={'none'} value={formik.values.email} onChangeText={(text) => formik.setFieldValue('email', text)} />
                            <TextInput style={{ borderBottomWidth: 1, borderColor: '#b5bac9', paddingBottom: 14, paddingTop: 4, paddingLeft: 2, marginBottom: 22, fontSize: 16 }} placeholder={'Clave'} placeholderTextColor={'gray'} autoCapitalize={'none'} value={formik.values.password} onChangeText={(text) => formik.setFieldValue('password', text)} secureTextEntry={true} />
                            <TextInput style={{ borderBottomWidth: 1, borderColor: '#b5bac9', paddingBottom: 14, paddingTop: 4, paddingLeft: 2, fontSize: 16 }} placeholder={'Confirme su Clave'} placeholderTextColor={'gray'} autoCapitalize={'none'} value={formik.values.passwordTwo} onChangeText={(text) => formik.setFieldValue('passwordTwo', text)} secureTextEntry={true} />
                        </View>
                    </View>
                    <View style={{ width: 200, height: 20, position: 'absolute', bottom: '38%', left: '26%', overflow: 'hidden' }}>
                        {Object.values(formik.errors).map((err, index) => (
                            <Text key={index.toString()} style={{ height: 20, marginBottom: 10, textAlign: 'center', color: '#f00' }}>
                                {err}
                            </Text>
                        ))}
                    </View>
                    <View style={{ width: 200, height: 20, position: 'absolute', bottom: '38%', left: '26%', overflow: 'hidden' }}>
                        <Text style={{ height: 20, marginBottom: 10, textAlign: 'center', color: '#f00' }}>{error}</Text>
                    </View>
                    <View style={{ width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', bottom: '28%', left: '5%' }}>
                        <Text style={{ fontSize: 28, fontWeight: 500 }}>Regristrarse</Text>
                        <View style={{ backgroundColor: '#60BC55', borderRadius: 50, padding: 16 }}>
                            <TouchableOpacity onPress={()=>formik.handleSubmit()}>
                                <AntDesign name="arrowright" size={28} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: '25%' }}>
                        <Text>O continua con ...</Text>
                    </View>
                    <View style={{ width: '100%', display: 'flex', gap: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: '13%' }}>
                        <View style={{ width: 60, height: 60, backgroundColor: 'white', padding: 12, borderRadius: 50, shadowOffset: { width: -1, height: 2 }, shadowOpacity: 0.6, shadowRadius: 1 }}>
                            <Image source={require('../../../assets/images/facebook.png')} style={{ width: '100%', height: '100%' }} />
                        </View>
                        <View style={{ width: 60, height: 60, backgroundColor: 'white', padding: 12, borderRadius: 50, shadowOffset: { width: -1, height: 2 }, shadowOpacity: 0.6, shadowRadius: 1 }}>
                            <Image source={require('../../../assets/images/google.png')} style={{ width: '100%', height: '100%' }} />
                        </View>
                        <View style={{ width: 60, height: 60, backgroundColor: 'white', padding: 12, borderRadius: 50, shadowOffset: { width: -1, height: 2 }, shadowOpacity: 0.6, shadowRadius: 1 }}>
                            <Image source={require('../../../assets/images/instagram.png')} style={{ width: '100%', height: '100%' }} />
                        </View>
                    </View>
                    <View style={{ width: '90%', position: 'absolute', bottom: '5%', left: '5%' }}>
                        <TouchableOpacity onPress={() => { onSignUpClick() }}>
                            <Text style={{ textDecorationLine: 'underline' }}>Terminos y Conidiciones</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

function initialValues() {
    return {
        username: "",
        email: "",
        password: "",
        passwordTwo: ""
    };
}

function validationSchema() {
    return {
        username: Yup.string().required("El usuario es obligatorio"),
        email: Yup.string().required("El email es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria"),
        passwordTwo: Yup.string().oneOf([Yup.ref('password')], 'Las dos claves deben coincidir').required("Debes confirmar tu password"),
    };
}