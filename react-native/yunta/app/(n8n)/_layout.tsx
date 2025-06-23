
import { Stack, useLocalSearchParams } from "expo-router";

const Layout = () => {
  const { query } = useLocalSearchParams()
  return (
    <Stack>
      <Stack.Screen name="[query]" options={{ headerShown: false }} />
    </Stack>
  )
}

export default Layout