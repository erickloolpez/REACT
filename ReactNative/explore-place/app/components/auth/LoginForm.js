import { useState, useEffect } from 'react'
import { View, Text, Image, TextInput, Button, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import Header from './Header'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            height: '100%'
        }}>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }}>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20} style={{}}>
                    <Header />
                    <View style={styles.container}>
                        <View
                            style={{
                                width: '90%',
                                height: '10%',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: '400'
                                }}

                            >Hola de nuevo!
                            </Text>
                            <Text style={{ color: 'gray', marginTop: 4 }}>Hello there login to continue</Text>
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: '100%',
                            gap: 18,
                            height: '10%',
                        }}>
                            <View style={styles.pills}>
                                <Image
                                    source={require('../../../assets/images/google.png')}
                                    style={styles.pillsImage}
                                />
                                <Text>Google</Text>
                            </View>
                            <View style={styles.pills}>
                                <Image
                                    source={require('../../../assets/images/facebook.png')}
                                    style={styles.pillsImage}
                                />
                                <Text>Facebook</Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '10%' }}>
                            <Text>o iniciar con</Text>
                        </View>
                        <View style={styles.containerForm}>
                            <Text >Email</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize='none'
                                value={formik.values.username}
                                onChangeText={(text) => formik.setFieldValue('username', text)}

                            />
                            <Text>Clave</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize='none'
                                secureTextEntry={true}
                                value={formik.values.password}
                                onChangeText={(text) => formik.setFieldValue('password', text)}
                            />
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
                                <Text>Olvido su clave?</Text>
                            </View>
                        </View>
                        <View style={styles.button}>
                            <Button title='Iniciar Sesion' onPress={formik.handleSubmit} />
                        </View>
                        <TouchableOpacity sytle={{
                            width: '90%',
                            height: '10%',
                        }} onPress={() => onSignUpClick()}>
                            <Text>No tiene un usuario? Registrese</Text>
                        </TouchableOpacity>
                        <View style={{
                            width: '90%',
                            height: '10%',
                        }}>
                            <Text style={styles.error}>{formik.errors.username}</Text>
                            <Text style={styles.error}>{formik.errors.password}</Text>
                            <Text style={styles.error}>{error}</Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
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

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '70%',
        display: 'flex',
        flexDirection: 'col',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderTopRightRadius: 70,
    },
    containerForm: {
        width: '90%',
        height: '40%',
    },
    pills: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 130,
        padding: 8,
        borderRadius: 50,
        borderWidth: 1
    },
    pillsImage: {
        width: 30,
        height: 30,
        marginRight: 12
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    button: {
        width: '90%',
        height: '10%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    error: {
        textAlign: "center",
        color: "#f00",
        marginTop: 20,
    }

})