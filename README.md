<p align="center">
  <img src="./services/ui/discord-movie-list/public/logo192.png" alt="Discord Movie List Logo">
</p>

# Discord Movie List

## Local development

You will first need to create a environment file at `dev/.env` with the following variables:

```dotenv
POSTGRES_DB=movie_list
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5432
POSTGRES_HOST=db
SERVER_PORT=8000
DISCORD_JWT_SECRET=discord_jwt_secret
JWT_SECRET=jwt_secret
DISCORD_BOT_JWT_SECRET=discord_bot_jwt_secret
```

You will also need Docker installed to run the project locally. Once you have Docker set up, you can build and start
all services by running:

```bash
docker compose -f dev/docker-compose.yaml up --build
```

or if you already have images built:

```bash
docker compose -f dev/docker-compose.yaml up
```

Once everything is running, you can go to the UI at http://localhost:3000. Additionally, each service is watching it's
files and will restart or hot reload as needed without you having to restart manually.

Additionally, if you will have to run `npm i` in each service directory in order to get for IDE's to recognize that all
dependencies have been installed. You do not have to do this to develop locally, but if you don't your code editor will
complain.
