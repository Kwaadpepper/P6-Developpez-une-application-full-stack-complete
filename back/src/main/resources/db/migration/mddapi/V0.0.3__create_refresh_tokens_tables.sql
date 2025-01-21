-- REMOVE TABLES
DROP TABLE IF EXISTS "mddapi"."refresh_tokens";


-- COMMENTS
CREATE TABLE "mddapi"."refresh_tokens"(
   "uuid" UUID PRIMARY KEY NOT NULL,
   "token" UUID NOT NULL,
   "user_uuid" UUID NOT NULL,
   "expiry_date" timestamp with time zone NOT NULL
);

CREATE UNIQUE INDEX refresh_tokens_token_unique ON "mddapi"."refresh_tokens" USING btree ("token");
CREATE UNIQUE INDEX refresh_tokens_user_uuid_unique ON "mddapi"."refresh_tokens" USING btree ("user_uuid");

COMMENT ON COLUMN "mddapi"."refresh_tokens"."uuid" IS 'Unique uuid';
COMMENT ON COLUMN "mddapi"."refresh_tokens"."token" IS 'Refresh token uuid';
COMMENT ON COLUMN "mddapi"."refresh_tokens"."user_uuid" IS 'User id FK';
COMMENT ON COLUMN "mddapi"."refresh_tokens"."expiry_date" IS 'Expiration date for the jwt token';


-- FOREIGN KEYS
ALTER TABLE IF EXISTS "mddapi"."refresh_tokens" DROP CONSTRAINT IF EXISTS "refresh_tokens_user_user_uuid";
ALTER TABLE IF EXISTS "mddapi"."refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_user_uuid" FOREIGN KEY ("user_uuid") REFERENCES "mddapi"."users"("uuid") ON UPDATE restrict ON DELETE restrict;
