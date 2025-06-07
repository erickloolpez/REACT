import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { googleOauth } from "@/lib/auth";
import { useSSO } from '@clerk/clerk-expo';
import { router } from "expo-router";
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect } from "react";
import { Alert, Image, Text, View } from "react-native";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession()

const OAuth = () => {

  const { startSSOFlow } = useSSO()
  useWarmUpBrowser()

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOauth(startSSOFlow)
      if (result?.code === 'sessions_exists') {
        Alert.alert('Session exists, redirecting to home')
        router.push('/(root)/(tabs)/home');
      }

      Alert.alert(result?.success ? "Success" : "Error", result?.message)
    } catch (err) {
      console.error("Error during Google Sign In:", err);
    }
  }, [])

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="font-Waku text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title="Log In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="secondary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;