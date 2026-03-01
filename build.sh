#!/usr/bin/env bash
set -e

echo "PWD: $(pwd)"
echo "Listing root:"
ls -la

test -d backend || (echo "ERRO: pasta backend não existe" && exit 1)
test -d frontend || (echo "ERRO: pasta frontend não existe" && exit 1)

echo "== Backend =="
cd backend
composer install --no-dev --optimize-autoloader
cd ..

echo "== Frontend =="
cd frontend
npm ci
npm run build
cd ..

echo "== Copy dist -> backend/public/app =="
rm -rf backend/public/app
mkdir -p backend/public/app
cp -r frontend/dist/* backend/public/app/

echo "Build finalizado."