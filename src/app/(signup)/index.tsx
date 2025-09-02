import Input from '@/src/components/features/auth/Input';
import Spinner from '@/src/components/ui/Spinner';
import { Colors } from '@/src/constants/Colors';
import { useColorScheme } from '@/src/hooks/useColorScheme.web';
import { User } from '@/src/models/user';
import { useAuthStore } from '@/src/stores/authStore';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

enum SignUpStep {
  SignUpForm = 'signUpForm',
  Confirmation = 'confirmation',
}

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme ?? 'light');
  const [signUpStep, setSignUpStep] = useState(SignUpStep.SignUpForm);
  const { setUser, signUp, confirmSignUp, isLoading } = useAuthStore();

  const onSubmit = async (formData: any) => {
    // Handle sign up logic here
    const { password, firstName, lastName, email, age } = formData;
    if (signUpStep === SignUpStep.SignUpForm) {
      setUser({ firstName, lastName, email, age } as User);
      try {
        await signUp(password);
        setSignUpStep(SignUpStep.Confirmation);
      } catch (error) {
        console.error('Error during sign-up:', error);
        alert(error);
      }
    } else if (signUpStep === SignUpStep.Confirmation) {
      try {
        await confirmSignUp(formData.token);
        alert('Sign-up confirmed! You can now log in.');
        router.replace('/(main)/home');
      } catch (error) {
        console.error('Error during confirmation:', error);
        alert(error);
      }
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
            <Text style={styles.title}>{t('SIGNUP_PAGE_TITLE')}</Text>

            <Controller
              control={control}
              name="firstName"
              rules={{ required: 'First name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="FIRST_NAME"
                  placeholder="FIRST_NAME_PLACEHOLDER"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errors={errors.firstName}
                />
              )}
            />

            <Controller
              control={control}
              name="lastName"
              rules={{ required: 'Last name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="LAST_NAME"
                  placeholder="LAST_NAME_PLACEHOLDER"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errors={errors.lastName}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Email is invalid',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="EMAIL"
                  placeholder="EMAIL_PLACEHOLDER"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errors={errors.email}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
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
            <Controller
              control={control}
              name="age"
              rules={{ required: 'Age is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="AGE"
                  placeholder="AGE_PLACEHOLDER"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errors={errors.age}
                />
              )}
            />
            {signUpStep === SignUpStep.Confirmation && (
              <Controller
                control={control}
                name="token"
                rules={{ required: 'Age is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="VERIFICATION_CODE"
                    placeholder="VERIFICATION_CODE_PLACEHOLDER"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errors={errors.token}
                  />
                )}
              />
            )}

            <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
            <Spinner visible={isLoading} />
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
      backgroundColor: Colors[theme ?? 'light'].background,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 32,
      alignSelf: 'center',
      color: Colors[theme ?? 'light'].text,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
      padding: 12,
      marginBottom: 12,
      fontSize: 16,
    },
    error: {
      color: 'red',
      marginBottom: 8,
      fontSize: 14,
    },
  });
