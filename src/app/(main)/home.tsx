import { Colors } from '@/src/constants/Colors';
import { useAuthStore } from '@/src/stores/authStore';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
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
  // create a logOut function that calls the logOut method from the auth store
  const { logout, user, fetchUser } = useAuthStore();
  useEffect(() => {
    fetchUser();
  }, []);
  console.log('User in HomeScreen:', user);
  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/(login)');
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred during logout. Please try again.');
    }
  };
  const { t } = useTranslation();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>{t('HOME_WELCOME')}</Text>
          <Text style={styles.name}>
            {user?.firstName} {user?.lastName}
          </Text>
          <View style={styles.description}>
            <Text style={styles.text}>{t('HOME_DESCRIPTION')}</Text>
            <Button title={t('LOGOUT')} onPress={() => handleLogout()} />
          </View>
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
    description: {
      marginVertical: 20,
      alignItems: 'center',
      paddingHorizontal: 20,
      gap: 20,
    },
    text: {
      color: Colors[theme ?? 'light'].text,
    },
    title: {
      color: Colors[theme ?? 'light'].text,
      fontSize: 24,
      fontWeight: 'bold',
    },
    name: {
      color: Colors[theme ?? 'light'].text,
      fontSize: 20,
      fontWeight: '600',
    },
    logo: {
      width: 150,
      height: 150,
    },
  });
