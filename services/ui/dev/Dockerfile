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

WORKDIR /app/services/ui/discord-movie-list
COPY services/ui/discord-movie-list/package.json .
COPY services/ui/discord-movie-list/package-lock.json .
RUN npm ci

COPY services/ui/discord-movie-list/.eslintrc .
COPY services/ui/discord-movie-list/.prettierignore .
COPY services/ui/discord-movie-list/.prettierrc .
COPY services/ui/discord-movie-list/vite.config.ts .
COPY services/ui/discord-movie-list/tsconfig.json .
COPY services/ui/discord-movie-list/index.html .
COPY services/ui/discord-movie-list/src src

CMD ["npm", "start"]
