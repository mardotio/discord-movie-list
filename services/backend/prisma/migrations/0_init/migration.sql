CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "servers" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "foreign_id" VARCHAR NOT NULL,
    "icon_id" VARCHAR,

    CONSTRAINT "servers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "foreign_id" VARCHAR NOT NULL,
    "username" VARCHAR NOT NULL,
    "avatar_id" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "server_users" (
    "user_id" UUID NOT NULL,
    "server_id" UUID NOT NULL,
    "user_nickname" VARCHAR
);

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "server_id" UUID NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "added_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "watched_on" TIMESTAMP(6),
    "user_id" UUID NOT NULL,
    "server_id" UUID NOT NULL,
    "status_id" UUID NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_tags" (
    "user_id" UUID NOT NULL,
    "server_id" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "movie_statuses" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "approval_count" INTEGER NOT NULL,
    "server_id" UUID NOT NULL,
    "next_id" UUID,

    CONSTRAINT "movie_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reactions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "reaction" VARCHAR NOT NULL,
    "user_id" UUID NOT NULL,
    "movie_id" UUID NOT NULL,

    CONSTRAINT "reactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "servers_foreign_id_key" ON "servers"("foreign_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_foreign_id_key" ON "users"("foreign_id");

-- CreateIndex
CREATE UNIQUE INDEX "server_users_user_id_server_id_key" ON "server_users"("user_id", "server_id");

-- CreateIndex
CREATE UNIQUE INDEX "movie_tags_user_id_server_id_key" ON "movie_tags"("user_id", "server_id");

-- CreateIndex
CREATE UNIQUE INDEX "movie_statuses_name_key" ON "movie_statuses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "movie_statuses_next_id_key" ON "movie_statuses"("next_id");

-- CreateIndex
CREATE UNIQUE INDEX "reactions_user_id_movie_id_key" ON "reactions"("user_id", "movie_id");

-- AddForeignKey
ALTER TABLE "server_users" ADD CONSTRAINT "server_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "server_users" ADD CONSTRAINT "server_users_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "movie_statuses"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movie_tags" ADD CONSTRAINT "movie_tags_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movie_tags" ADD CONSTRAINT "movie_tags_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movie_statuses" ADD CONSTRAINT "movie_statuses_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "movie_statuses" ADD CONSTRAINT "movie_statuses_next_id_fkey" FOREIGN KEY ("next_id") REFERENCES "movie_statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
