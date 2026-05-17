import { create } from 'zustand';
import api from '../services/api';
export const useAuthStore = create((set) => ({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            set({ isAuthenticated: true, user, token, loading: false });
        }
        catch (error) {
            set({ error: error.response?.data?.message || 'Erro ao fazer login', loading: false });
            throw error;
        }
    },
    register: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/auth/register', { name, email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            set({ isAuthenticated: true, user, token, loading: false });
        }
        catch (error) {
            set({ error: error.response?.data?.message || 'Erro ao registrar', loading: false });
            throw error;
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ isAuthenticated: false, user: null, token: null });
    },
    checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            set({ isAuthenticated: false, user: null, token: null });
            return;
        }
        try {
            const response = await api.get('/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ isAuthenticated: true, user: response.data, token });
        }
        catch {
            localStorage.removeItem('token');
            set({ isAuthenticated: false, user: null, token: null });
        }
    }
}));
