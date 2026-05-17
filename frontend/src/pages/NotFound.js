import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import '../styles/notfound.css';
export default function NotFound() {
    return (_jsxs("div", { className: "notfound-container", children: [_jsx("h1", { children: "404" }), _jsx("p", { children: "P\u00E1gina n\u00E3o encontrada" }), _jsx(Link, { to: "/", className: "btn-primary", children: "Voltar ao In\u00EDcio" })] }));
}
