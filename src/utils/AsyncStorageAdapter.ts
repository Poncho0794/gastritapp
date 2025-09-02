import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistStorage } from 'zustand/middleware';
import { User } from '../models/user';
type PersistedAuthState = {
  user: User | null;
};
export const asyncStorageAdapter: PersistStorage<PersistedAuthState> = {
  getItem: async (name) => {
    const value = await AsyncStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};
