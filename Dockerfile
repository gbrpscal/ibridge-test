FROM node:20-bookworm AS frontend
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

FROM php:8.3-cli-bookworm AS app

RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app/backend

COPY backend/ ./

RUN composer install --no-dev --optimize-autoloader

RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache

RUN rm -rf public/app && mkdir -p public/app
COPY --from=frontend /app/frontend/dist/ /app/backend/public/app/

RUN rm -rf public/assets && mkdir -p public/assets
COPY --from=frontend /app/frontend/dist/assets/ /app/backend/public/assets/

CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=${PORT:-8080}"]