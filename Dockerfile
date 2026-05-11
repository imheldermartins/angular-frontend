# Estágio 1: Build
FROM node:22-alpine AS build

WORKDIR /app

# Copia apenas os arquivos de definição de dependências primeiro (otimiza cache)
COPY package*.json ./

# Instala as dependências internamente
RUN npm install

# Copia o restante do código
COPY . .

# Gera o build de produção
RUN npm run build

# Estágio 2: Serve (Nginx)
FROM nginx:alpine

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos gerados no build para o diretório do Nginx
# Nota: O caminho dist/frontend/browser é o padrão para Angular 17+
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
