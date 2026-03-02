# Dockerfile multi-stage pour Angular

# ================================
# Stage 1: Build
# ================================
FROM node:20-alpine AS build

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Build de l'application Angular en mode production
RUN npm run build

# ================================
# Stage 2: Production
# ================================
FROM nginx:alpine

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers buildés depuis le stage précédent
#COPY --from=build /app/dist/school-countdown/browser /usr/share/nginx/html
COPY --from=build /app/dist/schoolCountdown/browser /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
