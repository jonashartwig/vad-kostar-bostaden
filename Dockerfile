FROM node:14-alpine3.11

WORKDIR /app
COPY app/ .

RUN npm ci --ignore-scripts && \
  npm run build && \
  npm run test

FROM nginx:1.17.10-alpine

COPY --from=0 /app/public/* /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
