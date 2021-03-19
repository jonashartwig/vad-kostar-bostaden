FROM node:15.12.0-alpine

WORKDIR /app
COPY app/ .

RUN npm ci --ignore-scripts && \
  npm run build && \
  npm run test

FROM nginx:1.19.8-alpine

COPY --from=0 /app/public/* /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
