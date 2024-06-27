import { useState } from 'react'
import { View, Text, Image, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

export default function LoginForm() {
    const [error, setError] = useState("");
    const { getList, login } = useAuth()

    const navigator = useNavigation()
    const onSignUpClick = () => {
        navigator.navigate('register')
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: (formValue) => {
            setError('')
            console.log('Valores del Form del Login:', formValue)

            const { username, password } = formValue;

            let list = getList()
            console.log('Valores de ListAuth', list)

            let usuario = list.find((item) => item.username == username)

            // console.log('Valores de Usuario:', usuario)

            if (usuario) {
                if (usuario.username != username || usuario.password != password) {
                    setError("El usuario o la contraseña no son correctos");
                } else {
                    login(usuario)
                }
            } else {
                setError("El usuario o la contraseña no son correctos");
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
                    <Image source={require('../../../assets/images/waveAlreves.png')} style={{ width: 250, height: 230, objectFit: 'cover', position: 'absolute', right: 0, top: 0, zIndex: 1 }} />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', zIndex: 2, width: 100, position: 'absolute', top: '20%', left: '5%' }}>
                        <Text style={{ fontSize: 28, fontWeight: 500 }}>Hola de nuevo!</Text>
                    </View>
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'absolute', top: '38%' }}>
                        <View style={{ width: '90%' }}>
                            <TextInput style={{ borderBottomWidth: 1, borderColor: '#b5bac9', paddingBottom: 14, paddingTop: 4, paddingLeft: 2, marginBottom: 22, fontSize: 16 }} placeholder={'Usuario'} placeholderTextColor={'gray'} autoCapitalize={'none'} value={formik.values.username} onChangeText={(text) => formik.setFieldValue('username', text)} />
                            <TextInput style={{ borderBottomWidth: 1, borderColor: '#b5bac9', paddingBottom: 14, paddingTop: 4, paddingLeft: 2, fontSize: 16 }} placeholder={'Clave'} placeholderTextColor={'gray'} autoCapitalize={'none'} value={formik.values.password} onChangeText={(text) => formik.setFieldValue('password', text)} secureTextEntry={true} />
                        </View>
                    </View>
                    <View style={{ width: 200, height: 20, position: 'absolute', bottom: '40%', left: '26%', overflow: 'hidden' }}>
                        {Object.values(formik.errors).map((err, index) => (
                            <Text key={index.toString()} style={{ height: 20, marginBottom: 10, textAlign: 'center', color: '#f00' }}>
                                {err}
                            </Text>
                        ))}
                    </View>
                    <View style={{ height: 20, position: 'absolute', bottom: '40%', left: '17%', overflow: 'hidden' }}>
                        <Text style={{ height: 20, marginBottom: 10, textAlign: 'center', color: '#f00' }}>{error}</Text>
                    </View>
                    <View style={{ width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', bottom: '30%', left: '5%' }}>
                        <Text style={{ fontSize: 28, fontWeight: 500 }}>Iniciar Sesion</Text>
                        <View style={{ backgroundColor: '#5D6A70', borderRadius: 50, padding: 16 }}>
                            <TouchableOpacity onPress={()=>formik.handleSubmit()}>
                                <AntDesign name="arrowright" size={28} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: '26%' }}>
                        <Text>O continua con ...</Text>
                    </View>
                    <View style={{ width: '100%', display: 'flex', gap: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: '14%' }}>
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
                            <Text>No cuentas con una cuenta?<Text style={{ textDecorationLine: 'underline' }}> Registrate</Text></Text>
                        </TouchableOpacity>
                    </View>
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