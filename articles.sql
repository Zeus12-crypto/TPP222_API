-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 23 mars 2026 à 21:19
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `blog_s`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `contenu` text NOT NULL,
  `auteur` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `categorie` varchar(100) NOT NULL,
  `tags` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id`, `titre`, `contenu`, `auteur`, `date`, `categorie`, `tags`) VALUES
(1, 'Les Bases de Node.js', 'Node.js est un environnement d’exécution JavaScript construit sur le moteur V8 de Chrome ', 'Alice', '2026-03-23', 'Développement', 'Node, Backend, js'),
(2, 'Introduction aux bases de données', 'Apprendre à structurer ses données avec MySQL et MariaBD pour une application robuste', 'Charles', '2026-03-03', 'Base de données', 'sql, mysql, xampp'),
(3, 'Sécuriser son API Rest ', 'Guide pratique pour l\'utilisation des tokens JWT et de la validation des entrées utilisateurs', 'Norglad', '2026-03-03', 'Sécurité', 'api, security, jwt'),
(4, 'Le futur du Cloud Computing', 'Analyse des tendances 2026 sur l\'hébergement serveur et les architectures micro-services', 'Landry', '2026-03-02', 'Technologie', 'cloud, server, future');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
