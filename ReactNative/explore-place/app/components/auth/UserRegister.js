import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAuth from '../../hooks/useAuth'

export default function RegistrationForm() {
    const [error, setError] = useState("");
    const { signUp, listAuth } = useAuth()
    const listUsers = []

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: (formValue) => {
            setError("");
            const { username, email, password, passwordTwo } = formValue;

            if (password !== passwordTwo) {
                setError("Las password deben ser iguales");
            } else {
                const user = {
                    nombre: username,
                    correo: email,
                    contra: password,
                    contraDo: passwordTwo
                }

                listUsers.push(user)
                signUp(listUsers)


                Alert.alert('SUCCESS', 'Tu cuenta se ha creado con exito!', [
                    {
                        text: 'Muy Bien',
                        onPress: () => console.log('se cerro la alerta')
                    }
                ])

            }
        },
    });


    return (
        <View style={{ flex: 1, display: 'flex', flexDirection: 'col', alignItems: 'center', backgroundColor: 'white' }}>
            <View style={{
                width: '90%',
                marginBottom: 20,
                marginTop: 30
            }}>
                <Text style={{ fontSize: 30 }}>Sign Up</Text>
            </View>
            <View style={{
                width: '90%',
                height: 400,
                display: 'flex',
                flexDirection: 'col',
                justifyContent: 'space-between'
            }}>
                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    autoCapitalize='none'
                    placeholderTextColor='gray'
                    value={formik.values.username}
                    onChangeText={(text) => formik.setFieldValue('username', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    autoCapitalize='none'
                    placeholderTextColor='gray'
                    value={formik.values.email}
                    onChangeText={(text) => formik.setFieldValue('email', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    autoCapitalize='none'
                    placeholderTextColor='gray'
                    secureTextEntry={true}
                    value={formik.values.password}
                    onChangeText={(text) => formik.setFieldValue('password', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Confirm Password'
                    autoCapitalize='none'
                    placeholderTextColor='gray'
                    secureTextEntry={true}
                    value={formik.values.passwordTwo}
                    onChangeText={(text) => formik.setFieldValue('passwordTwo', text)}
                />
            </View>
            <View style={{ marginTop: 30 }}>
                <Button title="Sign Up" onPress={formik.handleSubmit} />
            </View>
            <Text style={styles.error}>{formik.errors.username}</Text>
            <Text style={styles.error}>{formik.errors.password}</Text>
            <Text style={styles.error}>{error}</Text>
        </View>
    );
};

function initialValues() {
    return {
        username: "",
        email: '',
        password: "",
        passwordTwo: ''
    };
}

function validationSchema() {
    return {
        username: Yup.string().required("El usuario es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria"),
        email: Yup.string().required("El email es obligatorio"),
        passwordTwo: Yup.string().required("Debes confirmar tu password"),
    };
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        height: 50,
        backgroundColor: '#f5f5f5',
        marginBottom: 30,
        borderRadius: 8,
        padding: 10
    }
})