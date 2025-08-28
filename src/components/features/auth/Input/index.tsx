import { Colors } from '@/src/constants/Colors';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

interface InputProps {
  label: string;
  placeholder: string;
  isPWD?: boolean;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
  errors?: any;
  type?: 'default' | 'email' | 'password' | 'number' | 'phone-pad';
}
export default function Input({
  label,
  placeholder,
  isPWD,
  errors,
  ...props
}: InputProps) {
  const colorScheme = useColorScheme();
  const { height } = useWindowDimensions();
  const styles = useMemo(
    () => getStyles(colorScheme ?? 'light', height, !!errors),
    [colorScheme, height, errors]
  );
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.label }}>{t(label)}</Text>
      <TextInput
        {...props}
        style={styles.input}
        placeholder={t(placeholder)}
        secureTextEntry={isPWD}
        placeholderTextColor={
          !!errors ? 'red' : Colors[colorScheme ?? 'light'].placeHolderTextColor
        }
      />
      {errors && <Text style={styles.errorText}>This is required.</Text>}
    </View>
  );
}
const getStyles = (
  theme: 'dark' | 'light',
  height: number,
  hasErrors: boolean
) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 10,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    input: {
      borderWidth: 1,
      backgroundColor: Colors[theme ?? 'light'].inputBackgroundColor,
      width: '100%',
      height: height * 0.06,
      borderRadius: 10,
      color: Colors[theme ?? 'light'].inputTextCoklor,
      borderColor: hasErrors ? 'red' : Colors[theme ?? 'light'].inputTextCoklor,
    },
    label: {
      color: hasErrors ? 'red' : Colors[theme ?? 'light'].text,
      marginBottom: 5,
    },
    errorText: {
      color: 'red',
      marginTop: 5,
    },
  });
