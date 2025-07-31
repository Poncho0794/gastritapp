import { Redirect, Stack } from 'expo-router';
const isAuthenticated = false; // Replace with actual authentication logic
const AuthLayout = () => {
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
