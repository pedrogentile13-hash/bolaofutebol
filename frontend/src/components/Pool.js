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
            setMessage(t('pool.title') + ' criado com sucesso!');
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
            setMessage(t('pool.title') + ' entrado com sucesso!');
            fetchPools();
            setTimeout(() => setMessage(''), 3000);
        }
        catch (error) {
            console.error('Erro ao entrar no bolão:', error);
        }
    };
    if (loading)
        return _jsx("div", { className: "loading", children: t('common.loading') });
    return (_jsxs("div", { className: "pool-container", children: [_jsx("h2", { children: t('pool.title') }), message && _jsx("div", { className: "success-message", children: message }), _jsxs("div", { className: "pool-actions", children: [_jsx("button", { onClick: () => setShowCreateModal(true), className: "btn-primary", children: t('pool.createPool') }), _jsx("button", { onClick: () => setShowJoinModal(true), className: "btn-secondary", children: t('pool.joinPool') })] }), pools.length === 0 ? (_jsx("div", { className: "no-content", children: t('pool.noPoolsYet') })) : (_jsx("div", { className: "pools-list", children: pools.map(pool => (_jsxs("div", { className: "pool-card", children: [_jsxs("div", { className: "pool-header", children: [_jsx("h3", { children: pool.name }), _jsx("span", { className: "pool-code", children: pool.code })] }), _jsxs("div", { className: "pool-info", children: [_jsxs("p", { children: [_jsxs("strong", { children: [t('pool.owner'), ":"] }), " ", pool.owner] }), _jsxs("p", { children: [_jsxs("strong", { children: [t('pool.poolMembers'), ":"] }), " ", pool.members] }), _jsxs("p", { children: [_jsxs("strong", { children: [t('pool.createdAt'), ":"] }), " ", new Date(pool.createdAt).toLocaleDateString()] })] })] }, pool.id))) })), showCreateModal && (_jsx("div", { className: "modal-overlay", onClick: () => setShowCreateModal(false), children: _jsxs("div", { className: "modal", onClick: e => e.stopPropagation(), children: [_jsx("h3", { children: t('pool.createPool') }), _jsxs("form", { onSubmit: handleCreatePool, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: t('pool.poolName') }), _jsx("input", { type: "text", value: poolName, onChange: (e) => setPoolName(e.target.value), required: true, placeholder: "Nome do bol\u00E3o" })] }), _jsxs("div", { className: "modal-buttons", children: [_jsx("button", { type: "submit", className: "btn-primary", children: t('common.save') }), _jsx("button", { type: "button", onClick: () => setShowCreateModal(false), className: "btn-secondary", children: t('common.cancel') })] })] })] }) })), showJoinModal && (_jsx("div", { className: "modal-overlay", onClick: () => setShowJoinModal(false), children: _jsxs("div", { className: "modal", onClick: e => e.stopPropagation(), children: [_jsx("h3", { children: t('pool.joinPool') }), _jsxs("form", { onSubmit: handleJoinPool, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: t('pool.poolCode') }), _jsx("input", { type: "text", value: poolCode, onChange: (e) => setPoolCode(e.target.value), required: true, placeholder: t('pool.enterCode') })] }), _jsxs("div", { className: "modal-buttons", children: [_jsx("button", { type: "submit", className: "btn-primary", children: t('pool.join') }), _jsx("button", { type: "button", onClick: () => setShowJoinModal(false), className: "btn-secondary", children: t('common.cancel') })] })] })] }) }))] }));
}
