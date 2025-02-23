# MDD Frontend

Ce projet est une application Angular.
Pour fonctionner il necessite que l'application backend soit disponible à l'url décrite par la variable d'envirronement `APP_BACKEND_URL`.

## Installation

Pour installer l'application, suivez les étapes suivantes :

1. Clonez le dépôt :

    ```sh
    git clone https://github.com/Kwaadpepper/P6-Developpez-une-application-full-stack-complete
    cd P6-Developpez-une-application-full-stack-complete/front
    ```

2. Installez les dépendances :

    ```sh
    npm install
    ```

## Build

Pour construire l'application, exécutez la commande suivante :

  ```sh
  npm run build
  ```

Cela créera un répertoire `dist` contenant la version de production de l'application.

## Développement

Pour développer l'application, suivez les étapes suivantes :

- Démarrez le serveur de développement : `npm run dev`
- Ouvrez votre navigateur et accédez à <http://localhost:4200>. L'application se rechargera automatiquement si vous modifiez les fichiers sources.

## Variables d'environnement

Pour configurer les variables d'environnement, suivez les étapes suivantes :

Créez un fichier `.env` dans le répertoire racine du projet.

Copiez le contenu de `.env.example` dans `.env` :

- Mettez à jour les valeurs dans le fichier .env selon vos besoins.
- Assurez-vous de redémarrer le serveur de développement après avoir modifié le fichier .env.
