# Luuxcraft-Utils
## Un bot fait pour le discord de LuuxCraft

### Fonctionnalités
* Messages épinglés en bas du salon
* Plus à venir

### Installation
1. Générez un token sur le [portail dévelopeurs de Discord](https://discord.dev)
2. Clonez le repo
3. Copiez le fichier `.env.example` vers `.env`
4. Collez le token dans le fichier `.env`
5. Modifiez le fichier `src/constants.ts` avec les options nécéssaires
6. Invitez le bot
7. Installez les dépendances (`pnpm install`), puis générez le code JS (`pnpm build`)
8. Migrez la base de données (`pnpm db:migrate`)
9. Lancez le bot avec `pnpm start`

### Conditions d'utilisation
Le bot est opensource, sous licence AGPL 3.0, ce qui signifie que:
* toute personne ayant accès au bot doit pouvoir accéder à son code source
* si vous faites un fork du projet, vos modifications doivent être publiées sous une licence compatible avec AGPL 3.0
