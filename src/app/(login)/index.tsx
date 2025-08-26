import Input from '@/src/components/features/auth/Input';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

export default function Login() {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme ?? 'light');

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
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);
  return (
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
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
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
