# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 — Build
# Uses Node 16 LTS (compatible with Angular 12 / TypeScript 4.3)
# ─────────────────────────────────────────────────────────────────────────────
FROM node:16-alpine AS build

# Set working directory inside container
WORKDIR /app

# Copy dependency manifests first (layer-cache optimisation —
# npm install only re-runs when package files change)
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies needed for build)
RUN npm ci --prefer-offline

# Copy the rest of the source code
COPY . .

# Compile Angular app in production mode
# Output lands in dist/sso-app (project name defined in package.json)
RUN npm run build -- --configuration production


# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 — Serve
# Lightweight nginx image serves the static build artefacts
# Final image has NO Node.js, NO source code, NO devDependencies
# ─────────────────────────────────────────────────────────────────────────────
FROM nginx:1.25-alpine AS serve

# Remove default nginx placeholder page
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled Angular app from build stage
COPY --from=build /app/dist/sso-app /usr/share/nginx/html

# Copy custom nginx config to handle Angular's client-side routing
# (all 404s redirect to index.html so the Angular router takes over)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx in foreground (required for Docker)
CMD ["nginx", "-g", "daemon off;"]
