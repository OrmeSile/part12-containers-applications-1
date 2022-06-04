FROM node:16 AS test-step

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm test

FROM node:16 AS build-stage

WORKDIR /usr/src/app

ENV REACT_APP_BACKEND_URL=http://localhost:3000/

COPY --from=test-step /usr/src/app /usr/src/app

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
