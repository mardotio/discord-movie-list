FROM node:16
WORKDIR /app
COPY ../package.json .
COPY ../package-lock.json .
RUN npm ci
COPY ../webpack.config.ts .
COPY ../tsconfig.json .
COPY ../src src
CMD ["npm", "run", "start"]
