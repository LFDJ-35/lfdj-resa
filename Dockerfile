FROM node:26.8.2-alpine3.24 AS build

WORKDIR /app

COPY    ./package.json \
        ./package-lock.json \
        /app/

RUN npm install

COPY    ./index.html \
        ./tsconfig.json \
        ./vite.config.ts \
        ./eslint.config.ts \
        ./tsconfig.node.json \
        ./env.d.ts \
        ./tsconfig.app.json \
        /app/

COPY    ./src /app/src/
COPY    ./public /app/public/

RUN npm run build

FROM node:26.8.2-alpine3.24 AS prod

WORKDIR /app

RUN passwd -l root
RUN addgroup app
RUN adduser -S app -G app

RUN npm install -g serve

COPY --from=build --chown=app:app /app/dist /app

USER app
CMD [ "npx", "serve" ]
