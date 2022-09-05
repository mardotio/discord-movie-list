FROM node:16
WORKDIR /app
COPY ../discord-movie-list/package.json .
COPY ../discord-movie-list/package-lock.json .
RUN npm ci
COPY ../discord-movie-list/src src
COPY ../discord-movie-list/public public
COPY ../discord-movie-list/tsconfig.json .
COPY ../discord-movie-list/.eslintrc .
COPY ../discord-movie-list/.prettierignore .
COPY ../discord-movie-list/.prettierrc .
CMD ["npm", "start"]
