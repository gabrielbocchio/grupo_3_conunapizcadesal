-- MariaDB dump 10.19  Distrib 10.4.27-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: pizca_db
-- ------------------------------------------------------
-- Server version	10.4.27-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Picada'),(2,'Tarta'),(3,'Plato'),(4,'Pizza');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orders_users` (`userId`),
  CONSTRAINT `fk_orders_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderdetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orderdetail_order` (`orderId`),
  KEY `fk_orderdetail_products` (`productId`),
  CONSTRAINT `fk_orderdetail_order` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`),
  CONSTRAINT `fk_orderdetail_products` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetail`
--

LOCK TABLES `orderdetail` WRITE;
/*!40000 ALTER TABLE `orderdetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` int(11) NOT NULL,
  `imagen` blob NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_ibfk_1` (`categoryId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (24,'Una heladera','asddsarr',21354,'imagen-1682098584774.jpg',3,NULL),(25,'una cosa','asdasd',234,'imagen-1682157366976.jpg',2,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `avatars` blob DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'','gata','','$2a$10$XixjYsS1K/y8eYKUoyYuHesJZ3arF6cUpqZOWB3es1eqTT1P6RXe.','',NULL),(2,'','gata','tabita@gmail.com','$2a$10$NFzcC.GVP83.Uy2KBKnAreiCk4o0w.vc0nCAkXNfGt2Kh8U7a3Z7.','',NULL),(3,'luz','isabela','luz@gmail.com','$2a$10$BXMbsxuQXZH0.gqiuxxyPuw/0ccUZz6uGgg2tjmiMTYppsFFNpgWu','',NULL),(4,'biribiri','sarasa','biribiri@gmail.com','$2a$10$mPgbdcdyB89CYgvM32wyLed8TKg6GHnI.0ZG5twX0tHsVQD/B3iAy','',NULL),(5,'sarasa','biri','sarasita@gmail.com','$2a$10$ofAcO9peM9RBl7syOHhW.OMpAW7NTz3po4JITXB9U.GBSxkGcXQ36','',NULL),(6,'pinocho','pino','pinocho@gmail.com','$2a$10$3WlNmvAfSK7peWgSCMuWSObK6WBQv1.855/9ORy4Wax8fscGmfTWW','',NULL),(7,'juancito','perez','juancito@gmail.com','$2a$10$M5O4nHMdFM0wmj6Gv72zbecpwMdjlr5YFAgrSdCRfvVIfEnC31xuq','',NULL),(8,'silla','mesa','silla@gmail.com','$2a$10$uP1LQkaog9vOE0.9UyexGe5lAPD9VROjMGFQ5xKfguuVm1umc3Xli','avatars-1681482822461.jpg',NULL),(9,'Leandro','Miguel','leabocchio@gmail.com','$2a$10$M3F2Xc5ttiFmuxkJBuFnReGYlqdXkWKHGRPAh.TicbX0Rqj1Oinnu','avatars-1681557819384.jpg',NULL),(10,'nina','nina','nina@gmail.com','$2a$10$RLuA8K64Pu3rV8T3msXTpu9Y.25yUPVYvlKbjkp7W7JvXXyxa1xXK','avatars-1681666964332.png',NULL),(11,'gabriel','gabriel','gabriel@gmail.com','$2a$10$H6NZtS961NQXF.6H/9TNXOvPHRXnW4nBRmbm/PKuvhrdiA0SWTQhC','avatars-1681672074094.jpg',NULL),(12,'grano','grak','grano@gmail.com','$2a$10$fo3led4XDRJYaI1U5Ra7Ae/c76Nwx.YqtADpdLykq7I19WnYBiWry','avatars-1681673077886.jpg',NULL),(13,'cortina','cort','cortina@gmail.com','$2a$10$F4Ls1ksubsRRqGKGMNV4b.gFdnbVW5.ShySYJz1JoiuEKeuIgVJLe','avatars-1681683644731.jpg',NULL),(14,'rata','rata','rata@gmail.com','$2a$10$PS726lrLNjIjnuMrK1G.eOANP3saOuhkD4a/jqF.lkgBMyxdXEyV6','avatars-1681726514948.JPG',NULL),(15,'roma','roma','roma@gmail.com','$2a$10$5SmAzhKaYPKiGLVNK2D.wur2.0qV54V5M/a1iE8.as1iJxv3S17Ja','avatars-1681831654739.jpg',NULL),(16,'pad','pad','pad@a.com','$2a$10$rTZR08kfLEMz9Cz8p9ARVORKtb/jSJBHbnGb4MYaChlwe.izCZt.i','avatars-1682157077687.png',NULL),(17,'pepepe','pepepe','pepepe@a.com','$2a$10$3W2sFgluvWJRUEjnbrG6S.9VcS2Pfpw4X2AJfQmFhTA22fhGekaBS','avatars-1682179337726.png',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-25  3:26:57
