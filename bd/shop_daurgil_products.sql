-- MySQL dump 10.13  Distrib 5.7.15, for Linux (x86_64)
--
-- Host: localhost    Database: shop_daurgil
-- ------------------------------------------------------
-- Server version	5.7.15-0ubuntu0.16.04.1

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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `name` varchar(30) DEFAULT NULL,
  `ident` varchar(100) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `quantity` varchar(10) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `Rojo` tinyint(1) DEFAULT NULL,
  `Azul` tinyint(1) DEFAULT NULL,
  `Verde` tinyint(1) DEFAULT NULL,
  `Blanco` tinyint(1) DEFAULT NULL,
  `Negro` tinyint(1) DEFAULT NULL,
  `Otros` tinyint(1) DEFAULT NULL,
  `gender` varchar(50) NOT NULL,
  `country` varchar(45) DEFAULT NULL,
  `province` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `date_reception` varchar(100) DEFAULT NULL,
  `date_expiration` varchar(100) DEFAULT NULL,
  `img_icon` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ident`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('Sdvsd','21','Sdvsvd','32','321',1,0,0,0,0,0,'Man','Spain','Murcia','Olleria','12/10/2016','26/10/2016','media/default-avatar.png'),('Sdv','23','Sdvsv','2','3',1,0,0,0,0,0,'Man','France','Cvalenciana','Olleria','11/10/2016','25/10/2016','/var/www/html/php_mvc_products/media/2124478656-flowers.png'),('Afdbsa','32','Sfvsvf','32','32',1,1,0,0,0,0,'Man','Spain','Cvalenciana','Olleria','11/10/2016','25/10/2016','/var/www/html/php_mvc_products/media/589312004-1025640568-flowers.png'),('Avdfv','321','Fdvdb','2','3',1,1,0,0,0,0,'Man','Spain','Cvalenciana','Olleria','10/10/2016','31/10/2016','media/default-avatar.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-18 11:38:41
