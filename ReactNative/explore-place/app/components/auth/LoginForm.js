import { View, Text, Image, TextInput, Button, StyleSheet, KeyboardAvoidingView, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react'
import Header from './Header'

export default function LoginForm() {
    return (
        <SafeAreaView>
            <TouchableWithoutFeedback onPress={()=>{
                Keyboard.dismiss()
            }}>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20} style={{ height: hp(100) }}>
                <Header />
                <View style={styles.container}>
                    <View
                        style={{
                            width: '90%',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: '400'
                            }}

                        >Welcome Back!
                        </Text>
                        <Text style={{ color: 'gray' }}>Hello there login to continue</Text>
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: '100%',
                        gap: 18
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
                    <Text>or sign in with</Text>
                    <View style={styles.containerForm}>
                        <Text >Email Address</Text>
                        <TextInput style={styles.input} />
                        <Text> Password</Text>
                        <TextInput style={styles.input} />
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
                            <Text>Forgot Password?</Text>
                        </View>
                    </View>
                    <View style={styles.button}>
                        <Button title='Login Account' />
                    </View>
                    <Text>Don't have account? Sign Up</Text>

                </View>
            </KeyboardAvoidingView>


            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'col',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: hp(60)
    },
    containerForm: {
        width: '90%',
    },
    pills: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 130,
        padding: 8,
        borderRadius: 50,
        borderWidth:1
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
        borderRadius:5,
    },
    button: {
        width: '90%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    }

})