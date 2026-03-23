const express = require('express');
const mysql = require('mysql2');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog_s'
});

db.connect(err => {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL !");
});

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0", // Version standard
        info: {
            title: "blog_s",
            description: "Gestion des articles du blog",
            version: "1.0.0"
        },
        servers: [{ url: "http://localhost:3000" }]
    },
    apis: [] // IMPORTANT : Laisse vide pour ne plus lire les commentaires qui font des erreurs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/articles:
 * post:
 * summary: "Créer un nouvel article"
 * parameters:
 * - in: "body"
 * name: "article"
 * schema:
 * type: "object"
 * properties:
 * titre: 
 * type: "string"
 * contenu: 
 * type: "string"
 * auteur: 
 * type: "string"
 * date: 
 * type: "string"
 * example: "2026-03-23"
 * categorie:
 * type: "string"
 * tags:
 * type: "string"
 * responses:
 * 201:
 * description: "Article créé avec succès"
 */
app.post('/api/articles', (req, res) => {
    const { titre, contenu, auteur, date, categorie, tags } = req.body;
    if (!titre || !auteur) return res.status(400).json({ error: "Titre et auteur obligatoires" });

    const sql = "INSERT INTO articles (titre, contenu, auteur, date, categorie, tags) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [titre, contenu, auteur, date, categorie, tags], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, message: "Article créé !" });
    });
});

/**
 * @swagger
 * /api/articles:
 * get:
 * summary: "Récupérer tous les articles (filtrables)""
 * parameters:
 * - name: "categorie"
 * in: "query"
 * - name: "auteur"
 * in: "query"
 * responses:
 * 200:
 * description: "Liste des articles"
 */
app.get('/api/articles', (req, res) => {
    const { categorie, auteur } = req.query;
    let sql = "SELECT * FROM articles WHERE 1=1";
    let params = [];

    if (categorie) { sql += " AND categorie = ?"; params.push(categorie); }
    if (auteur) { sql += " AND auteur = ?"; params.push(auteur); }

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

/**
 * @swagger
 * /api/articles/search:
 * get:
 * summary: "Rechercher un article par texte"
 * parameters:
 * - name: "query"
 * in: "query"
 * responses:
 * 200:
 * description: "Résultats de recherche"
 */
app.get('/api/articles/search', (req, res) => {
    const search = '%${req.query.query}%';
    const sql = "SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ?";
    db.query(sql, [search, search], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

/**
 * @swagger
 * /api/articles/{id}:
 * get:
 * summary: "Lire un article unique par ID"
 * put:
 * summary: "Modifier un article existant"
 * delete:
 * summary: "Supprimer un article"
 */
app.get('/api/articles/:id', (req, res) => {
    db.query("SELECT * FROM articles WHERE id = ?", [req.params.id], (err, result) => {
        if (result.length === 0) return res.status(404).json({ message: "Introuvable" });
        res.json(result[0]);
    });
});

app.put('/api/articles/:id', (req, res) => {
    const { titre, contenu, categorie, tags } = req.body;
    const sql = "UPDATE articles SET titre=?, contenu=?, categorie=?, tags=? WHERE id=?";

db.query(sql, [titre, contenu, categorie, tags, req.params.id], (err, result) => {
        if (result.affectedRows === 0) return res.status(404).json({ message: "Article inexistant" });
        res.json({ message: "Article mis à jour !" });
    });
});

app.delete('/api/articles/:id', (req, res) => {
    db.query("DELETE FROM articles WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Article non trouvé" });
        }
        res.json({ message: "Article supprimé !" });
    }); 
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Serveur lancé sur http://localhost:${PORT}');
    console.log('Documentation Swagger sur http://localhost:${PORT}/api-docs');
});