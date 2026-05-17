import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import '../styles/bets.css';
export default function Bets() {
    const [activeTab, setActiveTab] = useState('palpites');
    const [matches, setMatches] = useState([]);
    const [bets, setBets] = useState({});
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const { t } = useTranslation();
    useEffect(() => {
        fetchMatches();
    }, []);
    const fetchMatches = async () => {
        try {
            const response = await api.get('/matches/upcoming');
            setMatches(response.data);
        }
        catch (error) {
            console.error('Erro ao buscar jogos:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleScoreChange = (matchId, team, score) => {
        setBets(prev => ({
            ...prev,
            [matchId]: {
                ...prev[matchId],
                matchId,
                [team === 'home' ? 'homeScore' : 'awayScore']: score
            }
        }));
    };
    const handleSaveBet = async (matchId) => {
        const bet = bets[matchId];
        if (!bet)
            return;
        try {
            await api.post('/bets', bet);
            setMessage(t('bets.betSaved'));
            setTimeout(() => setMessage(''), 3000);
        }
        catch (error) {
            console.error('Erro ao salvar palpite:', error);
        }
    };
    if (loading)
        return _jsx("div", { className: "loading", children: t('common.loading') });
    const tabs = [
        { id: 'palpites', icon: '🎯', label: 'Palpites' },
        { id: 'perguntas', icon: '❓', label: 'Perguntas' }
    ];
    const groupedMatches = matches.reduce((acc, match) => {
        const date = match.date;
        if (!acc[date])
            acc[date] = [];
        acc[date].push(match);
        return acc;
    }, {});
    return (_jsxs("div", { className: "bets-container", children: [_jsxs("div", { className: "bets-header", children: [_jsx("h2", { children: "Palpites" }), _jsx("p", { children: "Fa\u00E7a seus palpites e responda perguntas" })] }), _jsx("div", { className: "bets-tabs", children: tabs.map(tab => (_jsxs("button", { className: `bets-tab ${activeTab === tab.id ? 'active' : ''}`, onClick: () => setActiveTab(tab.id), children: [_jsx("span", { children: tab.icon }), tab.label] }, tab.id))) }), message && _jsx("div", { className: "success-message", children: message }), activeTab === 'palpites' && (_jsx("div", { className: "matches-container", children: Object.entries(groupedMatches).map(([date, dateMatches]) => (_jsxs("div", { className: "matches-by-date", children: [_jsx("div", { className: "date-header", children: _jsx("span", { className: "date-label", children: date }) }), _jsx("div", { className: "matches-list", children: dateMatches.map(match => (_jsxs("div", { className: "match-card", children: [_jsxs("div", { className: "match-top", children: [_jsxs("span", { className: "match-time", children: [match.time, " EM BREVE"] }), match.institution && _jsx("span", { className: "institution", children: match.institution })] }), _jsxs("div", { className: "match-content", children: [_jsxs("div", { className: "match-teams", children: [_jsxs("div", { className: "team home-team", children: [_jsx("span", { className: "flag", children: match.homeTeamFlag }), _jsx("span", { className: "country", children: match.homeTeam })] }), _jsx("div", { className: "match-vs", children: "vs" }), _jsxs("div", { className: "team away-team", children: [_jsx("span", { className: "flag", children: match.awayTeamFlag }), _jsx("span", { className: "country", children: match.awayTeam })] })] }), _jsxs("div", { className: "match-footer", children: [_jsxs("div", { className: "score-selector", children: [_jsxs("div", { className: "score-input", children: [_jsx("button", { className: "score-btn minus", onClick: () => handleScoreChange(match.id, 'home', Math.max(0, (bets[match.id]?.homeScore || 0) - 1)), children: "\u2212" }), _jsx("input", { type: "number", min: "0", max: "99", value: bets[match.id]?.homeScore || '0', onChange: (e) => handleScoreChange(match.id, 'home', Math.max(0, parseInt(e.target.value) || 0)), readOnly: true }), _jsx("button", { className: "score-btn plus", onClick: () => handleScoreChange(match.id, 'home', (bets[match.id]?.homeScore || 0) + 1), children: "+" })] }), _jsx("span", { className: "dash", children: "-" }), _jsxs("div", { className: "score-input", children: [_jsx("button", { className: "score-btn minus", onClick: () => handleScoreChange(match.id, 'away', Math.max(0, (bets[match.id]?.awayScore || 0) - 1)), children: "\u2212" }), _jsx("input", { type: "number", min: "0", max: "99", value: bets[match.id]?.awayScore || '0', onChange: (e) => handleScoreChange(match.id, 'away', Math.max(0, parseInt(e.target.value) || 0)), readOnly: true }), _jsx("button", { className: "score-btn plus", onClick: () => handleScoreChange(match.id, 'away', (bets[match.id]?.awayScore || 0) + 1), children: "+" })] })] }), _jsx("button", { onClick: () => handleSaveBet(match.id), className: "btn-save", children: "Enviar Palpite \u2192" })] })] })] }, match.id))) })] }, date))) })), activeTab === 'perguntas' && (_jsx("div", { className: "perguntas-container", children: _jsx("div", { className: "no-content", children: "Em breve - Perguntas sobre o torneio" }) }))] }));
}
