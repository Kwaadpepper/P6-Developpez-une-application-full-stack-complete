-- REMOVE TABLES
DROP TABLE IF EXISTS "mddapi"."comments";


-- COMMENTS
CREATE TABLE "mddapi"."comments"(
   "uuid" UUID PRIMARY KEY NOT NULL,
   "content" character varying(500) NOT NULL,
   "post_uuid" UUID NOT NULL,
   "author_uuid" UUID NOT NULL,
   "created_at" timestamp with time zone NOT NULL,
   "updated_at" timestamp with time zone NOT NULL
);

CREATE INDEX comments_post_uuid ON "mddapi"."comments" USING btree ("post_uuid");
CREATE INDEX comments_author_uuid ON "mddapi"."comments" USING btree ("author_uuid");

COMMENT ON COLUMN "mddapi"."comments"."uuid" IS 'Unique uuid';
COMMENT ON COLUMN "mddapi"."comments"."content" IS 'Plain text message content';
COMMENT ON COLUMN "mddapi"."comments"."post_uuid" IS 'Post id FK';
COMMENT ON COLUMN "mddapi"."comments"."author_uuid" IS 'User id FK';
COMMENT ON COLUMN "mddapi"."comments"."created_at" IS 'Created at date';
COMMENT ON COLUMN "mddapi"."comments"."updated_at" IS 'Update at date';


-- FOREIGN KEYS
ALTER TABLE IF EXISTS "mddapi"."comments" DROP CONSTRAINT IF EXISTS "comments_posts_post_uuid";
ALTER TABLE IF EXISTS "mddapi"."comments" ADD CONSTRAINT "comments_posts_post_uuid" FOREIGN KEY ("post_uuid") REFERENCES "mddapi"."posts"("uuid") ON UPDATE restrict ON DELETE restrict;
ALTER TABLE IF EXISTS "mddapi"."comments" DROP CONSTRAINT IF EXISTS "comments_users_user_uuid";
ALTER TABLE IF EXISTS "mddapi"."comments" ADD CONSTRAINT "comments_users_author_uuid" FOREIGN KEY ("author_uuid") REFERENCES "mddapi"."users"("uuid") ON UPDATE restrict ON DELETE restrict;
