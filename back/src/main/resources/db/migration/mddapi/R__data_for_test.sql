-- USERS
DELETE
    FROM "mddapi"."refresh_tokens"
    WHERE "mddapi"."refresh_tokens"."user_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879061';
DELETE
    FROM "mddapi"."subscriptions"
    WHERE "mddapi"."subscriptions"."user_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879061';
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."author_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879061'
    );
DELETE
    FROM "mddapi"."posts" WHERE "author_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879061';
DELETE
    FROM "mddapi"."credentials" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879062';
DELETE
    FROM "mddapi"."users" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879061';
INSERT
    INTO "mddapi"."users" ("uuid", "name", "email", "created_at", "updated_at")
    VALUES (
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
        'John Doe',
        'johndoe@example.net',
        '2024-12-03 17:17:44',
        '2024-12-26 18:26:16'
    );


INSERT
    INTO "mddapi"."credentials" ("uuid", "password", "api_token", "user_uuid", "created_at", "updated_at")
    VALUES (
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879062',
        '$argon2id$v=19$m=16384,t=2,p=1$tH0i+nnt6bhiSPf+bqfAog$7nmDmTGrSnMxxSZf/CK2xjTm8epWC+u3T3ao0b/lu9A',
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879010',
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
        '2024-12-03 17:17:44',
        '2024-12-26 18:26:16'
    );

-- TOPICS

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879000'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879000'
    );
DELETE
    FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879000';
INSERT
    INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
    VALUES (
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879000',
        'databases',
        'Databases',
        '## Some informations about databases
This is a test description for databases topic',
        '2024-12-03 17:17:44',
        '2024-12-26 18:26:16'
    );

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879001'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879001'
    );
DELETE
    FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879001';
INSERT
    INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
    VALUES (
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879001',
        'markdown',
        'Markdown',
        '## Everthing about markdown
This is a test description for markdown topic',
        '2024-12-03 17:17:44',
        '2024-12-26 18:26:16'
    );

-- POSTS

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879002'
    );
DELETE
    FROM "mddapi"."posts" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6872002';
INSERT
    INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
    VALUES (
        '6b8c767f-aa9f-48d3-b6c4-03e1f6872002',
        'how-to-readmarkdown',
        'How to read markdown',
        '# How to read markdown
This is a test content for how to read markdown post',
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879001',
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
        '2024-12-03 17:17:44',
        '2024-12-26 18:26:16'
    );

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879001'
    );
DELETE
    FROM "mddapi"."posts" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6872005';
INSERT
    INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
    VALUES (
        '6b8c767f-aa9f-48d3-b6c4-03e1f6872005',
        'markdown-sample-md',
        'markdown-sample.md',
        'An h1 header
============

Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists
look like:

  * this one
  * that one
  * the other one

Note that --- not considering the asterisk --- the actual text
content starts at 4-columns in.

> Block quotes are
> written like so.
>
> They can span multiple paragraphs,
> if you like.

Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it´s all
in chapters 12--14"). Three dots ... will be converted to an ellipsis.
Unicode is supported. ☺



An h2 header
------------

Here´s a numbered list:

 1. first item
 2. second item
 3. third item

Note again how the actual text starts at 4 columns in (4 characters
from the left side). Here´s a code sample:

    # Let me re-iterate ...
    for i in 1 .. 10 { do-something(i) }

As you probably guessed, indented 4 spaces. By the way, instead of
indenting the block, you can use delimited blocks, if you like:

~~~
define foobar() {
    print "Welcome to flavor country!";
}
~~~

(which makes copying & pasting easier). You can optionally mark the
delimited block for Pandoc to syntax highlight it:

~~~python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i
~~~



### An h3 header ###

Now a nested list:

 1. First, get these ingredients:

      * carrots
      * celery
      * lentils

 2. Boil some water.

 3. Dump everything in the pot and follow
    this algorithm:

        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    Do not bump wooden spoon or it will fall.

Notice again how text always lines up on 4-space indents (including
that last line which continues item 3 above).

Here´s a link to [a website](http://foo.bar), to a [local
doc](local-doc.html), and to a [section heading in the current
doc](#an-h2-header). Here´s a footnote [^1].

[^1]: Footnote text goes here.

Tables can look like this:

size  material      color
----  ------------  ------------
9     leather       brown
10    hemp canvas   natural
11    glass         transparent

Table: Shoes, their sizes, and what they´re made of

(The above is the caption for the table.) Pandoc also supports
multi-line tables:

--------  -----------------------
keyword   text
--------  -----------------------
red       Sunsets, apples, and
          other red or reddish
          things.

green     Leaves, grass, frogs
          and other things it´s
          not easy being.
--------  -----------------------

A horizontal rule follows.

***

Here´s a definition list:

apples
  : Good for making applesauce.
oranges
  : Citrus!
tomatoes
  : There´s no "e" in tomatoe.

Again, text is indented 4 spaces. (Put a blank line between each
term/definition pair to spread things out more.)

Here´s a "line block":

| Line one
|   Line too
| Line tree

and images can be specified like so:

![example image](example-image.jpg "An exemplary image")

Inline math equations go in like so: $\omega = d\phi / dt$. Display
math should get its own line and be put in in double-dollarsigns:

$$I = \int \rho R^{2} dV$$

And note that you can backslash-escape any punctuation characters
which you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879001',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
    );


-- TOPICS

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879002'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879002'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879002';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879002',
    'java',
    'Java',
    '## Java Programming\nThis topic covers Java programming language.',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879003'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879003'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879003';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879003',
    'spring-boot',
    'Spring Boot',
    '## Spring Boot Framework\nThis topic covers Spring Boot framework.',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879004'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879004'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879004';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879004',
    'postgresql',
    'PostgreSQL',
    '## PostgreSQL Database\nThis topic covers PostgreSQL database.',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879005'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879005'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879005';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879005',
    'docker',
    'Docker',
    '## Docker Containers\nThis topic covers Docker containers.',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879006'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879006'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879006';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879006',
    'kubernetes',
    'Kubernetes',
    '## Kubernetes Orchestration\nThis topic covers Kubernetes orchestration.',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879007'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879007'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879007';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879007',
    'react',
    'React',
    '## React Library\nThis topic covers React library for building user interfaces.',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879008'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879008'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879008';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879008',
    'nodejs',
    'Node.js',
    '## Node.js Runtime\nThis topic covers Node.js runtime environment.',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879009'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879009'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879009';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879009',
    'python',
    'Python',
    '## Python Programming\nThis topic covers Python programming language.',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879010'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879010'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879010';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879010',
    'git',
    'Git',
    '## Git Version Control\nThis topic covers Git version control system.',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879011'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879011'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879011';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879011',
    'linux',
    'Linux',
    '## Linux Operating System\nThis topic covers Linux operating system.',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

-- POSTS

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873001'
    );
DELETE FROM "mddapi"."posts" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873001';
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873001',
    'java-introduction',
    'Introduction to Java',
    '# Introduction to Java\nJava is a high-level, class-based, object-oriented programming language.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879002',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873002'
    );
DELETE FROM "mddapi"."posts" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873002';
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873002',
    'spring-boot-overview',
    'Overview of Spring Boot',
    '# Overview of Spring Boot\nSpring Boot makes it easy to create stand-alone, production-grade Spring based Applications.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879003',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873003'
    );
DELETE FROM "mddapi"."posts" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873003';
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873003',
    'postgresql-basics',
    'PostgreSQL Basics',
    '# PostgreSQL Basics\nPostgreSQL is a powerful, open source object-relational database system.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879004',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873004'
    );
DELETE FROM "mddapi"."posts" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873004';
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873004',
    'docker-introduction',
    'Introduction to Docker',
    '# Introduction to Docker\nDocker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879005',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873005'
    );
DELETE FROM "mddapi"."posts" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873005';
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873005',
    'kubernetes-overview',
    'Overview of Kubernetes',
    '# Overview of Kubernetes\nKubernetes is an open-source container-orchestration system for automating computer application deployment, scaling, and management.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879006',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873006'
    );
DELETE FROM "mddapi"."posts" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873006';
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873006',
    'react-introduction',
    'Introduction to React',
    '# Introduction to React\nReact is a JavaScript library for building user interfaces.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879007',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-03-03 17:17:44',
    '2024-03-26 18:26:16'
);

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873007'
    );
DELETE FROM "mddapi"."posts" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873007';
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873007',
    'nodejs-overview',
    'Overview of Node.js',
    '# Overview of Node.js\nNode.js is a JavaScript runtime built on Chrome´s V8 JavaScript engine.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879008',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-02-03 17:17:44',
    '2024-02-26 18:26:16'
);


DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873008'
    );
DELETE FROM "mddapi"."posts" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873008';
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873008',
    'python-basics',
    'Python Basics',
    '# Python Basics\nPython is an interpreted, high-level and general-purpose programming language.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879009',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-03 17:17:44',
    '2024-12-26 13:26:16'
);

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873009'
    );
DELETE FROM "mddapi"."posts" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873009';
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873009',
    'git-introduction',
    'Introduction to Git',
    '# Introduction to Git\nGit is a distributed version control system.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879010',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-03 03:17:44',
    '2024-12-26 03:26:16'
);

DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873010'
    );
DELETE FROM "mddapi"."posts" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6873010';
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873010',
    'linux-basics',
    'Linux Basics',
    '# Linux Basics\nLinux is a family of open-source Unix-like operating systems.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879011',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-01 08:17:44',
    '2024-12-01 02:26:16'
);

-- Topic 1
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879012'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879012'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879012';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879012',
    'html',
    'HTML',
    '## HTML Basics\nThis topic covers the basics of HTML.',
    '2024-12-01 17:17:44',
    '2024-12-01 18:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873011',
    'html-introduction',
    'Introduction to HTML',
    '# Introduction to HTML\nHTML is the standard markup language for creating web pages.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879012',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-01 17:17:44',
    '2024-12-01 18:26:16'
);

-- Topic 2
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879013'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879013'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879013';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879013',
    'css',
    'CSS',
    '## CSS Basics\nThis topic covers the basics of CSS.',
    '2024-12-03 02:17:44',
    '2024-12-26 02:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873012',
    'css-introduction',
    'Introduction to CSS',
    '# Introduction to CSS\nCSS is a language used to describe the style of document written in HTML.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879013',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-03 02:17:44',
    '2024-12-26 02:26:16'
);

-- Topic 3
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879014'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879014'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879014';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879014',
    'javascript',
    'JavaScript',
    '## JavaScript Basics\nThis topic covers the basics of JavaScript.',
    '2024-12-01 17:17:44',
    '2024-12-01 18:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873013',
    'javascript-introduction',
    'Introduction to JavaScript',
    '# Introduction to JavaScript\nJavaScript is a programming language that allows you to implement complex features on web pages.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879014',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-02 17:17:44',
    '2024-12-03 18:26:16'
);

-- Topic 4
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879015'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879015'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879015';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879015',
    'typescript',
    'TypeScript',
    '## TypeScript Basics\nThis topic covers the basics of TypeScript.',
    '2024-12-08 17:17:44',
    '2024-12-08 18:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873014',
    'typescript-introduction',
    'Introduction to TypeScript',
    '# Introduction to TypeScript\nTypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879015',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-07 17:17:44',
    '2024-12-07 18:26:16'
);

-- Topic 5
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879016'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879016'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879016';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879016',
    'angular',
    'Angular',
    '## Angular Framework\nThis topic covers the Angular framework.',
    '2024-12-05 17:17:44',
    '2024-12-05 18:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873015',
    'angular-introduction',
    'Introduction to Angular',
    '# Introduction to Angular\nAngular is a platform for building mobile and desktop web applications.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879016',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-04 17:17:44',
    '2024-12-04 18:26:16'
);

-- Topic 6
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879017'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879017'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879017';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879017',
    'vuejs',
    'Vue.js',
    '## Vue.js Framework\nThis topic covers the Vue.js framework.',
    '2024-12-01 17:17:44',
    '2024-12-01 18:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873016',
    'vuejs-introduction',
    'Introduction to Vue.js',
    '# Introduction to Vue.js\nVue.js is a progressive framework for building user interfaces.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879017',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-01 17:17:44',
    '2024-12-01 18:26:16'
);

-- Topic 7
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879018'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879018'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879018';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879018',
    'flutter',
    'Flutter',
    '## Flutter Framework\nThis topic covers the Flutter framework.',
    '2024-12-02 17:17:44',
    '2024-12-02 18:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873017',
    'flutter-introduction',
    'Introduction to Flutter',
    '# Introduction to Flutter\nFlutter is an open-source UI software development toolkit created by Google.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879018',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-02 17:17:44',
    '2024-12-02 18:26:16'
);

-- Topic 8
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879019'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879019'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879019';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879019',
    'swift',
    'Swift',
    '## Swift Programming\nThis topic covers the Swift programming language.',
    '2024-12-11 17:17:44',
    '2024-12-11 18:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873018',
    'swift-introduction',
    'Introduction to Swift',
    '# Introduction to Swift\nSwift is a powerful and intuitive programming language for macOS, iOS, watchOS, and tvOS.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879019',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-11 17:17:44',
    '2024-12-12 18:26:16'
);

-- Topic 9
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879020'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879020'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879020';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879020',
    'kotlin',
    'Kotlin',
    '## Kotlin Programming\nThis topic covers the Kotlin programming language.',
    '2024-12-02 17:17:44',
    '2024-12-03 18:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873019',
    'kotlin-introduction',
    'Introduction to Kotlin',
    '# Introduction to Kotlin\nKotlin is a cross-platform, statically typed, general-purpose programming language with type inference.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879020',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-04 17:17:44',
    '2024-12-04 18:26:16'
);

-- Topic 10
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879021'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879021'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879021';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879021',
    'ruby',
    'Ruby',
    '## Ruby Programming\nThis topic covers the Ruby programming language.',
    '2024-12-02 17:17:44',
    '2024-12-06 18:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873020',
    'ruby-introduction',
    'Introduction to Ruby',
    '# Introduction to Ruby\nRuby is a dynamic, open source programming language with a focus on simplicity and productivity.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879021',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-05 17:17:44',
    '2024-12-05 18:26:16'
);

-- Topic 11
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879022'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879022'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879022';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879022',
    'php',
    'PHP',
    '## PHP Programming\nThis topic covers the PHP programming language.',
    '2024-12-04 17:17:44',
    '2024-12-04 18:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873021',
    'php-introduction',
    'Introduction to PHP',
    '# Introduction to PHP\nPHP is a popular general-purpose scripting language that is especially suited to web development.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879022',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-01 17:17:44',
    '2024-12-01 18:26:16'
);

-- Topic 12
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879023'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879023'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879023';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879023',
    'csharp',
    'C#',
    '## C# Programming\nThis topic covers the C# programming language.',
    '2024-12-02 17:17:44',
    '2024-12-02 18:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873022',
    'csharp-introduction',
    'Introduction to C#',
    '# Introduction to C#\nC# is a modern, object-oriented programming language developed by Microsoft.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879023',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-05 17:17:44',
    '2024-12-05 18:26:16'
);

-- Topic 13
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879024'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879024'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879024';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879024',
    'go',
    'Go',
    '## Go Programming\nThis topic covers the Go programming language.',
    '2024-12-12 17:17:44',
    '2024-12-12 18:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873023',
    'go-introduction',
    'Introduction to Go',
    '# Introduction to Go\nGo is an open source programming language that makes it easy to build simple, reliable, and efficient software.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879024',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-13 17:17:44',
    '2024-12-13 18:26:16'
);

-- Topic 14
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879025'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879025'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879025';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879025',
    'rust',
    'Rust',
    '## Rust Programming\nThis topic covers the Rust programming language.',
    '2024-12-16 17:17:44',
    '2024-12-16 18:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873024',
    'rust-introduction',
    'Introduction to Rust',
    '# Introduction to Rust\nRust is a systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879025',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-15 17:17:44',
    '2024-12-15 18:26:16'
);

-- Topic 15
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879026'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879026'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879026';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879026',
    'scala',
    'Scala',
    '## Scala Programming\nThis topic covers the Scala programming language.',
    '2024-12-15 17:17:44',
    '2024-12-15 18:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873025',
    'scala-introduction',
    'Introduction to Scala',
    '# Introduction to Scala\nScala combines object-oriented and functional programming in one concise, high-level language.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879026',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-13 17:17:44',
    '2024-12-13 18:26:16'
);

-- Topic 16
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879027'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879027'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879027';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879027',
    'elixir',
    'Elixir',
    '## Elixir Programming\nThis topic covers the Elixir programming language.',
    '2024-12-18 17:17:44',
    '2024-12-18 18:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873026',
    'elixir-introduction',
    'Introduction to Elixir',
    '# Introduction to Elixir\nElixir is a dynamic, functional language designed for building scalable and maintainable applications.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879027',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-17 17:17:44',
    '2024-12-17 18:26:16'
);

-- Topic 17
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879028'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879028'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879028';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879028',
    'clojure',
    'Clojure',
    '## Clojure Programming\nThis topic covers the Clojure programming language.',
    '2024-12-12 17:17:44',
    '2024-12-12 18:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873027',
    'clojure-introduction',
    'Introduction to Clojure',
    '# Introduction to Clojure\nClojure is a dynamic, general-purpose programming language, combining the approachability and interactive development of a scripting language with an efficient and robust infrastructure for multithreaded programming.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879028',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-14 17:17:44',
    '2024-12-14 18:26:16'
);

-- Topic 18
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879029'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879029'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879029';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879029',
    'perl',
    'Perl',
    '## Perl Programming\nThis topic covers the Perl programming language.',
    '2024-12-03 11:17:44',
    '2024-12-26 11:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873028',
    'perl-introduction',
    'Introduction to Perl',
    '# Introduction to Perl\nPerl is a highly capable, feature-rich programming language with over 30 years of development.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879029',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-03 10:17:44',
    '2024-12-26 10:26:16'
);

-- Topic 19
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879030'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879030'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879030';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879030',
    'haskell',
    'Haskell',
    '## Haskell Programming\nThis topic covers the Haskell programming language.',
    '2024-12-03 11:17:44',
    '2024-12-26 14:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873029',
    'haskell-introduction',
    'Introduction to Haskell',
    '# Introduction to Haskell\nHaskell is a statically typed, purely functional programming language with type inference and lazy evaluation.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879030',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-01 17:17:44',
    '2024-12-26 18:26:16'
);

-- Topic 20
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879031'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879031'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879031';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879031',
    'dart',
    'Dart',
    '## Dart Programming\nThis topic covers the Dart programming language.',
    '2024-12-02 17:17:44',
    '2024-12-21 18:26:16'
);

INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873030',
    'dart-introduction',
    'Introduction to Dart',
    '# Introduction to Dart\nDart is a client-optimized language for fast apps on any platform.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879031',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-01 14:17:44',
    '2024-12-20 18:26:16'
);

-- Topic 21
DELETE
    FROM "mddapi"."comments"
    WHERE "mddapi"."comments"."post_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."posts"
        WHERE "mddapi"."posts"."topic_uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879032'
    );
DELETE
    FROM "mddapi"."posts"
    WHERE "mddapi"."posts"."topic_uuid" IN (
        SELECT "uuid"
        FROM "mddapi"."topics"
        WHERE "mddapi"."topics"."uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879032'
    );
DELETE FROM "mddapi"."topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879032';
INSERT INTO "mddapi"."topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879032',
    'r',
    'R',
    '## R Programming\nThis topic covers the R programming language.',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

-- Post for Topic 1
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873036',
    'html-advanced',
    'Advanced HTML',
    '# Advanced HTML\nThis post covers advanced topics in HTML.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879012',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

-- Post for Topic 2
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873037',
    'css-advanced',
    'Advanced CSS',
    '# Advanced CSS\nThis post covers advanced topics in CSS.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879013',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

-- Post for Topic 3
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873038',
    'javascript-advanced',
    'Advanced JavaScript',
    '# Advanced JavaScript\nThis post covers advanced topics in JavaScript.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879014',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

-- Post for Topic 4
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873039',
    'typescript-advanced',
    'Advanced TypeScript',
    '# Advanced TypeScript\nThis post covers advanced topics in TypeScript.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879015',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-14 17:17:44',
    '2024-12-14 18:26:16'
);

-- Post for Topic 5
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873040',
    'angular-advanced',
    'Advanced Angular',
    '# Advanced Angular\nThis post covers advanced topics in Angular.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879016',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-10-03 17:17:44',
    '2024-10-26 18:26:16'
);

-- Post for Topic 6
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873041',
    'vuejs-advanced',
    'Advanced Vue.js',
    '# Advanced Vue.js\nThis post covers advanced topics in Vue.js.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879017',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-11-01 17:17:44',
    '2024-12-26 18:26:16'
);

-- Post for Topic 7
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873042',
    'flutter-advanced',
    'Advanced Flutter',
    '# Advanced Flutter\nThis post covers advanced topics in Flutter.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879018',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-03 17:17:44',
    '2024-12-26 18:26:16'
);

-- Post for Topic 8
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873043',
    'swift-advanced',
    'Advanced Swift',
    '# Advanced Swift\nThis post covers advanced topics in Swift.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879019',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-02 17:17:44',
    '2024-12-26 18:26:16'
);

-- Post for Topic 9
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873044',
    'kotlin-advanced',
    'Advanced Kotlin',
    '# Advanced Kotlin\nThis post covers advanced topics in Kotlin.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879020',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-04 17:17:44',
    '2024-12-26 18:26:16'
);

-- Post for Topic 10
INSERT INTO "mddapi"."posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
VALUES (
    '6b8c767f-aa9f-48d3-b6c4-03e1f6873045',
    'ruby-advanced',
    'Advanced Ruby',
    '# Advanced Ruby\nThis post covers advanced topics in Ruby.',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879021',
    '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
    '2024-12-01 17:17:44',
    '2024-12-26 18:26:16'
);