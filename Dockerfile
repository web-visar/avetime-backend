FROM node:22.13.0-bullseye-slim AS builder

WORKDIR /app
ENV TZ=Europe/Paris
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22.13.0-bullseye AS runner

# Install OpenSSL for cert generation
RUN apt update && apt install -y openssl

WORKDIR /app
ENV TZ=Europe/Paris

# Copy from your previous build stage
COPY --from=builder /app ./

# Create a folder for SSL certs
RUN mkdir -p /app/ssl

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]