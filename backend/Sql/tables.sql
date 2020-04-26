CREATE TABLE "user" (
	"userId" SERIAL PRIMARY KEY NOT NULL,
	"isActive" BOOL DEFAULT false NOT NULL,
	"isDeleted" BOOL DEFAULT false NOT NULL,
	"spotifyId" INT,
    "country" VARCHAR(255),
    "displayName" VARCHAR(255),
	"email" VARCHAR(255) NOT NULL UNIQUE,
    "explicitContent" JSON,
    "externalUrls" JSON,
    "followers" JSON,
    "href" VARCHAR(128),
    "images" JSON,
    "product" VARCHAR(128),
    "type" VARCHAR(128),
    "uri" VARCHAR(128),
	"createOn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);