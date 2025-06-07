
import { fetchAPI } from "@/lib/fetch";
import * as AuthSession from 'expo-auth-session';
import { router } from "expo-router";


export const googleOauth = async (startSSOFlow: any) => {
  try {
    // Start the authentication process by calling `startSSOFlow()`
    const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
      strategy: 'oauth_google',
      // For web, defaults to current path
      // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
      // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
      redirectUrl: AuthSession.makeRedirectUri(),
    })

    // If sign in was successful, set the active session
    if (createdSessionId) {
      if (setActive) {
        setActive!({ session: createdSessionId })
        router.replace('/(root)/(tabs)/home') // Redirect to home after successful sign in

        if (signUp?.createdUserId) {
          await fetchAPI('/app/(api)/user+api.ts', {
            method: 'POST',
            body: JSON.stringify({
              name: `${signUp.firstName} ${signUp.lastName}`,
              email: signUp.emailAddress,
              clerkId: signUp.createdUserId,
            }),
          })
        }
        return {
          success: true,
          code: 'success',
          message: 'You have successfully signed in with Google.',
        }
      }
      return {
        success: false,
        message: 'No active session found.',
      }
    }
  } catch (err) {
    console.log(err)

    return {
      success: false,
      message: "An error occured"
    }

  }
} 
