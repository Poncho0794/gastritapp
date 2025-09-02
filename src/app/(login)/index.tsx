import Input from '@/src/components/features/auth/Input';
import { useAuthStore } from '@/src/stores/authStore';
import { Link, router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

export default function Login() {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme ?? 'light');
  const { signIn } = useAuthStore();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: '',
      password: '',
    },
  });
  const onSubmit = async (data: any) => {
    try {
      await signIn(data.userName, data.password).catch((error) => {});
      router.replace('/(main)/home');
    } catch (error: any) {
      console.error('Error during sign-in:', error);
      alert(error.message || 'An error occurred during sign-in.');
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <Image
              source={require('../../assets/images/gastritapp_logo.png')}
              style={styles.logo}
            />
            <Text style={styles.title}> {t('LOGIN_PAGE_TITLE')}</Text>
            <Text style={styles.text}> {t('LOGIN_PAGE_SUBTITLE')}</Text>

            <Controller
              control={control}
              name="userName"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="LOGIN_USERNAME"
                  placeholder="LOGIN_USERNAME_PLACEHOLDER"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errors={errors.userName}
                  type="email"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="LOGIN_PASSWORD"
                  placeholder="LOGIN_PASSWORD_PLACEHOLDER"
                  isPWD
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errors={errors.password}
                />
              )}
            />
            <View style={styles.bottomContainer}>
              <Text style={styles.text}>{t('LOGIN_SIGNUP')}</Text>
              <Link style={styles.link} href="/(signup)">
                {t('SIGN_UP')}
              </Link>
            </View>

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
          </SafeAreaView>
        </SafeAreaProvider>
      </ScrollView>
    </KeyboardAvoidingView>
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
    bottomContainer: {
      gap: 15,
      marginVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: Colors[theme ?? 'light'].text,
      fontSize: 24,
      fontWeight: 'bold',
    },
    link: {
      color: Colors[theme ?? 'light'].text,
      fontWeight: '600',
      textDecorationLine: 'underline',
    },
    logo: {
      width: 150,
      height: 150,
    },
  });
