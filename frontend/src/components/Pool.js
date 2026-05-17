import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import '../styles/pool.css';
export default function Pool() {
    const [pools, setPools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [poolName, setPoolName] = useState('');
    const [poolCode, setPoolCode] = useState('');
    const [message, setMessage] = useState('');
    const { t } = useTranslation();
    useEffect(() => {
        fetchPools();
    }, []);
    const fetchPools = async () => {
        try {
            const response = await api.get('/pools');
            setPools(response.data);
        }
        catch (error) {
            console.error('Erro ao buscar bolões:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleCreatePool = async (e) => {
        e.preventDefault();
        try {
            await api.post('/pools', { name: poolName });
            setPoolName('');
            setShowCreateModal(false);
            setMessage('Bolão criado com sucesso!');
            fetchPools();
            setTimeout(() => setMessage(''), 3000);
        }
        catch (error) {
            console.error('Erro ao criar bolão:', error);
        }
    };
    const handleJoinPool = async (e) => {
        e.preventDefault();
        try {
            await api.post('/pools/join', { code: poolCode });
            setPoolCode('');
            setShowJoinModal(false);
            setMessage('Bolão entrado com sucesso!');
            fetchPools();
            setTimeout(() => setMessage(''), 3000);
        }
        catch (error) {
            console.error('Erro ao entrar no bolão:', error);
        }
    };
    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        setMessage('Código copiado!');
        setTimeout(() => setMessage(''), 2000);
    };
    if (loading)
        return _jsx("div", { className: "loading", children: t('common.loading') });
    return (_jsxs("div", { className: "pool-container", children: [_jsxs("div", { className: "pools-header", children: [_jsx("h2", { children: "\uD83D\uDC65 Meus Grupos" }), _jsx("p", { children: "Selecione um grupo para ver o ranking" })] }), message && _jsx("div", { className: "success-message", children: message }), _jsxs("div", { className: "pool-actions-grid", children: [_jsxs("button", { onClick: () => setShowCreateModal(true), className: "action-btn create-btn", children: [_jsx("span", { className: "icon", children: "+" }), _jsxs("div", { children: [_jsx("strong", { children: "Criar novo grupo" }), _jsx("p", { children: "Convide seus amigos" })] })] }), _jsxs("button", { onClick: () => setShowJoinModal(true), className: "action-btn join-btn", children: [_jsx("span", { className: "icon", children: "\uD83D\uDD11" }), _jsxs("div", { children: [_jsx("strong", { children: "Fui convidado" }), _jsx("p", { children: "Entrar com c\u00F3digo" })] })] })] }), pools.length === 0 ? (_jsx("div", { className: "no-pools-container", children: _jsxs("div", { className: "no-content", children: [_jsx("p", { children: "Nenhum grupo ainda \uD83D\uDE22" }), _jsx("small", { children: "Crie um novo grupo ou entre em um existente" })] }) })) : (_jsx("div", { className: "pools-list", children: pools.map(pool => (_jsxs("div", { className: "pool-card", children: [_jsxs("div", { className: "pool-card-header", children: [_jsxs("div", { children: [_jsx("h3", { children: pool.name }), pool.isOwner && _jsx("span", { className: "owner-badge", children: "\uD83D\uDC51 Admin" })] }), _jsxs("button", { onClick: () => copyToClipboard(pool.code), className: "copy-btn", title: "Copiar c\u00F3digo", children: ["\uD83D\uDCCB ", pool.code] })] }), _jsxs("div", { className: "pool-card-stats", children: [_jsxs("div", { className: "stat", children: [_jsx("span", { className: "stat-icon", children: "\uD83D\uDC65" }), _jsxs("div", { children: [_jsx("span", { className: "stat-label", children: "Membros" }), _jsx("span", { className: "stat-value", children: pool.members })] })] }), _jsxs("div", { className: "stat", children: [_jsx("span", { className: "stat-icon", children: "\uD83D\uDC64" }), _jsxs("div", { children: [_jsx("span", { className: "stat-label", children: "Admin" }), _jsx("span", { className: "stat-value", children: pool.owner })] })] })] }), _jsx("button", { className: "btn-view-ranking", children: "Ver Ranking \u2192" })] }, pool.id))) })), showCreateModal && (_jsx("div", { className: "modal-overlay", onClick: () => setShowCreateModal(false), children: _jsxs("div", { className: "modal", onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h3", { children: "Criar novo grupo" }), _jsx("button", { className: "close-btn", onClick: () => setShowCreateModal(false), children: "\u2715" })] }), _jsxs("form", { onSubmit: handleCreatePool, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Nome do grupo" }), _jsx("input", { type: "text", value: poolName, onChange: (e) => setPoolName(e.target.value), required: true, placeholder: "Ex: Amigos da Faculdade", autoFocus: true })] }), _jsxs("div", { className: "modal-buttons", children: [_jsx("button", { type: "submit", className: "btn-primary", children: "Criar Grupo" }), _jsx("button", { type: "button", onClick: () => setShowCreateModal(false), className: "btn-cancel", children: "Cancelar" })] })] })] }) })), showJoinModal && (_jsx("div", { className: "modal-overlay", onClick: () => setShowJoinModal(false), children: _jsxs("div", { className: "modal", onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h3", { children: "Entrar em um grupo" }), _jsx("button", { className: "close-btn", onClick: () => setShowJoinModal(false), children: "\u2715" })] }), _jsxs("form", { onSubmit: handleJoinPool, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "C\u00F3digo do grupo" }), _jsx("input", { type: "text", value: poolCode, onChange: (e) => setPoolCode(e.target.value.toUpperCase()), required: true, placeholder: "Cole o c\u00F3digo compartilhado", autoFocus: true, maxLength: 6 })] }), _jsxs("div", { className: "modal-buttons", children: [_jsx("button", { type: "submit", className: "btn-primary", children: "Entrar no Grupo" }), _jsx("button", { type: "button", onClick: () => setShowJoinModal(false), className: "btn-cancel", children: "Cancelar" })] })] })] }) }))] }));
}
