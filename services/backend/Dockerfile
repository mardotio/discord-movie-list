FROM node:16
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY prisma prisma
COPY src src
COPY webpack.config.ts .
COPY tsconfig.json .
RUN npm run build:prod
RUN rm -rf src webpack.config.ts tsconfig.json
CMD ["npm", "run", "start:prod"]
