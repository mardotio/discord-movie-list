FROM node:16 as package
ENV PACKAGE_SOURCE=/apiTypes
WORKDIR $PACKAGE_SOURCE
COPY services/backend/src/apiTypes .
WORKDIR /package/api-types
COPY packages/api-types .
RUN npm run generate

FROM node:16
ENV CI=true
WORKDIR /app/packages
COPY --from=package /package/api-types api-types
WORKDIR /app/services/bot
COPY services/bot/package.json .
COPY services/bot/package-lock.json .
RUN npm ci
COPY services/bot/webpack.config.ts .
COPY services/bot/tsconfig.json .
COPY services/bot/src src
CMD ["npm", "run", "start"]
