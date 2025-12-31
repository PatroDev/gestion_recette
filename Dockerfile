# ---- Backend (Laravel) ----
FROM php:8.1-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath xml

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader

# ---- Frontend (React) ----
FROM node:18 AS nodebuild
WORKDIR /var/www/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

FROM php:8.1-fpm
COPY --from=nodebuild /var/www/frontend/build /var/www/public/frontend

CMD ["php-fpm"]
