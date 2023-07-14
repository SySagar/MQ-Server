# Stage 1
FROM node:18.15.0-alpine AS base
ENV NODE_ENV production
ADD . /app
WORKDIR /app
# COPY package*.json ./app
RUN npm install 
# Stage 2
FROM gcr.io/distroless/nodejs18-debian11
WORKDIR /app
COPY --from=base /app /app
USER nonroot
CMD ["index.js"]