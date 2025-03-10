import { View, ScrollView, Image, Text, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
// import { getCurrentUser, signIn } from '../../lib/appwrite'
// import { useGlobalContext } from '../../context/GlobalProvider'
import { images } from '../../constants'


const SignIn = () => {
    const {setUser, setIsLogged} = useGlobalContext()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const submit = async()=>{
        if( form.email === "" || form.password === ""){
            Alert.alert('Error','Please fill in all the fields')
        }

        setIsSubmitting(true)

        try{
            await signIn(form.email, form.password)
            const result = await getCurrentUser()
            setUser(result)
            setIsLogged(true)

            Alert.alert('Success','User signed in successfully')
            router.replace('/home')

        }catch(error){
            Alert.alert('Error',error.message)
        }finally{
            setIsSubmitting(false)
        }

    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className='w-full justify-center min-h-[75vh] px-4 my-6'>
                    <View
                        className="w-[115px] h-[35px]"
                    >
                        <Text style={{ fontFamily: 'Pilowlava-Regular' }} className="text-4xl text-green-900 ">GEA</Text>
                    </View>

                    <Text className="text-2xl text-terciary text-semibold mt-10 font-psemibold">Log in to Gea</Text>

                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyBoardType="email-address"

                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-7"
                    />

                    <CustomButton
                        title="Sign In"
                        handlePress={submit}
                        // handlePress={() => router.replace('/home')}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />

                    <View className='justify-center pt-5 flex-row gap-2'>
                        <Text className="text-lg text-gray-100 font-pregular">
                            Don't have account?
                        </Text>
                        <Link href="/sign-up" className="text-lg font-psemibold text-green-900">Sign Up</Link>


                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn