-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 02 nov. 2020 à 08:19
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user` (`user_id`),
  KEY `topic_id` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `message`, `date`) VALUES
(9, 13, 70, 'Heyyy !! ça fait plaisir de pouvoir partager avec ses collègues !', '2020-10-19 14:18:21'),
(10, 12, 69, 'Superbe travail ! ', '2020-10-19 14:19:06'),
(20, 12, 70, 'Merci à vous pour le travail effectué ! Génial cette appli !', '2020-10-30 02:04:26');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `titre` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `titre`, `content`, `imageUrl`, `date`) VALUES
(12, 68, 'Bienvenue sur Groupomania', 'Salut à tous ! Bienvenue sur le premier réseau social d\'entreprise de Groupomania. Cette appli est conçu pour que vous puissiez partager avec vos collègues et favoriser également la cohésion de notre grand groupe !', '', '2020-10-19 14:11:07'),
(13, 69, 'Félicitations !', 'Bravo à notre admin pour cette application bien sympathique !', '', '2020-10-19 14:14:01'),
(15, 68, ' Mise à jour ! ', 'Petite mise à jour pour faire un essai sur la récupération d\'éléments', '', '2020-10-22 09:09:27'),
(36, 70, 'Ajout des commentaires ', 'J\'apprécie beaucoup les petits onglets commentaires ! les couleurs sont sympathique et le fait de pouvoir voir le nombre de commentaires et un + ! Bravo !', '', '2020-10-30 02:01:16');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(30) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `isAdmin` enum('ADMIN','USER') DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `nom`, `prenom`, `isAdmin`, `createAt`) VALUES
(68, 'admin@test.com', '$2b$10$XsuYzGVqJc.0x/dad8dlB.0BjrSXS/0Us9wUWmKG0bAyXhxjeu5re', 'Seykath', 'Chapalain', 'Tony', 'ADMIN', '2020-10-19 14:07:12'),
(69, 'test01@test.com', '$2b$10$EUCNcZ5wsFq7DzPtRPz/IOyl/veW8uNKvJ00RCX8ZOUTN67CMcsMe', 'Ludo', 'Train', 'Ludovic', 'USER', '2020-10-19 14:11:44'),
(70, 'test02@test.com', '$2b$10$f4ccNK/1ejKd/G0yy3gJvuysK/o3AK6Je078jyia1/axXhTHaLB16', 'Kiki', 'Chollet', 'Romain', 'USER', '2020-10-19 14:12:09');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
