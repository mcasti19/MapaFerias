/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.6.23-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: feria
-- ------------------------------------------------------
-- Server version	10.6.23-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attention`
--

DROP TABLE IF EXISTS `attention`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `attention` (
  `id_attention` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `clap` varchar(50) NOT NULL,
  `family` varchar(50) NOT NULL,
  `proteicos` varchar(50) NOT NULL,
  PRIMARY KEY (`id_attention`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attention`
--

LOCK TABLES `attention` WRITE;
/*!40000 ALTER TABLE `attention` DISABLE KEYS */;
/*!40000 ALTER TABLE `attention` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `circuit_or_communes`
--

DROP TABLE IF EXISTS `circuit_or_communes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `circuit_or_communes` (
  `id_circuit` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `circuit` varchar(200) NOT NULL,
  PRIMARY KEY (`id_circuit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `circuit_or_communes`
--

LOCK TABLES `circuit_or_communes` WRITE;
/*!40000 ALTER TABLE `circuit_or_communes` DISABLE KEYS */;
/*!40000 ALTER TABLE `circuit_or_communes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000001_create_cache_table',1),(2,'0001_01_01_000002_create_jobs_table',1),(3,'2026_03_02_142004_01_create_states_table',1),(4,'2026_03_02_142123_02_create_municipality_table',1),(5,'2026_03_02_142240_03_create_parish_table',1),(6,'2026_03_02_142418_04_create_rols_table',1),(7,'2026_03_02_142500_05_create_permision_table',1),(8,'2026_03_02_142545_06_create_rols_permision_table',1),(9,'2026_03_02_142628_07_create_attention_table',1),(10,'2026_03_02_142712_08_create_circuit_or_communes_table',1),(11,'2026_03_02_142822_09_create_users_table',1),(12,'2026_03_02_150308_10_create_item_table_',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `municipality`
--

DROP TABLE IF EXISTS `municipality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `municipality` (
  `id_municipality` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `municipality` varchar(100) NOT NULL,
  `id_states` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_municipality`),
  KEY `municipality_id_states_foreign` (`id_states`),
  CONSTRAINT `municipality_id_states_foreign` FOREIGN KEY (`id_states`) REFERENCES `states` (`id_states`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `municipality`
--

LOCK TABLES `municipality` WRITE;
/*!40000 ALTER TABLE `municipality` DISABLE KEYS */;
INSERT INTO `municipality` VALUES (1,'ATURES',1),(2,'ALTO ORINOCO',1),(3,'SIMON RODRIGUEZ',2),(4,'MC GREGOR',2),(5,'SIMON BOLIVAR',2),(6,'SOTILLO',2),(7,'SOTILLO',2),(8,'SAN CASIMIRO',4),(9,'BARINAS',5),(10,'ALBERTO ARVELO TORREALBA',5),(11,'DIEGO IBARRA',7),(12,'LIBERTADOR',7),(13,'EZEQUIEL ZAMORA',8),(14,'',8),(15,'',8),(16,'',8),(17,'',8),(18,'JOSE TADEO MONAGAS',13),(19,'JOSE TADEO MONAGAS',13),(20,'JOSE TADEO MONAGAS',13),(21,'FRANCISCO DE MIRANDA',13),(22,'FRANCISCO DE MIRANDA',13),(23,'JOSE TADEO MONAGAS',13),(24,'JOSE TADEO MONAGAS',13),(25,'JOSE TADEO MONAGAS',13),(26,'FRANCISCO DE MIRANDA',13),(27,'FRANCISCO DE MIRANDA',13),(28,'VARGAS',23),(29,'VARGAS',23),(30,'VARGAS',23),(31,'VARGAS',23),(32,'VARGAS',23),(33,'IRIBARREN',14),(34,'IRIBARREN',14),(35,'IRIBARREN',14),(36,'IRIBARREN',14),(37,'IRIBARREN',14),(38,'IRIBARREN',14),(39,'IRIBARREN',14),(40,'ALBERTO ADRIANI',15),(41,'ALBERTO ADRIANI',15),(42,'ANDRES BELLO',15),(43,'ZEA',15),(44,'LIBERTADOR',15),(45,'SUCRE',16),(46,'SUCRE',16),(47,'SUCRE',16),(48,'INDEPENDENCIA ',16),(49,'TOMAS LANDER ',16),(50,'ACEVEDO',16),(51,'SIMON BOLIVAR ',16),(52,'ZAMORA ',16),(53,'ACEVEDO ',16),(54,'MARIÑO',18),(55,'MARIÑO',18),(56,'MARIÑO',18),(57,'MARIÑO',18),(58,'MARIÑO',18),(59,'SANTA ROSALIA',19),(60,'GUANARITO',19),(61,'GUANARITO',19),(62,'PAEZ',19),(63,'CAPACHO NUEVO ',21),(64,'SUCRE ',21),(65,'SAN CRISTOBAL ',21),(66,'FRANCISCO DE MIRANDA ',21),(67,'ESCUQUE',22),(68,'ESCUQUE',22),(69,'ESCUQUE',22),(70,'MIRANDA',22),(71,'MIRANDA',22),(72,'MIRANDA',22),(73,'MIRANDA',22),(74,'SUCRE',22),(75,'SUCRE',22),(76,'VALERA',22),(77,'VALERA',22),(78,'MANUEL MONGE',24),(79,'LA TRINIDAD',24),(80,'MARACAIBO',25),(81,'JESUS ENRIQUE LOSSADA',25),(82,'LIBERTADOR',10),(83,'LIBERTADOR',10),(84,'LIBERTADOR',10),(85,'LIBERTADOR',10),(86,'LIBERTADOR',10),(87,'LIBERTADOR',10),(88,'LIBERTADOR',10),(89,'LIBERTADOR',10);
/*!40000 ALTER TABLE `municipality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parish`
--

DROP TABLE IF EXISTS `parish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `parish` (
  `id_parish` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parish` varchar(100) NOT NULL,
  `id_municipality` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_parish`),
  KEY `parish_id_municipality_foreign` (`id_municipality`),
  CONSTRAINT `parish_id_municipality_foreign` FOREIGN KEY (`id_municipality`) REFERENCES `municipality` (`id_municipality`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parish`
--

LOCK TABLES `parish` WRITE;
/*!40000 ALTER TABLE `parish` DISABLE KEYS */;
INSERT INTO `parish` VALUES (1,'LUIS ALBERTO GOMEZ',1),(2,'MARAWAKA',2),(3,'EDMUNDO BARRIOS',3),(4,'EL CHAPARRO',4),(5,'SAN CRISTOBAL',5),(6,'PUERTO LA CRUZ',6),(7,'POZUELO',6),(8,'SAN CASIMIRO',8),(9,'CORAZON DE JESUS',9),(10,'SABANETA',10),(11,'URBANA MARIARA',11),(12,'URBANA TOCUYITO',12),(13,'SAN CARLOS DE AUSTRIA',13),(14,'LUIS ALBERTO GOMEZ',1),(15,'MARAWAKA',2),(16,'EDMUNDO BARRIOS',3),(17,'EL CHAPARRO',4),(18,'SAN CRISTOBAL',5),(19,'PUERTO LA CRUZ',6),(20,'POZUELO',6),(21,'SAN CASIMIRO',8),(22,'CORAZON DE JESUS',9),(23,'SABANETA',10),(24,'URBANA MARIARA',11),(25,'URBANA TOCUYITO',12),(26,'SAN CARLOS DE AUSTRIA',13),(27,'LEZAMA',18),(28,'LEZAMA',18),(29,'LEZAMA',18),(30,'CAPITAL CALABOZO',26),(31,'CAPITAL CALABOZO',26),(32,'LEZAMA',18),(33,'LEZAMA',18),(34,'LEZAMA',18),(35,'CAPITAL CALABOZO',26),(36,'CAPITAL CALABOZO',26),(37,'URIMARE',28),(38,'URIMARE',28),(39,'URIMARE',28),(40,'CATIA LA MAR',28),(41,'CARAYACA',28),(42,'ANA SOTO',33),(43,'ANA SOTO',33),(44,'ANA SOTO',33),(45,'CONCEPCION',33),(46,'EL CUJI',33),(47,'ANA SOTO',33),(48,'SANTA ROSA',33),(49,'PRESIDENTE BETANCOURT',40),(50,'GABRIEL PICON ',40),(51,'LA AZULITA',42),(52,'ZEA',43),(53,'JACINTO PLAZA',44),(54,'LA DOLORITA',46),(55,'LA DOLORITA',46),(56,'MARICHES ',46),(57,'SANTA TERESA',48),(58,'OCUMARE DEL TUY ',49),(59,'MARIZAPA',50),(60,'SAN FRANCISCO',51),(61,'GUATIRE',52),(62,'MARIZAPA',53),(63,'PORLAMAR',54),(64,'PORLAMAR',54),(65,'PORLAMAR',54),(66,'PORLAMAR',54),(67,'PORLAMAR',54),(68,'EL PLAYON',59),(69,'CAPITAL GUANARITO',61),(70,'CAPITAL GUANARITO',61),(71,'PAYARA',62),(72,'INDEPENDENCIA ',63),(73,'SUCRE ',64),(74,'LA CONCORDIA ',65),(75,'FRANCISCO DE MIRANDA',66),(76,'ESCUQUE',67),(77,'ESCUQUE',67),(78,'ESCUQUE',67),(79,'AGUA SANTA',70),(80,'AGUA SANTA',70),(81,'AGUA SANTA',70),(82,'AGUA SANTA',70),(83,'VALMORE RODRIGUEZ',74),(84,'VALMORE RODRIGUEZ',74),(85,'MERCEDES DIAZ',76),(86,'MERCEDES DIAZ',76),(87,'YUMARE',78),(88,'BORAURE',79),(89,'ANTONIO BORJAS ROMERO',80),(90,'SAN JOSE',81),(91,'SANTA ROSALIA ',82),(92,'SANTA ROSALIA ',82),(93,'San Bernardino ',82),(94,'ALTAGRACIA ',82),(95,'San Bernardino ',82),(96,'ALTAGRACIA ',82),(97,'ALTAGRACIA ',82),(98,'ALTAGRACIA',82);
/*!40000 ALTER TABLE `parish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permision`
--

DROP TABLE IF EXISTS `permision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `permision` (
  `id_permision` int(10) unsigned NOT NULL,
  `permision` int(11) NOT NULL,
  PRIMARY KEY (`id_permision`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permision`
--

LOCK TABLES `permision` WRITE;
/*!40000 ALTER TABLE `permision` DISABLE KEYS */;
/*!40000 ALTER TABLE `permision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols` (
  `id_rols` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rols` varchar(50) NOT NULL,
  PRIMARY KEY (`id_rols`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols_permision`
--

DROP TABLE IF EXISTS `rols_permision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols_permision` (
  `id_rolspermision` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_rols` int(10) unsigned NOT NULL,
  `id_permision` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_rolspermision`),
  KEY `rols_permision_id_rols_foreign` (`id_rols`),
  KEY `rols_permision_id_permision_foreign` (`id_permision`),
  CONSTRAINT `rols_permision_id_permision_foreign` FOREIGN KEY (`id_permision`) REFERENCES `permision` (`id_permision`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rols_permision_id_rols_foreign` FOREIGN KEY (`id_rols`) REFERENCES `rols` (`id_rols`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols_permision`
--

LOCK TABLES `rols_permision` WRITE;
/*!40000 ALTER TABLE `rols_permision` DISABLE KEYS */;
/*!40000 ALTER TABLE `rols_permision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubros_entrega`
--

DROP TABLE IF EXISTS `rubros_entrega`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubros_entrega` (
  `id_users` int(10) unsigned NOT NULL,
  `item` varchar(50) NOT NULL,
  `tons` varchar(50) NOT NULL,
  `fecha_entrega` timestamp NOT NULL DEFAULT current_timestamp(),
  KEY `rubros_entrega_id_users_foreign` (`id_users`),
  CONSTRAINT `rubros_entrega_id_users_foreign` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubros_entrega`
--

LOCK TABLES `rubros_entrega` WRITE;
/*!40000 ALTER TABLE `rubros_entrega` DISABLE KEYS */;
/*!40000 ALTER TABLE `rubros_entrega` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `id_states` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `states` varchar(100) NOT NULL,
  PRIMARY KEY (`id_states`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'Amazonas'),(2,'Anzoátegui'),(3,'Apure'),(4,'Aragua'),(5,'Barinas'),(6,'Bolívar'),(7,'Carabobo'),(8,'Cojedes'),(9,'Delta Amacuro'),(10,'Distrito Capital'),(12,'Falcón'),(13,'Guárico'),(14,'Lara'),(15,'Mérida'),(16,'Miranda'),(17,'Monagas'),(18,'Nueva Esparta'),(19,'Portuguesa'),(20,'Sucre'),(21,'Táchira'),(22,'Trujillo'),(23,'Vargas'),(24,'Yaracuy'),(25,'Zulia');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_users` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(50) NOT NULL,
  `cedula` varchar(10) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `id_rols` int(10) unsigned NOT NULL,
  `id_parish` int(10) unsigned NOT NULL,
  `id_attention` int(10) unsigned NOT NULL,
  `circuit` int(10) unsigned NOT NULL,
  `mission_base` varchar(150) NOT NULL,
  `clap` varchar(200) NOT NULL,
  `tons` varchar(50) NOT NULL,
  `compliance` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `observations` varchar(200) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_users`),
  UNIQUE KEY `users_username_unique` (`username`),
  KEY `users_id_rols_foreign` (`id_rols`),
  KEY `users_id_parish_foreign` (`id_parish`),
  KEY `users_id_attention_foreign` (`id_attention`),
  KEY `users_circuit_foreign` (`circuit`),
  CONSTRAINT `users_circuit_foreign` FOREIGN KEY (`circuit`) REFERENCES `circuit_or_communes` (`id_circuit`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_id_attention_foreign` FOREIGN KEY (`id_attention`) REFERENCES `attention` (`id_attention`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_id_parish_foreign` FOREIGN KEY (`id_parish`) REFERENCES `parish` (`id_parish`),
  CONSTRAINT `users_id_rols_foreign` FOREIGN KEY (`id_rols`) REFERENCES `rols` (`id_rols`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dump completed on 2026-03-02 12:15:09
