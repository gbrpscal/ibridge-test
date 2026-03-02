# ---------- 1) Build do frontend ----------
FROM node:20-bookworm AS frontend
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build


# ---------- 2) App (Laravel) ----------
FROM php:8.3-cli-bookworm AS app

RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app/backend

# Copia o backend inteiro (inclui artisan)
COPY backend/ ./

# Agora sim pode rodar composer (artisan existe)
RUN composer install --no-dev --optimize-autoloader

# Pastas necessárias
RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache

# Copia build do frontend
RUN rm -rf public/app && mkdir -p public/app
COPY --from=frontend /app/frontend/dist/ /app/backend/public/app/

CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=${PORT:-8080}"]