import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";
import CustomButton from "../CustomButton";

export default function Story({ callWebhook, setCustomHeight }: { callWebhook: () => void, setCustomHeight: (height: boolean) => void }) {
  const [character, setCharacter] = useState('');
  const [place, setPlace] = useState('');
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 0} // Ajusta según tu header
    >
      <View className="flex-1 p-4 items-center justify-around">
        <View className="w-full">
          <View className="flex-row gap-2 items-center">
            <View className="w-10 h-10 bg-[#FFD200] rounded-full items-center justify-center">
              <Text className="font-BlockHead text-white" >1</Text>
            </View>
            <Text className="flex-1 font-BlockHead text-white ">Escribe el lugar para tu historia</Text>
          </View>
          <TextInput
            className="w-full h-10 mt-8 bg-white rounded-md p-2 font-Waku"
            placeholder="Escribe el nombre de tu personaje"
            placeholderTextColor="#000"
            onChangeText={(text) => setCharacter(text)}
          />
        </View>
        <View className="w-full">
          <View className="flex-row gap-2 items-center">
            <View className="w-10 h-10 bg-[#FFD200] rounded-full items-center justify-center">
              <Text className="font-BlockHead text-white" >1</Text>
            </View>
            <Text className="flex-1 font-BlockHead text-white ">Quien quieres que sea el personaje de tu historia ?</Text>
          </View>
          <TextInput
            className="w-full h-10 mt-8 bg-white rounded-md p-2 font-Waku"
            placeholder="Escribe el nombre de tu personaje"
            placeholderTextColor="#000"
            onChangeText={(text) => setPlace(text)}
            onFocus={() => setCustomHeight(true)}
            onSubmitEditing={() => {
              setCustomHeight(false);
            }}
          />
        </View>
        <CustomButton
          title="Comenzar"
          textVariant="default"
          onPress={callWebhook}
        />
      </View>
    </KeyboardAvoidingView>

  )
}