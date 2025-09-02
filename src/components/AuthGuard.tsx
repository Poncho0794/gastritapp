import { useAuthStore } from '@/src/stores/authStore';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { supabase } from '../utils/supabase.setup';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, isLoading, loadSesion, setSession } = useAuthStore();
  useEffect(() => {
    loadSesion();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      console.log('Auth state changed:', _event, newSession);
      if (isLoading) setSession(newSession);
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/(login)" />;
  }

  return <>{children}</>;
}
