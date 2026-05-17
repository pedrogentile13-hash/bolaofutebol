import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import '../styles/ranking.css';
export default function Ranking() {
    const [activeTab, setActiveTab] = useState('geral');
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    useEffect(() => {
        fetchRanking();
    }, []);
    const fetchRanking = async () => {
        try {
            const response = await api.get('/ranking');
            setRanking(response.data);
        }
        catch (error) {
            console.error('Erro ao buscar ranking:', error);
        }
        finally {
            setLoading(false);
        }
    };
    if (loading)
        return _jsx("div", { className: "loading", children: t('common.loading') });
    const tabs = [
        { id: 'geral', icon: '🏆', label: 'Geral' },
        { id: 'equipes', icon: '👥', label: 'Equipes' },
        { id: 'perguntas', icon: '❓', label: 'Perguntas' }
    ];
    return (_jsxs("div", { className: "ranking-container", children: [_jsxs("div", { className: "ranking-header-section", children: [_jsx("h2", { children: "\uD83C\uDFC6 Ranking" }), _jsx("div", { className: "ranking-tabs", children: tabs.map(tab => (_jsxs("button", { className: `ranking-tab ${activeTab === tab.id ? 'active' : ''}`, onClick: () => setActiveTab(tab.id), children: [_jsx("span", { className: "tab-icon", children: tab.icon }), tab.label] }, tab.id))) })] }), _jsxs("div", { className: "ranking-promo", children: [_jsxs("div", { className: "promo-card free", children: [_jsx("span", { className: "promo-badge", children: "GRATIS" }), _jsx("p", { children: "Atualiza 1x ao dia." })] }), _jsxs("div", { className: "promo-card pro", children: [_jsx("span", { className: "promo-badge pro", children: "\u2B50 PRO" }), _jsx("p", { children: "Atualiza em tempo real." })] })] }), _jsxs("div", { className: "ranking-table", children: [_jsxs("div", { className: "ranking-table-header", children: [_jsx("div", { className: "col-position", children: "#" }), _jsx("div", { className: "col-name", children: "Participante" }), _jsx("div", { className: "col-points", children: "Pontos" }), _jsx("div", { className: "col-hits", children: "Acertos" })] }), ranking.map((entry, index) => (_jsxs("div", { className: `ranking-row ${entry.isPro ? 'pro-user' : ''}`, children: [_jsx("div", { className: "col-position", children: _jsx("span", { className: `position-badge position-${entry.position}`, children: entry.position }) }), _jsxs("div", { className: "col-name", children: [_jsx("span", { children: entry.name }), entry.isPro && _jsx("span", { className: "pro-badge", children: "PRO" })] }), _jsx("div", { className: "col-points", children: _jsx("span", { className: "points-value", children: entry.points }) }), _jsx("div", { className: "col-hits", children: _jsx("span", { className: "hits-value", children: entry.hits }) })] }, index)))] })] }));
}
