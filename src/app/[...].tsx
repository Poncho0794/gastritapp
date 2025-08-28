import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function NotFound() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        ❌ Página no encontrada
      </Text>
      <Button title="Volver al inicio" onPress={() => router.replace('/')} />
    </View>
  );
}
