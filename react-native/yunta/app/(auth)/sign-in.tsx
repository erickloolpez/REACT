import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import OAuth from '@/components/OAuth'
import { icons, images } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { useClerk, useSignIn } from '@clerk/clerk-expo'
import axios from 'axios'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'


const SignIn = () => {
  const { setUser } = useGlobalContext()
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const { signOut } = useClerk()

  const handleSignOut = async () => {
    try {
      await signOut()
      // // Redirect to your desired page
      // Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  handleSignOut()

  const onSignInPress = async () => {
    if (!isLoaded) return

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        axios.get(`http://192.168.100.10:3003/users?email=${form.email}`)
          .then(response => {
            console.log('Usuario encontrado en la base de Datos ✅');
            console.log('Usuario:', response.data);
            setUser(response.data);
          })
          .catch(err => {
            console.log('Error encontrando al usuario ❌', err);
          });
        router.replace('/(root)/(tabs)/home')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }


  return (
    <ScrollView className="flex-1 bg-white">
      <View className=" flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-lg font-BlockHead absolute bottom-5 left-5">Welcome 👋</Text>
        </View>
        <View className="p-5" >
          <InputField
            label="Email"
            placeholder="enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) =>
              setForm({ ...form, email: value })
            }
          />
          <InputField
            label="Password"
            placeholder="enter your password"
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value) =>
              setForm({ ...form, password: value })
            }
          />
          <View className="mt-10">
            <CustomButton
              title="Sign In"
              textVariant="default"
              onPress={onSignInPress}
            />

            <OAuth />

            <Text className="font-Waku text-lg text-center text-general-200 mt-10">
              Don't have an account ? {" "}
              <Text onPress={() => router.back()} className="text-blue-500">Sign Up</Text>
            </Text>

          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default SignIn