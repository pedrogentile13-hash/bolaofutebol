import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useTheme } from './hooks/useTheme';
import { useAuthStore } from './store/authStore';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ptBR from './locales/pt-BR.json';
import enUS from './locales/en-US.json';
i18n.use(initReactI18next).init({
    resources: {
        'pt-BR': { translation: ptBR },
        'en-US': { translation: enUS }
    },
    lng: localStorage.getItem('language') || 'pt-BR',
    fallbackLng: 'pt-BR',
    interpolation: { escapeValue: false }
});
function App() {
    const { isDark } = useTheme();
    const { isAuthenticated, checkAuth } = useAuthStore();
    useEffect(() => {
        checkAuth();
    }, []);
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/splash", element: _jsx(Splash, {}) }), _jsx(Route, { path: "/login", element: isAuthenticated ? _jsx(Navigate, { to: "/dashboard" }) : _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: isAuthenticated ? _jsx(Navigate, { to: "/dashboard" }) : _jsx(Register, {}) }), _jsx(Route, { path: "/dashboard/*", element: isAuthenticated ? _jsx(Dashboard, {}) : _jsx(Navigate, { to: "/login" }) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: isAuthenticated ? "/dashboard" : "/splash" }) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }));
}
export default App;
