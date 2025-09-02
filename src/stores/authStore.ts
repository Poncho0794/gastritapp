import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../models/user';
import { userKeysToCame } from '../utils';
import { asyncStorageAdapter } from '../utils/AsyncStorageAdapter';
import { supabase } from '../utils/supabase.setup';

type AuthState = {
  user: User | null;
  isLoading: boolean;
  loadSesion: () => Promise<void>;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setSession: (session: any) => void;
  logout: () => void;
  signUp: (password: string) => Promise<void>;
  confirmSignUp: (token: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  fetchUser: () => Promise<void>;
  session: any;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: {} as User,
      isLoading: false,
      session: null,
      setSession: (session) => set({ session }),
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ isLoading: loading }),
      fetchUser: async () => {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        console.log('Fetched auth user:', user, error);
        if (error) throw error;
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('email', user?.email)
          .single();
        console.log('Fetched profile data:', profile, profileError);
        if (profileError) throw profileError;
        console.log('Fetched user profile:', profile);
        set({ isLoading: false, user: userKeysToCame(profile) as User });
      },
      logout: async () => {
        let { error } = await supabase.auth.signOut();
        if (error) console.log('Error signing out:', error);
        set({ user: null });
      },
      loadSesion: async () => {
        set({ isLoading: true });
        const {
          data: { session: sessionObject },
          error,
        } = await supabase.auth.getSession();
        console.log('Loaded session:', sessionObject, error);
        if (error) throw error;

        set({ session: sessionObject, isLoading: false });
      },
      signUp: async (password: string) => {
        set({ isLoading: true });
        try {
          const { email } = get().user || {};
          if (!email) throw new Error('User email is required for sign up');
          const { data, error } = await supabase.auth.signUp({
            email: email.toLocaleLowerCase(),
            password,
          });
          if (error) throw error;
          console.log('Sign-up data:', data);
        } finally {
          set({ isLoading: false });
        }
      },
      confirmSignUp: async (token: string) => {
        set({ isLoading: true });

        try {
          const { firstName, lastName, email, age } = get().user ?? {};
          if (!email)
            throw new Error('User email is required for confirmation');
          const { data, error: errorInVerify } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'signup',
          });
          console.log('Confirmation data:', data, errorInVerify);
          if (errorInVerify) throw errorInVerify;
          const { data: insertResponse, error: errorOnInsert } = await supabase
            .from('users')
            .insert([
              {
                first_name: firstName,
                last_name: lastName,
                email,
                age,
              },
            ])
            .select();
          if (errorOnInsert) throw errorOnInsert;
          console.log('Insert response:', insertResponse);
          set({ user: insertResponse?.[0] });
        } finally {
          set({ isLoading: false });
        }
      },
      signIn: async (email: string, password: string) => {
        set({ isLoading: true });
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        console.log('Sign-in data:', data);

        set({ session: data.session, isLoading: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: asyncStorageAdapter,
      partialize: (state) => ({ user: state.user }),
    }
  )
);
