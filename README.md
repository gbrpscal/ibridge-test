iBridge Dashboard


Dashboard fullstack desenvolvido como parte de um desafio técnico, com ingestão de dados via Laravel e visualização interativa em React.

Acesse online:
https://ibridge-repo-production.up.railway.app

Stack utilizada
Backend:
- Laravel 12
- PHP 8.3
- MySQL
- Eloquent ORM
- API REST

Frontend:
- React + Vite
- Chart.js
- Fetch API

Infra:
- Docker multi-stage
- Railway (deploy)
- SPA servida pelo Laravel



Funcionalidades:

- Importação de dataset JSON
- Dashboard com métricas agregadas

Rankings dinâmicos:
> Top operadores
> Top campanhas
> Top listas

API REST consumida pelo frontend

Deploy com URL pública

Arquitetura:
.
├── backend/   # Laravel API
├── frontend/  # React (Vite)
└── Dockerfile # Build multi-stage

Fluxo da aplicação:
- Backend importa dataset JSON;
- API expõe endpoints REST;
- Frontend consome /api/*;
- Laravel serve SPA buildada;

Rodar localmente
Pré-requisitos:
- PHP 8.2+
- Node 18+
- MySQL
- Composer

-> Backend
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan import:json
php artisan serve

API disponível em:

http://localhost:8000
-> Frontend
cd frontend
npm install
npm run dev


Frontend em:
http://localhost:5173
Rodar com Docker (produção-like)
docker build -t ibridge-dashboard .
docker run -p 8080:8080 ibridge-dashboard

Acesse:
http://localhost:8080


Deploy realizado utilizando:
- Docker multi-stage
- Railway como PaaS
- MySQL gerenciado
- Estratégia adotada
- Build React via Vite
- Assets copiados para public/
- Laravel serve SPA
- API e frontend no mesmo domínio
Isso elimina CORS e simplifica a infraestrutura.

Endpoints da API:
Método	Endpoint
GET	/api/resumo
GET	/api/top-operadores
GET	/api/top-listas
GET	/api/top-campanhas

Escolhido para:
- Simplificar deploy;
- Evitar CORS;
- Manter uma única URL pública;

Docker multi-stage;

- Node apenas para build
- PHP enxuto no runtime
- Imagem menor e mais segura

URLs relativas para API

- Uso de /api no frontend para:
- Compatibilidade local/produção
- Evitar hardcoded hosts

Boas práticas aplicadas:
- .env fora do versionamento
- Variáveis via environment
- Sem secrets no repositório
- Build reprodutível com Docker

Melhorias futuras:

- Autenticação JWT
- Cache Redis
- Lazy loading dos gráficos
- Testes automatizados
- Observabilidade (logs estruturados)

Autor
Gabriel Pascal
Fullstack Developer — PHP + JS

Laravel | React | Docker

Projeto desenvolvido para fins educacionais e avaliação técnica.
