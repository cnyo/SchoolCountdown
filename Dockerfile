# Stage 1: Build
FROM node:22-alpine AS build

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Build argument pour l'environnement
ARG BUILD_ENV=production

# Build de l'application selon l'environnement
RUN if [ "$BUILD_ENV" = "development" ]; then \
      npm run build -- --configuration=development; \
    else \
      npm run build -- --configuration=production; \
    fi

# Stage 2: Production
FROM nginx:alpine

# Copier la configuration nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers buildés depuis le stage précédent
COPY --from=build /app/dist/schoolCountdown/browser /usr/share/nginx/html

# Exposer le port 80 (nginx par défaut)
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
