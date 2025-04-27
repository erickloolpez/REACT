import { Text, View } from 'react-native'
import { Link } from 'expo-router'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import CustomButton from '@/components/CustomButton'

export default function Page() {
  const { user } = useUser()

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <CustomButton title='Perro' />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}