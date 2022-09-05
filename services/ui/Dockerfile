FROM node:16 as ui
WORKDIR /app
COPY discord-movie-list/package.json .
COPY discord-movie-list/package-lock.json .
RUN npm ci
COPY discord-movie-list/src src
COPY discord-movie-list/public public
COPY discord-movie-list/tsconfig.json .
COPY discord-movie-list/.eslintrc .
COPY discord-movie-list/.prettierignore .
COPY discord-movie-list/.prettierrc .
RUN npm run build

FROM nginx
RUN mkdir /etc/letsencrypt
COPY nginx.conf /etc/nginx/nginx.template
COPY --from=ui /app/build /code/discord-movie-list/static
