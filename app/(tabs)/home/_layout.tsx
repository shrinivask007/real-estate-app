import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" options={{ presentation: 'modal' }} />
      <Stack.Screen name="filter" options={{ presentation: 'modal' }} />
    </Stack>
  );
} 