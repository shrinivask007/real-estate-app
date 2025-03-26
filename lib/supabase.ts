import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mlayzwlsporucpvuqpof.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sYXl6d2xzcG9ydWNwdnVxcG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NDUxODIsImV4cCI6MjA1ODEyMTE4Mn0.pcOD3VgC3FgKhhJNo9RqP0-RdXebYYKQUKAyLZUTo4c';

const customStorageAdapter = {
  getItem: async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      return null;
    } catch (error) {
      return null;
    }
  },
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      return null;
    } catch (error) {
      return null;
    }
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      getItem: async (key: string) => {
        try {
          return await AsyncStorage.getItem(key);
        } catch (error) {
          return null;
        }
      },
      setItem: async (key: string, value: string) => {
        try {
          await AsyncStorage.setItem(key, value);
          return undefined;
        } catch (error) {
          return undefined;
        }
      },
      removeItem: async (key: string) => {
        try {
          await AsyncStorage.removeItem(key);
          return undefined;
        } catch (error) {
          return undefined;
        }
      }
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}); 