import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import '../styles/auth.css';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { login } = useAuthStore();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        }
        catch {
            setError(t('auth.loginError'));
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "auth-container", children: _jsxs("div", { className: "auth-card", children: [_jsx("h1", { children: t('auth.login') }), error && _jsx("div", { className: "error-message", children: error }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: t('auth.email') }), _jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, placeholder: "seu@email.com" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "password", children: t('auth.password') }), _jsx("input", { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] }), _jsx("button", { type: "submit", disabled: loading, className: "btn-primary", children: loading ? t('common.loading') : t('auth.loginButton') })] }), _jsx("div", { className: "auth-footer", children: _jsxs("p", { children: [t('auth.noAccount'), " ", _jsx(Link, { to: "/register", children: t('auth.register') })] }) })] }) }));
}
