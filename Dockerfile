# Multi-stage build for Vite React SPA served by nginx
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json bun.lockb* ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runner
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK CMD wget -qO- http://127.0.0.1/ | grep -q "<!doctype html>" || exit 1
CMD ["nginx", "-g", "daemon off;"]

