import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Slot } from 'expo-router';
import 'react-native-reanimated';
import '../utils/i18n.js'; // importar configuración

import { useColorScheme } from '@/src/hooks/useColorScheme';
import { useSession } from '../hooks/useSession';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { session, isLoading } = useSession();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded || isLoading) {
    return null;
  }
  if (!session) {
    return <Redirect href="/(login)" />;
  }
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Slot />
    </ThemeProvider>
  );
}
