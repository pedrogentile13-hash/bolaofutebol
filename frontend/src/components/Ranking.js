import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import '../styles/ranking.css';
export default function Ranking() {
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
    return (_jsxs("div", { className: "ranking-container", children: [_jsx("h2", { children: t('ranking.title') }), _jsxs("div", { className: "ranking-table", children: [_jsxs("div", { className: "ranking-header", children: [_jsx("div", { className: "col-position", children: t('ranking.position') }), _jsx("div", { className: "col-name", children: t('ranking.name') }), _jsx("div", { className: "col-points", children: t('ranking.points') }), _jsx("div", { className: "col-hits", children: t('ranking.hits') })] }), ranking.map((entry, index) => (_jsxs("div", { className: "ranking-row", children: [_jsx("div", { className: "col-position", children: _jsx("span", { className: "position-badge", children: entry.position }) }), _jsx("div", { className: "col-name", children: entry.name }), _jsx("div", { className: "col-points", children: entry.points }), _jsx("div", { className: "col-hits", children: entry.hits })] }, index)))] })] }));
}
