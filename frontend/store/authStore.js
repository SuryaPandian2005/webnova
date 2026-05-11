'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      setAuth: (user, token) => {
        set({ user, token, isAuthenticated: true });
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      },

      clearAuth: () => {
        set({ user: null, token: null, isAuthenticated: false });
        delete api.defaults.headers.common['Authorization'];
      },

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const res = await api.post('/auth/login', { email, password });
          const { user, token } = res.data;
          get().setAuth(user, token);
          return { success: true, user };
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true });
        try {
          const res = await api.post('/auth/register', { name, email, password });
          const { user, token } = res.data;
          get().setAuth(user, token);
          return { success: true, user };
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        get().clearAuth();
      },

      refreshUser: async () => {
        try {
          const token = get().token;
          if (!token) return;
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await api.get('/auth/me');
          set({ user: res.data.user });
        } catch {
          get().clearAuth();
        }
      },

      updateUser: (updates) => {
        set((state) => ({ user: { ...state.user, ...updates } }));
      },
    }),
    {
      name: 'builderai-auth',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
        }
      },
    }
  )
);

export default useAuthStore;