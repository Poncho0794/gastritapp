import { Colors } from '@/src/constants/Colors';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme ?? 'light');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to GastritApp!</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>
            This is the home screen of your app. Start building something
            amazing!
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const getStyles = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors[theme ?? 'light'].background,
    },
    text: {
      color: Colors[theme ?? 'light'].text,
    },
    title: {
      color: Colors[theme ?? 'light'].text,
      fontSize: 24,
      fontWeight: 'bold',
    },
    logo: {
      width: 150,
      height: 150,
    },
  });
