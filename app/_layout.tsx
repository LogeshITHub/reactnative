import { Stack } from "expo-router";

export default function RootLayout() {
  const isAuth = false; // Replace with real auth logic

  return (
    <Stack>
      {isAuth ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}