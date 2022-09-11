FROM node:16 as package
WORKDIR /package
COPY packages/api-types api-types
COPY services/backend/src/apiTypes api-types/src
WORKDIR /package/api-types

FROM node:16
WORKDIR /app/packages
COPY --from=package /package/api-types api-types

WORKDIR /app/services/ui/discord-movie-list
COPY services/ui/discord-movie-list/package.json .
COPY services/ui/discord-movie-list/package-lock.json .
ENV PACKAGE_SOURCE=./src
RUN npm ci
COPY services/ui/discord-movie-list/src src
COPY services/ui/discord-movie-list/public public
COPY services/ui/discord-movie-list/tsconfig.json .
COPY services/ui/discord-movie-list/.eslintrc .
COPY services/ui/discord-movie-list/.prettierignore .
COPY services/ui/discord-movie-list/.prettierrc .
CMD ["npm", "start"]
