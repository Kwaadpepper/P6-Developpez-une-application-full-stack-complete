-- CREATE SCHEMA
CREATE SCHEMA IF NOT EXISTS "mddapi";

-- REMOVE TABLES
DROP TABLE IF EXISTS "mddapi"."subscriptions";
DROP TABLE IF EXISTS "mddapi"."posts";
DROP TABLE IF EXISTS "mddapi"."topics";
DROP TABLE IF EXISTS "mddapi"."credentials";
DROP TABLE IF EXISTS "mddapi"."users";


-- USERS
CREATE TABLE "mddapi"."users"(
   "uuid" UUID PRIMARY KEY NOT NULL,
   "firstname" character varying(255) NOT NULL,
   "lastname" character varying(255) NOT NULL,
   "email" character varying(255) NOT NULL,
   "created_at" timestamp with time zone NOT NULL,
   "updated_at" timestamp with time zone NOT NULL
);

CREATE UNIQUE INDEX users_email_unique ON "mddapi".users USING btree (email);

COMMENT ON COLUMN "mddapi"."users"."uuid" IS 'Unique uuid';
COMMENT ON COLUMN "mddapi"."users"."firstname" IS 'Firstname';
COMMENT ON COLUMN "mddapi"."users"."lastname" IS 'Lastname';
COMMENT ON COLUMN "mddapi"."users"."email" IS 'User unique email to auth and send transactional messages';
COMMENT ON COLUMN "mddapi"."users"."created_at" IS 'Created at date';
COMMENT ON COLUMN "mddapi"."users"."updated_at" IS 'Update at date';


-- CREDENTIALS
CREATE TABLE "mddapi"."credentials"(
   "uuid" UUID PRIMARY KEY NOT NULL,
   "username" character varying(50) NOT NULL,
   "password" character varying(255) NOT NULL,
   "api_token" UUID NOT NULL,
   "user_uuid" UUID NOT NULL,
   "created_at" timestamp with time zone NOT NULL,
   "updated_at" timestamp with time zone NOT NULL
);

CREATE UNIQUE INDEX credentials_username_unique ON "mddapi".credentials USING btree (username);
CREATE UNIQUE INDEX credentials_api_token_unique ON "mddapi".credentials USING btree (api_token);
CREATE UNIQUE INDEX credentials_user_uuid_unique ON "mddapi".credentials USING btree (user_uuid);

COMMENT ON COLUMN "mddapi"."credentials"."uuid" IS 'Unique uuid';
COMMENT ON COLUMN "mddapi"."credentials"."username" IS 'Unique username to auth';
COMMENT ON COLUMN "mddapi"."credentials"."password" IS 'Hashed password';
COMMENT ON COLUMN "mddapi"."credentials"."api_token" IS 'Unique uuid to identify the user from further api calls';
COMMENT ON COLUMN "mddapi"."credentials"."user_uuid" IS 'User foreign key';
COMMENT ON COLUMN "mddapi"."credentials"."created_at" IS 'Created at date';
COMMENT ON COLUMN "mddapi"."credentials"."updated_at" IS 'Update at date';


-- TOPICS
CREATE TABLE "mddapi"."topics"(
   "uuid" UUID PRIMARY KEY NOT NULL,
   "slug" character varying(255) NOT NULL,
   "name" character varying(255) NOT NULL,
   "description" character varying(2000) NOT NULL,
   "created_at" timestamp with time zone NOT NULL,
   "updated_at" timestamp with time zone NOT NULL
);

CREATE UNIQUE INDEX topics_slug_unique ON "mddapi".topics USING btree (slug);

COMMENT ON COLUMN "mddapi"."topics"."uuid" IS 'Unique uuid';
COMMENT ON COLUMN "mddapi"."topics"."slug" IS 'Name unique slugged describing the topic';
COMMENT ON COLUMN "mddapi"."topics"."name" IS 'Name describing the topic';
COMMENT ON COLUMN "mddapi"."topics"."description" IS 'Plain text description for the topic';
COMMENT ON COLUMN "mddapi"."topics"."created_at" IS 'Created at date';
COMMENT ON COLUMN "mddapi"."topics"."updated_at" IS 'Update at date';


-- SUBSCRIPTIONS
CREATE TABLE "mddapi"."subscriptions"(
   "uuid" UUID PRIMARY KEY NOT NULL,
   "topic_uuid" UUID NOT NULL,
   "user_uuid" UUID NOT NULL,
   "created_at" timestamp with time zone NOT NULL,
   "updated_at" timestamp with time zone NOT NULL
);

CREATE UNIQUE INDEX subscriptions_unique ON "mddapi".subscriptions USING btree ("topic_uuid", "user_uuid");

CREATE INDEX subscriptions_rental_uuid ON "mddapi"."subscriptions" USING btree ("topic_uuid");
CREATE INDEX subscriptions_user_uuid ON "mddapi"."subscriptions" USING btree ("user_uuid");

COMMENT ON COLUMN "mddapi"."subscriptions"."uuid" IS 'Unique uuid';
COMMENT ON COLUMN "mddapi"."subscriptions"."topic_uuid" IS 'Topic foreign key';
COMMENT ON COLUMN "mddapi"."subscriptions"."user_uuid" IS 'User foreign key';
COMMENT ON COLUMN "mddapi"."subscriptions"."created_at" IS 'Created at date';
COMMENT ON COLUMN "mddapi"."subscriptions"."updated_at" IS 'Update at date';


-- POSTS
CREATE TABLE "mddapi"."posts"(
   "uuid" UUID PRIMARY KEY NOT NULL,
   "slug" character varying(255) NOT NULL,
   "title" character varying(255) NOT NULL,
   "content" text NOT NULL,
   "topic_uuid" UUID NOT NULL,
   "author_uuid" UUID NOT NULL,
   "created_at" timestamp with time zone NOT NULL,
   "updated_at" timestamp with time zone NOT NULL
);

CREATE UNIQUE INDEX posts_slug_unique ON "mddapi".posts USING btree (slug);

CREATE INDEX posts_topic_uuid ON "mddapi"."posts" USING btree ("topic_uuid");
CREATE INDEX posts_author_uuid ON "mddapi"."posts" USING btree ("author_uuid");

COMMENT ON COLUMN "mddapi"."posts"."uuid" IS 'Unique uuid';
COMMENT ON COLUMN "mddapi"."posts"."slug" IS 'Title unique slugged describing the post';
COMMENT ON COLUMN "mddapi"."posts"."title" IS 'Title describing the post';
COMMENT ON COLUMN "mddapi"."posts"."content" IS 'Markdown text message content';
COMMENT ON COLUMN "mddapi"."posts"."topic_uuid" IS 'Topic id FK';
COMMENT ON COLUMN "mddapi"."posts"."author_uuid" IS 'User id FK';
COMMENT ON COLUMN "mddapi"."posts"."created_at" IS 'Created at date';
COMMENT ON COLUMN "mddapi"."posts"."updated_at" IS 'Update at date';


-- FOREIGN KEYS
ALTER TABLE IF EXISTS "mddapi"."credentials" DROP CONSTRAINT IF EXISTS "credentials_users_user_uuid";
ALTER TABLE IF EXISTS "mddapi"."credentials" ADD CONSTRAINT "credentials_users_user_uuid" FOREIGN KEY ("user_uuid") REFERENCES "mddapi"."users"("uuid") ON UPDATE restrict ON DELETE restrict;

ALTER TABLE IF EXISTS "mddapi"."subscriptions" DROP CONSTRAINT IF EXISTS "subscriptions_topics_topic_uuid";
ALTER TABLE IF EXISTS "mddapi"."subscriptions" ADD CONSTRAINT "subscriptions_topics_topic_uuid" FOREIGN KEY ("topic_uuid") REFERENCES "mddapi"."topics"("uuid") ON UPDATE restrict ON DELETE restrict;
ALTER TABLE IF EXISTS "mddapi"."subscriptions" DROP CONSTRAINT IF EXISTS "subscriptions_users_user_uuid";
ALTER TABLE IF EXISTS "mddapi"."subscriptions" ADD CONSTRAINT "subscriptions_users_user_uuid" FOREIGN KEY ("user_uuid") REFERENCES "mddapi"."users"("uuid") ON UPDATE restrict ON DELETE restrict;

ALTER TABLE IF EXISTS "mddapi"."posts" DROP CONSTRAINT IF EXISTS "posts_topics_topic_uuid";
ALTER TABLE IF EXISTS "mddapi"."posts" ADD CONSTRAINT "posts_topics_topic_uuid" FOREIGN KEY ("topic_uuid") REFERENCES "mddapi"."topics"("uuid") ON UPDATE restrict ON DELETE restrict;
ALTER TABLE IF EXISTS "mddapi"."posts" DROP CONSTRAINT IF EXISTS "posts_users_author_uuid";
ALTER TABLE IF EXISTS "mddapi"."posts" ADD CONSTRAINT "posts_users_author_uuid" FOREIGN KEY ("author_uuid") REFERENCES "mddapi"."users"("uuid") ON UPDATE restrict ON DELETE restrict;
