import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="chat" options={{ headerShown: false }} />
    </Stack>
  )
}

export default Layout