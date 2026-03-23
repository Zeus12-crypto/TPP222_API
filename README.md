# 📝 API Backend - Blog Simple (blob_s)

Ce projet est une API REST développée avec Node.js et Express, permettant la gestion complète d'articles de blog. Les données sont stockées dans une base de données MySQL (via XAMPP) et l'API est documentée avec Swagger.
Serveur lancé sur http://localhost:${PORT}

## 🚀 Fonctionnalités

* Gestion des articles (CRUD) : Créer, Lire, Modifier, Supprimer.
* Filtres avancés : Récupérer les articles par catégorie ou par auteur.
* Recherche textuelle : Rechercher des mots-clés dans le titre ou le contenu.
* Documentation interactive : Interface Swagger UI pour tester les points d'entrée.

---

## 🛠️ Installation et Configuration

### 1. Prérequis
* Node.js installé sur votre machine.
* XAMPP (pour MySQL).

### 2. Configuration de la Base de Données
1. Démarrez les modules Apache et MySQL dans le panneau de contrôle XAMPP.
2. Allez sur http://localhost/phpmyadmin.
3. Créez une base de données nommée blog_db ou alors utiliser celle fourni dans mon dossier.
4. Importez ou exécutez le script SQL suivant :
   `sql
   CREATE TABLE articles (
       id INT AUTO_INCREMENT PRIMARY KEY,
       titre VARCHAR(255) NOT NULL,
       contenu TEXT NOT NULL,
       auteur VARCHAR(100) NOT NULL,
       date DATE NOT NULL,
       categorie VARCHAR(100),
       tags VARCHAR(255)
   );


## 🛠️ Installation
1. Base de données : Créer blog_db dans phpMyAdmin.
2. Installation : Lancer npm install dans le terminal.
3. Lancement : Lancer node app.js.

## 📑 Endpoints principaux
- POST /api/articles : Créer un article.
- GET /api/articles : Voir tous les articles.
- GET /api/articles/search?query=... : Rechercher un article.
- PUT /api/articles/:id : Modifier un article.
- DELETE /api/articles/:id : Supprimer un article.

## 📖 Documentation Swagger
Disponible sur : http://localhost:${PORT}/api-docs