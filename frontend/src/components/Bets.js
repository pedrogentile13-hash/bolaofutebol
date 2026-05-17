import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import '../styles/bets.css';
export default function Bets() {
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
    if (matches.length === 0) {
        return _jsx("div", { className: "no-content", children: t('bets.noUpcomingMatches') });
    }
    return (_jsxs("div", { className: "bets-container", children: [_jsx("h2", { children: t('bets.title') }), message && _jsx("div", { className: "success-message", children: message }), _jsx("div", { className: "matches-list", children: matches.map(match => (_jsxs("div", { className: "match-card", children: [_jsxs("div", { className: "match-header", children: [_jsxs("span", { className: "date", children: [match.date, " \u00E0s ", match.time] }), match.institution && _jsx("span", { className: "institution", children: match.institution })] }), _jsxs("div", { className: "match-teams", children: [_jsxs("div", { className: "team home-team", children: [_jsx("span", { className: "flag", children: match.homeTeamFlag }), _jsx("span", { className: "name", children: match.homeTeam })] }), _jsx("div", { className: "vs", children: "vs" }), _jsxs("div", { className: "team away-team", children: [_jsx("span", { className: "name", children: match.awayTeam }), _jsx("span", { className: "flag", children: match.awayTeamFlag })] })] }), _jsxs("div", { className: "match-bet", children: [_jsx("div", { className: "score-input", children: _jsx("input", { type: "number", min: "0", max: "99", value: bets[match.id]?.homeScore || '', onChange: (e) => handleScoreChange(match.id, 'home', parseInt(e.target.value) || 0), placeholder: "0" }) }), _jsx("span", { className: "dash", children: "-" }), _jsx("div", { className: "score-input", children: _jsx("input", { type: "number", min: "0", max: "99", value: bets[match.id]?.awayScore || '', onChange: (e) => handleScoreChange(match.id, 'away', parseInt(e.target.value) || 0), placeholder: "0" }) }), _jsx("button", { onClick: () => handleSaveBet(match.id), className: "btn-save", children: t('bets.save') })] })] }, match.id))) })] }));
}
