FROM node:22.13.0-bullseye-slim AS builder

WORKDIR /app
ENV TZ=Europe/Paris
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22.13.0-bullseye AS runner

WORKDIR /app
ENV TZ=Europe/Paris

# Copy from your previous build stage
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "run", "migration:run"]

ENTRYPOINT ["node", "dist/main.js"]