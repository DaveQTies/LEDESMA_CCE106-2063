import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerStyle: { backgroundColor: '#F6F9FC' }, headerTintColor: '#14243A', headerTitleStyle: { fontWeight: '800' } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="event/[id]" options={{ title: 'Event details' }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
