#!/bin/bash
if [ ! -f /app/ssl/cert.pem ]; then
  echo "Generating self-signed SSL certificate..."
  openssl req -x509 -nodes -days 3650 \
    -newkey rsa:2048 \
    -keyout /app/ssl/key.pem \
    -out /app/ssl/cert.pem \
    -subj "/CN=localhost"
fi

# Optional: Run DB migrations
npm run migration:run

# Start your app over HTTPS
node dist/main.js