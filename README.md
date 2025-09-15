# 🚀 panas-real-estate-tokenization

## 📋 Descripción

Tokenización Inmobiliaria

## 🎯 Funcionalidades Principales

- Integración multi-blockchain
- APIs de IA integradas
- Dashboard completo
- Sistema de pagos
- Analytics avanzado

## 🚀 Tecnologías

- **Blockchain**: Algorand,Solana,TON
- **Backend**: React,Node.js
- **Base de Datos**: PostgreSQL,IPFS
- **IA**: OpenAI,HF
- **Deploy**: Heroku,Vercel

## 🌐 URLs

- **Live**: https
- **Backend**: [https://panas-real-estate-tokenization-backend.herokuapp.com](https://panas-real-estate-tokenization-backend.herokuapp.com)
- **API Docs**: [https://panas-real-estate-tokenization-backend.herokuapp.com/docs](https://panas-real-estate-tokenization-backend.herokuapp.com/docs)

## 🔧 Configuración

### 🔐 Variables de Entorno

Las siguientes variables deben definirse en .env (ver .env.example):

- PANAS_INDEX_WEIGHTS: Pesos del índice (JSON).
- GOVERNANCE_UPDATE_INTERVAL_DAYS: Frecuencia de revisión del índice.
- DATABASE_URL, POSTGRES_*: Configuración de base de datos.
- REDIS_URL: Cache y colas.
- OPENAI_API_KEY, HUGGINGFACE_API_KEY, OLLAMA_HOST: IA.
- ALGORAND_NETWORK, ALGORAND_MNEMONIC: Contratos ASA (Algorand).
- TON_API_KEY, TON_WALLET_MNEMONIC: Pagos TON/P2P.
- SOLANA_RPC_URL, BSC_RPC_URL: Integraciones multichain.
- HEROKU_API_KEY, HEROKU_APP_BACKEND: Deploy backend.
- VERCEL_TOKEN, VERCEL_PROJECT_ID: Deploy frontend.

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar desarrollo
npm run dev

# Deploy completo
./scripts/master-deploy.sh
```

## 📊 Módulos Integrados

- Backend API
- Frontend React/Next.js
- Servicios de IA
- Analytics
- Blockchain integration
- Payment processing

## 🎯 Próximos Pasos

1. Configurar credenciales
2. Ejecutar tests
3. Deploy a producción
4. Monitorear servicios
