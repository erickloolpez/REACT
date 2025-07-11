import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import OAuth from '@/components/OAuth'
import { icons, images } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { useSignUp } from '@clerk/clerk-expo'
import axios from 'axios'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { ReactNativeModal } from 'react-native-modal'


const SignUp = () => {
  const { setUser } = useGlobalContext()
  const { isLoaded, signUp, setActive } = useSignUp()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [customHeight, setCustomHeight] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: "",
  })


  const onSignUpPress = async () => {
    if (!isLoaded) return

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({
        ...verification,
        state: 'pending'
      })
    } catch (err: any) {
      Alert.alert("error", err.errors[0].longMessage)
    }
  }

  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        axios.post(`http://172.20.20.10:3003/users`, {
          password: form.password,
          email: form.email,
        })
          .then(response => {
            console.log('Usuario creado en la base de Datos ✅');
            console.log('Usuario:', response.data);
            setUser(response.data);
          })
          .catch(err => {
            console.log('Error guardando al usuario ❌', err);
          });

        await setActive({ session: signUpAttempt.createdSessionId })
        setVerification({
          ...verification,
          state: 'success'
        })
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
        setVerification({
          ...verification,
          state: 'failed'
        })
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed"
      })
    }
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className={`relative w-full ${customHeight ? 'h-[100px] ' : 'h-[250px] '} justify-center  items-center   `}>
        <Image source={images.banner} className={`${customHeight ? "hidden" : "block"} z-0 w-full  scale-[0.7] `} resizeMode={"contain"} />
        <Text className="font-Waku text-2xl text-black font-JakartaSemiBold absolute bottom-0 left-5">Crea tu cuenta</Text>
      </View>
      <View className="p-5">
        <InputField
          label="Nombre"
          placeholder="Ingresa tu nombre"
          placeholderTextColor="#8c8c8c"
          icon={icons.person}
          value={form.name}
          onChangeText={(value) =>
            setForm({ ...form, name: value })
          }
        />
        <InputField
          label="Email"
          placeholder="Ingresa tu email"
          placeholderTextColor="#8c8c8c"
          icon={icons.email}
          value={form.email}
          onChangeText={(value) =>
            setForm({ ...form, email: value })
          }
        />

        <InputField
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          placeholderTextColor="#8c8c8c"
          icon={icons.lock}
          value={form.password}
          secureTextEntry={true}
          setCustomHeight={setCustomHeight}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onChangeText={(value) =>
            setForm({ ...form, password: value })
          }
        />
        <View className="mt-10">
          <CustomButton
            title="Registrarse"
            textVariant="default"
            onPress={onSignUpPress}
          />

          <OAuth />

          <Text className="font-Waku text-lg text-center text-general-200 mt-10">
            Ya tienes una cuenta? {" "}
            <Link href="/sign-in" className="text-blue-500">Iniciar Sesion</Link>
          </Text>
        </View>
      </View>

      <ReactNativeModal
        isVisible={verification.state === 'pending'}
        onModalHide={() => {
          if (verification.state === 'success') setShowSuccessModal(true)
        }
        }
      >
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Text className="text-2xl font-BlockHead mb-2 ">Verification</Text>
          <Text className="font-Jakarta mb-5">We've sent a verification code to {form.email}</Text>
          <InputField
            label="Code"
            icon={icons.lock}
            placeholder="12345"
            value={verification.code}
            keyboardType='numeric'
            onChangeText={(code) => setVerification({ ...verification, code })}
          />

          {verification.error && (
            <Text className="text-red-500 text-sm mt-1">
              {verification.error}
            </Text>
          )}

          <CustomButton
            title="Verify Email"
            textVariant="default"
            onPress={onVerifyPress}
            className="mt-5 bg-success-500"
          />

        </View>
      </ReactNativeModal>

      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" />
          <Text className="text-3xl font-BlockHead text-center" >Verified</Text>
          <Text className="text-base text-gray-400 font-Jakarta text-center">You have successfully verified</Text>
          <CustomButton
            title="Browse Home"
            textVariant="default"
            onPress={() => {
              setShowSuccessModal(false)
              router.replace('/(root)/(tabs)/home')
            }
            }
            className="mt-5"
          />
        </View>
      </ReactNativeModal>

    </ScrollView >
  )
}

export default SignUp