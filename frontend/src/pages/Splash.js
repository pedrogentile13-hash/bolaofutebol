import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/splash.css';
export default function Splash() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);
    return (_jsx("div", { className: "splash-container", children: _jsxs("div", { className: "splash-content", children: [_jsx("div", { className: "splash-logo", children: "\u26BD" }), _jsx("h1", { children: t('splash.appName') }), _jsx("p", { children: t('splash.subtitle') }), _jsx("div", { className: "splash-loader", children: _jsx("div", { className: "loader" }) })] }) }));
}
