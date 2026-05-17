# ⚽ Bolão de Futebol - Copa do Mundo 2026

Sistema completo de bolão de futebol para a Copa do Mundo 2026, desenvolvido com React, TypeScript, Node.js e Express.

## 📋 Funcionalidades

- **Autenticação**: Sistema de login e registro seguro
- **Ranking**: Visualize o ranking dos participantes
- **Palpites**: Faça seus palpites nos jogos com informações completas
- **Bolões**: Crie e entre em grupos de bolão
- **Configurações**: Personalize tema, idioma, notificações e perfil
- **Suporte a Múltiplos Idiomas**: Português (PT-BR) e Inglês (EN-US)
- **Tema Escuro/Claro**: Interface adaptável ao seu gosto

## 🛠️ Tecnologias

### Frontend
- React 18
- TypeScript
- Vite
- React Router DOM
- i18next (Internacionalização)
- Zustand (Gerenciamento de Estado)
- Axios (Cliente HTTP)

### Backend
- Node.js
- Express
- TypeScript
- JWT (Autenticação)
- bcryptjs (Criptografia de Senhas)

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd bolaofutebol
```

2. Instale as dependências do frontend:
```bash
cd frontend
npm install
```

3. Instale as dependências do backend:
```bash
cd ../backend
npm install
```

### Configuração

1. Configure o arquivo `.env` do backend:
```bash
cp backend/.env.example backend/.env
```

2. Edite o arquivo `backend/.env` com suas configurações

### Desenvolvimento

Para rodar o projeto em modo desenvolvimento:

```bash
npm run dev
```

Isso iniciará simultaneamente:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Build

Para fazer build dos projetos:

```bash
npm run build
```

## 📁 Estrutura do Projeto

```
bolaofutebol/
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── hooks/         # Hooks customizados
│   │   ├── store/         # Estado com Zustand
│   │   ├── services/      # Serviços (API)
│   │   ├── locales/       # Arquivos de idioma
│   │   └── styles/        # Estilos CSS
│   ├── index.html
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── routes/        # Rotas da API
│   │   ├── middleware/    # Middlewares
│   │   ├── types/         # Tipos TypeScript
│   │   └── index.ts       # Servidor principal
│   ├── tsconfig.json
│   └── package.json
│
└── package.json
```

## 🎮 Como Usar

### Login
1. Acesse http://localhost:5173
2. Passe pela tela de splash
3. Faça login ou crie uma nova conta

### Fazer Palpites
1. Clique na aba "Palpites"
2. Selecione um jogo
3. Digite o placar
4. Clique em "Salvar"

### Bolão
1. Clique na aba "Bolão"
2. Crie um novo bolão ou entre em um existente
3. Compartilhe o código do bolão com amigos

### Configurações
1. Clique na aba "Configurações"
2. Personalize tema, idioma e notificações

## 📝 Regras de Pontuação

- **Palpite Correto**: 3 pontos
- **Acerto do Vencedor**: 1 ponto
- **Placar Correto**: 3 pontos

## 🔐 Segurança

- Senhas são criptografadas com bcryptjs
- Autenticação via JWT
- Tokens armazenados localmente (seguro em ambiente de produção com HTTPS)

## 📱 Responsividade

O projeto é totalmente responsivo e funciona em:
- Desktop
- Tablet
- Mobile

## 🎯 Próximas Melhorias

- [ ] Integração com MongoDB
- [ ] Notificações em tempo real (WebSocket)
- [ ] Sistema de ranking em tempo real
- [ ] Histórico completo de palpites
- [ ] Integração com API de resultados ao vivo
- [ ] Estatísticas detalhadas
- [ ] Compartilhamento social

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Desenvolvedor

Desenvolvido por Pedro Gentile

## 📧 Contato

Para suporte: contato@bolaofutebol.com
