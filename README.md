# Projet Quokka users

## Accès

- **Frontend** : [http://localhost:5173](http://localhost:5173)
- **Backend (API)** : [http://localhost:3000](http://localhost:3000)
- **Swagger (documentation API)** : [http://localhost:3000/docs](http://localhost:3000/docs)

## Identifiants par défaut

- **Email** : `admin@example.com`
- **Mot de passe** : `quokka`

> Pour utiliser les routes protégées de la section `users` dans Swagger, vous devez d'abord vous authentifier via l’endpoint `/auth/login`. Un cookie de session sera alors automatiquement généré, ce qui vous permettra d’accéder aux routes sécurisées sans avoir à renseigner manuellement le token.

---

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/TheoSigaud/quokka.git
   cd quokka
   ```

2. Lancez les conteneurs Docker :
   ```bash
   docker compose up --build
   ```
