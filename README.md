<p align="center">
  <img src="./services/ui/discord-movie-list/public/logo192.png" alt="Discord Movie List Logo">
</p>

# Discord Movie List

## Local development

Before being able to run this project locally you will need to create a Discord bot that you can use for testing. You
can follow the [instructions below](#creating-discord-bot) for creating a bot.

Once you have your bot set up you can create an environment file at `dev/.env` with the following variables (make sure
to replace the bot token/ID with your values):

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
DISCORD_BOT_TOKEN=<your bot token>
DISCORD_BOT_ID=<your bot ID>
UI_ENDPOINT=http://localhost:3000
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

Once everything is running, you can go to the UI at http://localhost:3000. Each service is watching its files and will
restart or hot reload as needed without you having to restart manually.

Additionally, you will have to run `npm i` in each service directory in order to get your IDE's to recognize that all
dependencies have been installed. You do not have to do this to develop locally, but if you don't your code editor will
complain.

## Creating discord bot

You can create a Discord bot from the [Developer Portal](https://discord.com/developers/applications)

1) Click on _New Application_ and give your app a name (name doesn't matter, it can be whatever you want)
2) Under the _General Information_ tab take note of the _APPLICATION ID_ (that value maps to the `DISCORD_BOT_ID`
environment variable in your `.env` file)
3) Go to the _Bot_ section and click on _Add Bot_
4) From _Bot_ tab, unselect the _PUBLIC BOT_ option and click on _Save Changes_
5) From the _Bot_ tab click on _Reset Token_ (you may be asked for password or 2FA code), take note of the token
displayed (this value is only shown once) that value will map to the `DISCORD_BOT_TOKEN` environment variable in your
`.env` file

### Inviting bot to server

From the Developer Portal, select the app that's associated with your bot.

1) Select the _OAuth2_ tab, then select the _URL Generator_ sub-option
2) Check _bot_ in the _SCOPES_ section
3) In the _BOT PERMISSIONS_ sections select the following permissions
    - _Send Messages_
4) Copy the link at the bottom of the page, and navigate to it on your browser
5) Follow the instructions on that page to select the server, and add the bot
