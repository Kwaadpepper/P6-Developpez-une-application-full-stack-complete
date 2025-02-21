-- USERS
DELETE
    FROM "credentials" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879062';
DELETE
    FROM "users" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879061';
INSERT
    INTO "users" ("uuid", "name", "email", "created_at", "updated_at")
    VALUES (
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
        'John Doe',
        'johndoe@example.net',
        '2024-12-03 17:17:44',
        '2024-12-26 18:26:16'
    );


INSERT
    INTO "credentials" ("uuid", "password", "api_token", "user_uuid", "created_at", "updated_at")
    VALUES (
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879062',
        '$argon2id$v=19$m=16384,t=2,p=1$tH0i+nnt6bhiSPf+bqfAog$7nmDmTGrSnMxxSZf/CK2xjTm8epWC+u3T3ao0b/lu9A',
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879010',
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
        '2024-12-03 17:17:44',
        '2024-12-26 18:26:16'
    );

-- POSTS

DELETE
    FROM "topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879000';
INSERT
    INTO "topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
    VALUES (
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879000',
        'databases',
        'Databases',
        '# Arma natus remane avellere suppressa quamquam

## Genus dedit praelatum Veneris movet membra querno

Lorem markdownum sceleratior accedat sitis non videri aetas, nivosos expers.
Tamen sed blanditias mille et capiti fraterno nymphae rustica, cum. Parat enim,
vix nihil auras gnatae praeside, latent decorata.

Nulla inanis nobilis: fecit: iraque bene forent *illam*, unda et Nostra [inquit
viscera](http://www.leonumvulnere.org/). Totidem vertere, ipsa vocavit omnique
culmen.',
        '2024-12-03 17:17:44',
        '2024-12-26 18:26:16'
    );

DELETE
    FROM "topics" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6879001';
INSERT
    INTO "topics" ("uuid", "slug", "name", "description", "created_at", "updated_at")
    VALUES (
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879001',
        'angular',
        'Angular',
        '# Arma natus remane avellere suppressa quamquam

## Genus dedit praelatum Veneris movet membra querno

Lorem markdownum sceleratior accedat sitis non videri aetas, nivosos expers.
Tamen sed blanditias mille et capiti fraterno nymphae rustica, cum. Parat enim,
vix nihil auras gnatae praeside, latent decorata.

Nulla inanis nobilis: fecit: iraque bene forent *illam*, unda et Nostra [inquit
viscera](http://www.leonumvulnere.org/). Totidem vertere, ipsa vocavit omnique
culmen.',
        '2024-12-03 17:17:44',
        '2024-12-26 18:26:16'
    );

DELETE
    FROM "posts" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6872002';
INSERT
    INTO "posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
    VALUES (
        '6b8c767f-aa9f-48d3-b6c4-03e1f6872002',
        'angular',
        'Angular',
        '# Arma natus remane avellere suppressa quamquam

## Genus dedit praelatum Veneris movet membra querno

Lorem markdownum sceleratior accedat sitis non videri aetas, nivosos expers.
Tamen sed blanditias mille et capiti fraterno nymphae rustica, cum. Parat enim,
vix nihil auras gnatae praeside, latent decorata.

Nulla inanis nobilis: fecit: iraque bene forent *illam*, unda et Nostra [inquit
viscera](http://www.leonumvulnere.org/). Totidem vertere, ipsa vocavit omnique
culmen.

## Curalium de

Tibi Atrides illo loca, pro per, qui ille simul, induit nymphas, *illa mihi*;
minanti praesignis. Dotibus moribunda induco mollierant patitur qui vocem quos
licet studiumque causa, erat vult nescia lege aere mixta et Titania? Atque
vertice virides canescere facies, vocari erant, est data aulam, actis tendite
linguisque pugnant?

- Ei ultroque quamquam moles at quam totumque
- Esse cum Aethalion ante ego tuo
- Me multa talem vis lassus sine omni
- Murmure sceleratus deas
- Ore vultus
- Phoebeos vivit',
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879000',
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
        '2024-12-03 17:17:44',
        '2024-12-26 18:26:16'
    );

DELETE
    FROM "posts" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6872003';
INSERT
    INTO "posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
    VALUES (
        '6b8c767f-aa9f-48d3-b6c4-03e1f6872003',
        'maven',
        'Maven',
        '# Arma natus remane avellere suppressa quamquam

## Genus dedit praelatum Veneris movet membra querno

Lorem markdownum sceleratior accedat sitis non videri aetas, nivosos expers.
Tamen sed blanditias mille et capiti fraterno nymphae rustica, cum. Parat enim,
vix nihil auras gnatae praeside, latent decorata.

Nulla inanis nobilis: fecit: iraque bene forent *illam*, unda et Nostra [inquit
viscera](http://www.leonumvulnere.org/). Totidem vertere, ipsa vocavit omnique
culmen.

## Curalium de

Tibi Atrides illo loca, pro per, qui ille simul, induit nymphas, *illa mihi*;
minanti praesignis. Dotibus moribunda induco mollierant patitur qui vocem quos
licet studiumque causa, erat vult nescia lege aere mixta et Titania? Atque
vertice virides canescere facies, vocari erant, est data aulam, actis tendite
linguisque pugnant?

- Ei ultroque quamquam moles at quam totumque
- Esse cum Aethalion ante ego tuo
- Me multa talem vis lassus sine omni
- Murmure sceleratus deas
- Ore vultus
- Phoebeos vivit',
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879001',
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
        '2024-12-03 17:17:44',
        '2024-12-26 18:26:16'
    );

DELETE
    FROM "posts" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6872004';
INSERT
    INTO "posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
    VALUES (
        '6b8c767f-aa9f-48d3-b6c4-03e1f6872004',
        'spring-boot',
        'Spring Boot',
        '# Arma natus remane avellere suppressa quamquam

## Genus dedit praelatum Veneris movet membra querno

Lorem markdownum sceleratior accedat sitis non videri aetas, nivosos expers.
Tamen sed blanditias mille et capiti fraterno nymphae rustica, cum. Parat enim,
vix nihil auras gnatae praeside, latent decorata.

Nulla inanis nobilis: fecit: iraque bene forent *illam*, unda et Nostra [inquit
viscera](http://www.leonumvulnere.org/). Totidem vertere, ipsa vocavit omnique
culmen.

## Curalium de

Tibi Atrides illo loca, pro per, qui ille simul, induit nymphas, *illa mihi*;
minanti praesignis. Dotibus moribunda induco mollierant patitur qui vocem quos
licet studiumque causa, erat vult nescia lege aere mixta et Titania? Atque
vertice virides canescere facies, vocari erant, est data aulam, actis tendite
linguisque pugnant?

- Ei ultroque quamquam moles at quam totumque
- Esse cum Aethalion ante ego tuo
- Me multa talem vis lassus sine omni
- Murmure sceleratus deas
- Ore vultus
- Phoebeos vivit',
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879001',
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
        '2024-12-03 17:17:44',
        '2024-12-26 18:26:16'
    );

DELETE
    FROM "posts" WHERE "uuid" = '6b8c767f-aa9f-48d3-b6c4-03e1f6872005';
INSERT
    INTO "posts" ("uuid", "slug", "title", "content", "topic_uuid", "author_uuid", "created_at", "updated_at")
    VALUES (
        '6b8c767f-aa9f-48d3-b6c4-03e1f6872005',
        'svelte-kit',
        'SvelteKit',
        '# Arma natus remane avellere suppressa quamquam

## Genus dedit praelatum Veneris movet membra querno

Lorem markdownum sceleratior accedat sitis non videri aetas, nivosos expers.
Tamen sed blanditias mille et capiti fraterno nymphae rustica, cum. Parat enim,
vix nihil auras gnatae praeside, latent decorata.

Nulla inanis nobilis: fecit: iraque bene forent *illam*, unda et Nostra [inquit
viscera](http://www.leonumvulnere.org/). Totidem vertere, ipsa vocavit omnique
culmen.

## Curalium de

Tibi Atrides illo loca, pro per, qui ille simul, induit nymphas, *illa mihi*;
minanti praesignis. Dotibus moribunda induco mollierant patitur qui vocem quos
licet studiumque causa, erat vult nescia lege aere mixta et Titania? Atque
vertice virides canescere facies, vocari erant, est data aulam, actis tendite
linguisque pugnant?

- Ei ultroque quamquam moles at quam totumque
- Esse cum Aethalion ante ego tuo
- Me multa talem vis lassus sine omni
- Murmure sceleratus deas
- Ore vultus
- Phoebeos vivit',
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879001',
        '6b8c767f-aa9f-48d3-b6c4-03e1f6879061',
        '2024-12-03 17:17:44',
        '2024-12-22 18:26:16'
    );