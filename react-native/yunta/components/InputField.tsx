import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { InputFieldProps } from "@/types/type";
import { Eye, EyeClosed } from "lucide-react-native";
import React from "react";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  setCustomHeight = () => { },
  showPassword,
  setShowPassword = () => { },
  ...props
}: InputFieldProps) => {

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={` text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500  ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              className={`rounded-full p-4 text-[15px] bg-[#ddd] flex-1 ${inputStyle} text-left`}
              onFocus={() => setCustomHeight(true)}
              onSubmitEditing={() => setCustomHeight(false)}
              secureTextEntry={showPassword ? !showPassword : secureTextEntry}
              {...props}
            />
            {secureTextEntry ? (
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: 16 }}
              >
                {showPassword ? (
                  <EyeClosed size={20} color="#000" />
                ) : (
                  <Eye size={20} color="#000" />
                )}
              </Pressable>
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;