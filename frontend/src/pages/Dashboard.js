import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Ranking from '../components/Ranking';
import Bets from '../components/Bets';
import Pool from '../components/Pool';
import Settings from '../components/Settings';
import '../styles/dashboard.css';
export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('bets');
    const { t } = useTranslation();
    const tabs = [
        { id: 'ranking', label: t('navigation.ranking') },
        { id: 'bets', label: t('navigation.bets') },
        { id: 'pool', label: t('navigation.pool') },
        { id: 'settings', label: t('navigation.settings') }
    ];
    const renderContent = () => {
        switch (activeTab) {
            case 'ranking':
                return _jsx(Ranking, {});
            case 'bets':
                return _jsx(Bets, {});
            case 'pool':
                return _jsx(Pool, {});
            case 'settings':
                return _jsx(Settings, {});
            default:
                return _jsx(Bets, {});
        }
    };
    return (_jsxs("div", { className: "dashboard-container", children: [_jsx("header", { className: "dashboard-header", children: _jsxs("h1", { children: ["\u26BD ", t('splash.appName')] }) }), _jsx("nav", { className: "dashboard-tabs", children: tabs.map(tab => (_jsx("button", { className: `tab-button ${activeTab === tab.id ? 'active' : ''}`, onClick: () => setActiveTab(tab.id), children: tab.label }, tab.id))) }), _jsx("main", { className: "dashboard-content", children: renderContent() })] }));
}
