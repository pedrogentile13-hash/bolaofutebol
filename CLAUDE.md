# Sistema de Bolão de Futebol - Documentação de Desenvolvimento

## 📅 Timeline
- **Data Limite**: Copa do Mundo 2026 (24 dias a partir de 17/05/2026)
- **Prazo de Desenvolvimento**: 10 dias

## ✅ Fase 1 - Base Estrutural (COMPLETA)

### ✓ Frontend
- [x] Configuração de projeto React + TypeScript + Vite
- [x] Roteamento com React Router
- [x] Sistema de tema escuro/claro
- [x] Internacionalização (i18n) - PT-BR e EN-US
- [x] Gerenciamento de estado com Zustand
- [x] Cliente HTTP com Axios
- [x] Página Splash com animação
- [x] Páginas de Login e Registro
- [x] Dashboard com navegação por abas
- [x] Componentes: Ranking, Palpites, Bolão, Configurações
- [x] Estilos CSS responsivos
- [x] Integração com API

### ✓ Backend
- [x] Configuração de projeto Node.js + Express + TypeScript
- [x] Middleware de autenticação JWT
- [x] Rotas de autenticação (login, registro, verificação)
- [x] Rotas de ranking
- [x] Rotas de palpites
- [x] Rotas de bolões (criar, entrar)
- [x] Rotas de jogos
- [x] Tipos TypeScript
- [x] CORS configurado

## 🔄 Próximas Fases

### Fase 2 - Persistência de Dados (PRÓXIMA)
- [ ] Integração com MongoDB
- [ ] Modelos Mongoose para User, Match, Bet, Pool
- [ ] Migrations e seeds
- [ ] Validação de dados com Zod

### Fase 3 - Funcionalidades Avançadas
- [ ] Notificações em tempo real (Socket.io)
- [ ] Sistema de pontuação automático
- [ ] Cálculo de resultados de jogos
- [ ] Ranking em tempo real
- [ ] Histórico completo de palpites

### Fase 4 - Testes e Deploy
- [ ] Testes unitários (frontend e backend)
- [ ] Testes de integração
- [ ] Testes E2E
- [ ] Deploy na produção

## 🎯 Funcionalidades Principais

### Splash Screen
- Animação de bola de futebol
- Redirecionamento automático para login

### Autenticação
- Login seguro com JWT
- Registro de novos usuários
- Validação de credenciais

### Ranking
- Listagem de participantes
- Pontuação em tempo real
- Número de acertos

### Palpites
- Visualização de jogos próximos
- Entrada de placar
- Bandeiras dos países
- Informação da instituição

### Bolão
- Criação de novos bolões
- Código único por bolão
- Entrada em grupos existentes
- Visualização de membros

### Configurações
- Perfil do usuário
- Tema escuro/claro
- Seleção de idioma (PT-BR, EN-US)
- Notificações
- Regras do bolão
- Contato e suporte
- Logout

## 🗄️ Estrutura de Dados

### User
```typescript
{
  id: string
  name: string
  email: string
  password: string (hashed)
  avatar?: string
  createdAt: Date
  updatedAt: Date
}
```

### Match
```typescript
{
  id: string
  homeTeam: string
  awayTeam: string
  homeTeamFlag: string
  awayTeamFlag: string
  homeTeamScore?: number
  awayTeamScore?: number
  date: Date
  time: string
  institution?: string
  stage: string
  finished: boolean
}
```

### Bet
```typescript
{
  id: string
  userId: string
  matchId: string
  homeScore: number
  awayScore: number
  points: number
  createdAt: Date
  updatedAt: Date
}
```

### Pool
```typescript
{
  id: string
  name: string
  code: string (único)
  owner: string
  members: string[]
  rules?: string
  createdAt: Date
  updatedAt: Date
}
```

## 🔧 Configuração do Ambiente

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api
```

### Backend (.env)
```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bolaofutebol
JWT_SECRET=seu-secret-key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

## 📊 Regras de Pontuação
- **Palpite Correto** (vencedor correto): 1 ponto
- **Placar Correto**: 3 pontos
- **Acerto do Vencedor** (sem placar exato): 1 ponto

## 🚀 Como Executar Localmente

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

## 📝 Instruções de Commit

Usar mensagens claras e concisas:
```
Tipo: Descrição breve

Descrição detalhada se necessário

https://claude.ai/code/session_01HaJYwxeD228aXRP238NwjE
```

Tipos: feat, fix, refactor, style, docs, test, chore

## ⚡ Prioritário para os Próximos Dias

1. Integração com banco de dados (MongoDB)
2. Testes das rotas de autenticação
3. Sistema de pontuação automático
4. Notificações em tempo real
5. Deploy em ambiente de staging

## 📞 Contato e Suporte

Email: contato@bolaofutebol.com
Website: www.bolaofutebol.com
