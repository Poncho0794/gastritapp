import { useTranslation } from 'react-i18next';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';

export default function Login() {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme ?? 'light');

  const { t } = useTranslation();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../assets/images/gastritapp_logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}> {t('LOGIN_PAGE_TITLE')}</Text>
        <Text style={styles.text}> {t('LOGIN_PAGE_SUBTITLE')}</Text>
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
      color: theme === 'dark' ? '#d8f0e8' : '#122b23',
    },
    title: {
      color: theme === 'dark' ? '#d8f0e8' : '#122b23',
      fontSize: 24,
      fontWeight: 'bold',
    },
    logo: {
      width: 150,
      height: 150,
    },
  });
