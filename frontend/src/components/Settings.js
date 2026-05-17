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
                return (_jsx("div", { className: "settings-section", children: _jsxs("div", { className: "profile-card", children: [_jsx("div", { className: "avatar", children: _jsx("span", { children: "\uD83D\uDC64" }) }), _jsxs("div", { className: "profile-details", children: [_jsx("h3", { children: user?.name || 'Usuário' }), _jsx("p", { className: "email", children: user?.email || 'email@example.com' })] }), _jsx("button", { className: "btn-edit", children: "\u270F\uFE0F Editar" })] }) }));
            case 'appearance':
                return (_jsxs("div", { className: "settings-section", children: [_jsxs("div", { className: "setting-item", children: [_jsxs("div", { className: "setting-label", children: [_jsx("span", { className: "icon", children: "\uD83C\uDF19" }), _jsxs("div", { children: [_jsx("strong", { children: "Tema Escuro" }), _jsx("p", { children: "Ativa o modo escuro" })] })] }), _jsx("button", { onClick: toggle, className: `toggle-switch ${isDark ? 'active' : ''}` })] }), _jsxs("div", { className: "setting-item", children: [_jsxs("div", { className: "setting-label", children: [_jsx("span", { className: "icon", children: "\uD83C\uDF10" }), _jsxs("div", { children: [_jsx("strong", { children: "Idioma" }), _jsx("p", { children: "Portugu\u00EAs ou English" })] })] }), _jsxs("select", { value: language, onChange: (e) => handleLanguageChange(e.target.value), className: "language-select", children: [_jsx("option", { value: "pt-BR", children: "\uD83C\uDDE7\uD83C\uDDF7 Portugu\u00EAs" }), _jsx("option", { value: "en-US", children: "\uD83C\uDDFA\uD83C\uDDF8 English" })] })] })] }));
            case 'notifications':
                return (_jsx("div", { className: "settings-section", children: _jsxs("div", { className: "setting-item", children: [_jsxs("div", { className: "setting-label", children: [_jsx("span", { className: "icon", children: "\uD83D\uDD14" }), _jsxs("div", { children: [_jsx("strong", { children: "Notifica\u00E7\u00F5es" }), _jsx("p", { children: "Cutucoes recebidas" })] })] }), _jsx("input", { type: "checkbox", defaultChecked: true, className: "checkbox-toggle" })] }) }));
            case 'rules':
                return (_jsx("div", { className: "settings-section", children: _jsxs("div", { className: "rules-card", children: [_jsx("h3", { children: "\uD83D\uDCCB Regras do Bol\u00E3o" }), _jsxs("div", { className: "rules-list", children: [_jsxs("div", { className: "rule-item", children: [_jsx("span", { className: "rule-icon", children: "\u2713" }), _jsxs("div", { children: [_jsx("strong", { children: "Palpite Correto" }), _jsx("p", { children: "Vencedor correto: 1 ponto" })] })] }), _jsxs("div", { className: "rule-item", children: [_jsx("span", { className: "rule-icon", children: "\u2713\u2713" }), _jsxs("div", { children: [_jsx("strong", { children: "Placar Correto" }), _jsx("p", { children: "Placar exato: 3 pontos" })] })] })] })] }) }));
            case 'contact':
                return (_jsx("div", { className: "settings-section", children: _jsxs("div", { className: "contact-card", children: [_jsx("h3", { children: "\uD83D\uDCDE Contato e Suporte" }), _jsxs("div", { className: "contact-item", children: [_jsx("span", { className: "contact-icon", children: "\uD83D\uDCE7" }), _jsxs("div", { children: [_jsx("strong", { children: "Email" }), _jsx("p", { children: "contato@bolaofutebol.com" })] })] }), _jsxs("div", { className: "contact-item", children: [_jsx("span", { className: "contact-icon", children: "\uD83C\uDF10" }), _jsxs("div", { children: [_jsx("strong", { children: "Website" }), _jsx("p", { children: "www.bolaofutebol.com" })] })] }), _jsxs("div", { className: "contact-item", children: [_jsx("span", { className: "contact-icon", children: "\uD83D\uDCAC" }), _jsxs("div", { children: [_jsx("strong", { children: "Suporte" }), _jsx("p", { children: "suporte@bolaofutebol.com" })] })] })] }) }));
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
