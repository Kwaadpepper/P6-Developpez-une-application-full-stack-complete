# MDD API

## Description

MDD Backend API est une application Spring Boot pour gérer les commentaires sur les publications. Ce projet utilise des technologies telles que Spring Boot, JPA, JWT pour l'authentification, et PostgreSQL pour la base de données.

## Prérequis

- Java 21
- Maven
- PostgreSQL

## Installation

1. Clonez le dépôt :

    ```sh
    git clone <https://github.com/Kwaadpepper/P6-Developpez-une-application-full-stack-complete>
    cd P6-Developpez-une-application-full-stack-complete/back
    ```

2. Configurez les variables d'environnement :

    Copiez le fichier [`.env.example`](.env.example) en [`.env`](.env) et modifiez les valeurs selon vos besoins.

    ```sh
    cp .env.example .env
    ```

3. Installez les dépendances Maven :

    ```sh
    mvn clean install
    ```

## Configuration

1. Configurez la base de données PostgreSQL :

    Créez une base de données PostgreSQL et mettez à jour les informations de connexion dans le fichier [`.env`](.env).

    Notez que les schemas et structures de base de données seront aumatiquement crées au lancement de l'application et fonction de la variable d'environnement `APP_DB_MIGRATE_ON_START`.

    De plus si vous lancez l'application en development vous aurez des données initiales.

    ```properties
    APP_DB_URL=jdbc:postgresql://localhost:5432/votre_base_de_donnees
    APP_DB_USER=votre_utilisateur
    APP_DB_PWD=votre_mot_de_passe
    ```

2. Configurez les propriétés JWT dans le fichier [`.env`](.env) :

    ```properties
    # JWT SecretKey 256 chars (Ex: https://jwtsecret.com/generate - DONT USE THIS SITE TO GENERATE PROD KEY)
    APP_JWT_SECRET=cadae3e6f88ff813580349e773c72ca7191a210e0b6f07b9975880008fc8301819d820a286557314d45f5858f7de971bd279d57b663ecfd875a9a7c2a30923b9866b9ee3372ec1bb7cff463f5b73ac3f8b17185aef7a6be0196362abae557f6b6567b0433bd49e3cecdb460eb5a58f468984341c9f94b0569ef7ab6d464063cd655f57dc53888e8018014637ab21095e359028b8471d7b76b19eaf30a13c736e4cd5657cf1e53a3d0747488add3fc27cb3ae68247979f7c41ec2cfce756bbf0c68a16fec6a61a204bdf604715a74abf39bd069c6a0149260c779006b52591218f17a282f612fee69f73047f59e7ab8cabc9f65a994e24b1a88c64a01db45d773
    ## JWT Cookie name
    APP_JWT_COOKIE_NAME=mdd-cookie
    # JWT token expiration in minutes
    APP_JWT_EXP=2
    # JWT refresh token expiration in minutes (4h)
    APP_JWT_REFRESH_EXP=240
    ```

3. Configurer les variables du serveur

    ```properties
    APP_NAME=MDD
    SERVER_PORT=3001
    # Url de l'application Angular
    FRONT_END_URL=http://localhost:4200
    ```

## Exécution de l'application

Pour exécuter l'application, utilisez la commande suivante :

```sh
mvn spring-boot:run
```

L'application sera disponible à l'adresse [`http://localhost:3001`](src/main/java/com/openclassrooms/mddapi/controller/CommentController.java).

## Développement

Pour commencer à développer, ouvrez le projet dans votre IDE préféré (par exemple, Visual Studio Code).

### Structure du projet

- [`src/main/java/com/openclassrooms/mddapi`](src/main/java/com/openclassrooms/mddapi) : Contient le code source principal de l'application.
- [`src/test/java/com/openclassrooms/mddapi`](src/test/java/com/openclassrooms/mddapi) : Contient les tests unitaires.
- [`resources`](resources) : Contient un collection d'appels API pour `Bruno` <https://www.usebruno.com/> .

### Exécution des tests

Pour exécuter les tests, utilisez la commande suivante :

```sh
mvn test
```

### Compilation du projet

Pour compiler le projet, utilisez la commande suivante :

```sh
mvn clean package
```

Le fichier JAR généré sera disponible dans le répertoire [`target`](target).
