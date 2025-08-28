import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase.setup';

export const useSession = () => {
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadSession = async () => {
      const {
        data: { session: sessionObject },
      } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(sessionObject);
      setIsLoading(false);
    };
    loadSession();
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        // Solo actualizar si ya pasó la carga inicial
        if (!isLoading) setSession(newSession);
      }
    );

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setSession(data.session); // actualizar sesión manualmente
  };

  return { session, isLoading, signIn };
};
