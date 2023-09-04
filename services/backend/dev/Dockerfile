FROM node:16
WORKDIR /app
COPY ../package.json .
COPY ../package-lock.json .
RUN npm ci
COPY ../webpack.config.ts .
COPY ../tsconfig.json .
COPY ../prisma prisma
RUN npm run generate-client
COPY ../src src
CMD ["/bin/bash", "-c", "npm run migrate:dev && npm run start"]
