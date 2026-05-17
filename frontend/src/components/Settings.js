import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuthStore } from '../store/authStore';
import '../styles/settings.css';
export default function Settings() {
    const [activeSection, setActiveSection] = useState('profile');
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'pt-BR');
    const { t, i18n } = useTranslation();
    const { isDark, toggle } = useTheme();
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
        i18n.changeLanguage(lang);
    };
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    const renderSection = () => {
        switch (activeSection) {
            case 'profile':
                return (_jsxs("div", { className: "settings-section", children: [_jsx("h3", { children: t('settings.profile') }), _jsxs("div", { className: "profile-info", children: [_jsxs("div", { className: "avatar-section", children: [_jsx("div", { className: "avatar-placeholder", children: "\uD83D\uDC64" }), _jsx("button", { className: "btn-secondary", children: t('settings.avatar') })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: t('auth.name') }), _jsx("input", { type: "text", value: user?.name || '', disabled: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: t('auth.email') }), _jsx("input", { type: "email", value: user?.email || '', disabled: true })] })] })] }));
            case 'appearance':
                return (_jsxs("div", { className: "settings-section", children: [_jsx("h3", { children: t('settings.theme') }), _jsxs("div", { className: "appearance-settings", children: [_jsxs("div", { className: "setting-item", children: [_jsx("label", { children: t('settings.darkMode') }), _jsx("button", { onClick: toggle, className: `toggle-btn ${isDark ? 'active' : ''}`, children: isDark ? '🌙' : '☀️' })] }), _jsxs("div", { className: "setting-item", children: [_jsx("label", { children: t('settings.language') }), _jsxs("select", { value: language, onChange: (e) => handleLanguageChange(e.target.value), children: [_jsx("option", { value: "pt-BR", children: t('settings.portuguese') }), _jsx("option", { value: "en-US", children: t('settings.english') })] })] })] })] }));
            case 'notifications':
                return (_jsxs("div", { className: "settings-section", children: [_jsx("h3", { children: t('settings.notifications') }), _jsxs("div", { className: "notification-settings", children: [_jsxs("div", { className: "setting-item", children: [_jsx("label", { children: t('settings.emailNotifications') }), _jsx("input", { type: "checkbox", defaultChecked: true })] }), _jsxs("div", { className: "setting-item", children: [_jsx("label", { children: t('settings.pushNotifications') }), _jsx("input", { type: "checkbox", defaultChecked: true })] })] })] }));
            case 'rules':
                return (_jsxs("div", { className: "settings-section", children: [_jsx("h3", { children: t('settings.rules') }), _jsxs("div", { className: "rules-content", children: [_jsxs("p", { children: ["\u2022 ", t('splash.subtitle')] }), _jsx("p", { children: "\u2022 Palpite correto: 3 pontos" }), _jsx("p", { children: "\u2022 Acerto do vencedor: 1 ponto" }), _jsx("p", { children: "\u2022 Placar correto: 3 pontos" })] })] }));
            case 'contact':
                return (_jsxs("div", { className: "settings-section", children: [_jsx("h3", { children: t('settings.contact') }), _jsxs("div", { className: "contact-info", children: [_jsx("p", { children: "\uD83D\uDCE7 Email: contato@bolaofutebol.com" }), _jsx("p", { children: "\uD83C\uDF10 Website: www.bolaofutebol.com" }), _jsx("p", { children: "\uD83D\uDCAC Suporte: suporte@bolaofutebol.com" })] })] }));
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: "settings-container", children: [_jsx("h2", { children: t('settings.title') }), _jsxs("div", { className: "settings-layout", children: [_jsxs("aside", { className: "settings-sidebar", children: [[
                                { id: 'profile', label: t('settings.profile') },
                                { id: 'appearance', label: t('settings.theme') },
                                { id: 'notifications', label: t('settings.notifications') },
                                { id: 'rules', label: t('settings.rules') },
                                { id: 'contact', label: t('settings.contact') }
                            ].map(item => (_jsx("button", { className: `settings-menu-item ${activeSection === item.id ? 'active' : ''}`, onClick: () => setActiveSection(item.id), children: item.label }, item.id))), _jsx("button", { onClick: handleLogout, className: "settings-menu-item logout-btn", children: t('settings.logout') })] }), _jsx("div", { className: "settings-content", children: renderSection() })] })] }));
}
