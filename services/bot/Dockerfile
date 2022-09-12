FROM node:16 as package
WORKDIR /package
COPY packages/api-types api-types
COPY services/backend/src/apiTypes api-types/src
WORKDIR /package/api-types


FROM node:16
WORKDIR /app/packages
COPY --from=package /package/api-types api-types
WORKDIR /app/services/bot
COPY services/bot/package.json .
COPY services/bot/package-lock.json .
ENV PACKAGE_SOURCE=./src
RUN npm ci
COPY services/bot/webpack.config.ts .
COPY services/bot/tsconfig.json .
COPY services/bot/src src
RUN npm run build:prod
RUN rm -rf src webpack.config.ts tsconfig.json
CMD ["npm", "run", "start:prod"]
