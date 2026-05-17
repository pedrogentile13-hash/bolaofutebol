import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import '../styles/auth.css';
export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { register } = useAuthStore();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError(t('auth.passwordsDontMatch'));
            return;
        }
        setLoading(true);
        try {
            await register(name, email, password);
            navigate('/dashboard');
        }
        catch {
            setError(t('auth.registerError'));
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "auth-container", children: _jsxs("div", { className: "auth-card", children: [_jsx("h1", { children: t('auth.register') }), error && _jsx("div", { className: "error-message", children: error }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "name", children: t('auth.name') }), _jsx("input", { id: "name", type: "text", value: name, onChange: (e) => setName(e.target.value), required: true, placeholder: "Seu Nome" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: t('auth.email') }), _jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, placeholder: "seu@email.com" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "password", children: t('auth.password') }), _jsx("input", { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "confirmPassword", children: t('auth.confirmPassword') }), _jsx("input", { id: "confirmPassword", type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] }), _jsx("button", { type: "submit", disabled: loading, className: "btn-primary", children: loading ? t('common.loading') : t('auth.registerButton') })] }), _jsx("div", { className: "auth-footer", children: _jsxs("p", { children: [t('auth.alreadyHaveAccount'), " ", _jsx(Link, { to: "/login", children: t('auth.login') })] }) })] }) }));
}
