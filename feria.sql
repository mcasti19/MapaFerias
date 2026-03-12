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
) ENGINE=InnoDB AUTO_INCREMENT=2402 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `municipality`
--

LOCK TABLES `municipality` WRITE;
/*!40000 ALTER TABLE `municipality` DISABLE KEYS */;
INSERT INTO `municipality` VALUES (101,'LIBERTADOR',1),(201,'ALTO ORINOCO',2),(202,'ATABAPO',2),(203,'ATURES',2),(204,'AUTANA',2),(205,'MAROA',2),(206,'MANAPIARE',2),(207,'RIO NEGRO',2),(301,'ANACO',3),(302,'ARAGUA',3),(303,'FERNANDO DE PEÑALVER',3),(304,'FRANCISCO DE CARMEN CARVAJAL',3),(305,'FRANCISCO DE MIRANDA',3),(306,'GUANTA',3),(307,'INDEPENDENCIA',3),(308,'JUAN ANTONIO SOTILLO',3),(309,'SAN MANUEL CAJIGAL',3),(310,'JOSE GREGORIO MONAGAS',3),(311,'LIBERTAD',3),(312,'MANUEL EZEQUIEL BRUZUAL',3),(313,'PEDRO MARIA FREITES',3),(314,'PIRITU',3),(315,'SAN JOSE DE GUANIPA',3),(316,'SAN JUAN DE CAPISTRANO',3),(317,'SANTA ANA',3),(318,'SIMON BOLIVAR',3),(319,'SIMON RODRIGUEZ',3),(320,'SIR ARTUR MC GREGOR',3),(321,'TURISTICO DIEGO BAUTISTA URBAN',3),(401,'ACHAGUAS',4),(402,'BIRUACA',4),(403,'MUÑOZ',4),(404,'PAEZ',4),(405,'PEDRO CAMEJO',4),(406,'ROMULO GALLEGOS',4),(407,'SAN FERNANDO',4),(501,'BOLIVAR',5),(502,'CAMATAGUA',5),(503,'GIRARDOT',5),(504,'JOSE ANGEL LAMAS',5),(505,'JOSE FELIX RIVAS',5),(506,'JOSE RAFAEL REVENGA',5),(507,'LIBERTADOR',5),(508,'MARIO BRICEÑO IRAGORRY',5),(509,'SAN CASIMIRO',5),(510,'SAN SEBASTIAN',5),(511,'SANTIAGO MARIÑO',5),(512,'SANTOS MICHELENA',5),(513,'SUCRE',5),(514,'TOVAR',5),(515,'URDANETA',5),(516,'ZAMORA',5),(517,'FRANCISCO LINARES ALCANTARA',5),(518,'OCUMARE DE LA COSTA DE ORO',5),(601,'ALBERTO ARVELO TORREALBA',6),(602,'ANTONIO JOSE DE SUCRE',6),(603,'ARISMENDI',6),(604,'BARINAS',6),(605,'BOLIVAR',6),(606,'CRUZ PAREDES',6),(607,'ZAMORA',6),(608,'PEDRAZA',6),(609,'ROJAS',6),(610,'SOSA',6),(611,'ANDRES ELOY BLANCO',6),(701,'CARONI',7),(702,'CEDEÑO',7),(703,'EL CALLAO',7),(704,'GRAN SABANA',7),(705,'HERES',7),(706,'PIAR',7),(707,'RAUL LEON',7),(708,'ROSCIO',7),(709,'SIFONTES',7),(710,'SUCRE',7),(711,'PADRE PEDRO CHIEN',7),(801,'BEJUMA',8),(802,'CARLOS ARVELO',8),(803,'DIEGO IBARRA',8),(804,'GUACARA',8),(805,'JUAN JOSE MORA',8),(806,'LIBERTADOR',8),(807,'LOS GUAYOS',8),(808,'MIRANDA',8),(809,'MONTALBAN',8),(810,'NAGUANAGUA',8),(811,'PUERTO CABELLO',8),(812,'SAN DIEGO',8),(813,'SAN JOAQUIN',8),(814,'VALENCIA',8),(901,'ANZOATEGUI',9),(902,'FALCON',9),(903,'GIRARDOT',9),(904,'LIMA BLANCO',9),(905,'PAO DE SAN JUAN BAUTISTA',9),(906,'RICAUTE',9),(907,'ROMULO GALLEGOS',9),(908,'SAN CARLOS',9),(909,'TINACO',9),(1001,'ANTONIO DIAZ',10),(1002,'CASACOIMA',10),(1003,'PEDERNALES',10),(1004,'TUCUPITA',10),(1101,'ACOSTA',11),(1102,'BOLIVAR',11),(1103,'BUCHIVACOA',11),(1104,'CACIQUE MANAURE',11),(1105,'CARIRUBANA',11),(1106,'COLINA',11),(1107,'DABAJURO',11),(1108,'DEMOCRACIA',11),(1109,'FALCON',11),(1110,'FEDERACION',11),(1111,'JACURA',11),(1112,'LOS TAQUES',11),(1113,'MAUROA',11),(1114,'MIRANDA',11),(1115,'MONSEÑOR ITURRIZA',11),(1116,'PALMASOLA',11),(1117,'PETIT',11),(1118,'PIRITU',11),(1119,'SAN FRANCISCO',11),(1120,'SILVA',11),(1121,'SUCRE',11),(1122,'TOCOPERO',11),(1123,'UNION',11),(1124,'URUMACO',11),(1125,'ZAMORA',11),(1201,'CAMAGUAN',12),(1202,'CHAGUARAMAS',12),(1203,'EL SOCORRO',12),(1204,'SAN GERONIMO DE GUAYABAL',12),(1205,'LEONARDO INFANTE',12),(1206,'LAS MERCEDES',12),(1207,'JULIAN MELLADO',12),(1208,'FRANCISCO DE MIRANDA',12),(1209,'JOSE TADEO MONAGAS',12),(1210,'ORTIZ',12),(1211,'JOSE FELIX RIVAS',12),(1212,'SAN JOSE DE GUARIBE',12),(1213,'SANTA MARIA DE IPIRRE',12),(1214,'PEDRO ZARAZA',12),(1301,'ANDRES ELOY BLANCO',13),(1302,'CRESPO',13),(1303,'IRIBARREN',13),(1304,'JIMENEZ',13),(1305,'MORAN',13),(1306,'PALAVECINO',13),(1307,'SIMON PALMAS',13),(1308,'TORRES',13),(1309,'URDANETA',13),(1401,'ALBERTO ADRIANI',14),(1402,'ANDRES BELLO',14),(1403,'ANTONIO PINTO SALINAS',14),(1404,'ARICAGUA',14),(1405,'ARZOBISPO CHACON',14),(1406,'CAMPO ELIAS',14),(1407,'CARACIOLO PARRA OLMEDO',14),(1408,'CARDENAL QUINTERO',14),(1409,'GUARAQUE',14),(1410,'JULIO CESAR SALAS',14),(1411,'JUSTO BRICEÑO',14),(1412,'LIBERTADOR',14),(1413,'MIRANDA',14),(1414,'OBISPO RAMOS DE LORA',14),(1415,'PADRE NOGUERA',14),(1416,'PUEBLO LLANO',14),(1417,'RANGEL',14),(1418,'RIVAS DAVILA',14),(1419,'SANTOS MARQUINA',14),(1420,'SUCRE',14),(1421,'TOVAR',14),(1422,'TULIO FEBRES CORDERO',14),(1423,'ZEA',14),(1501,'ACEVEDO',15),(1502,'ANDRES BELLO',15),(1503,'BARUTA',15),(1504,'BRION',15),(1505,'BUROZ',15),(1506,'CHACAO',15),(1507,'CRISTOBAL ROJAS',15),(1508,'EL HATILLO',15),(1509,'GUAICAIPURO',15),(1510,'INDEPENDENCIA',15),(1511,'LANDER',15),(1512,'LOS SALIAS',15),(1513,'PAEZ',15),(1514,'PAZ CASTILLO',15),(1515,'PEDRO GUAL',15),(1516,'PLAZA',15),(1517,'SIMON BOLIVAR',15),(1518,'SUCRE',15),(1519,'URDANETA',15),(1520,'ZAMORA',15),(1521,'CARRIZAL',15),(1601,'ACOSTA',16),(1602,'AGUASAY',16),(1603,'BOLIVAR',16),(1604,'CARIPE',16),(1605,'CEDEÑO',16),(1606,'EZEQUIEL ZAMORA',16),(1607,'LIBERTADOR',16),(1608,'MATURIN',16),(1609,'PIAR',16),(1610,'PUNCERES',16),(1611,'SANTA BARBARA',16),(1612,'SOTILLO',16),(1613,'URACOA',16),(1701,'ANTOLIN DE CAMPO',17),(1702,'ARISMENDI',17),(1703,'DIAZ',17),(1704,'GARCIA',17),(1705,'GOMEZ',17),(1706,'MANEIRO',17),(1707,'MARCANO',17),(1708,'MARIÑO',17),(1709,'PENINSULA DE MACANAO',17),(1710,'TUBORES',17),(1711,'VILLALBA',17),(1801,'AGUA BLANCA',18),(1802,'ARAURE',18),(1803,'ESTELLER',18),(1804,'GUANARE',18),(1805,'GUANARITO',18),(1806,'MONSEÑOR JOSE DE VICENTE',18),(1807,'OSPINO',18),(1808,'PAEZ',18),(1809,'PAPELON',18),(1810,'SAN GENARO DE BOCONOITO',18),(1811,'SAN RAFAEL DE ONOTO',18),(1812,'SANTA ROSALIA',18),(1813,'SUCRE',18),(1814,'TUREN',18),(1901,'ANDRES ELOY BLANCO',19),(1902,'ANDRES MATA',19),(1903,'ARISMENDI',19),(1904,'BENITEZ',19),(1905,'BERMUDEZ',19),(1906,'BOLIVAR',19),(1907,'CAJIBAL',19),(1908,'CRUZ SALMERON ACOSTA',19),(1909,'LIBERTADOR',19),(1910,'MARIÑO',19),(1911,'MEJIA',19),(1912,'MONTES',19),(1913,'RIBERO',19),(1914,'SUCRE',19),(1915,'VALDEZ',19),(2001,'ANDRES BELLO',20),(2002,'ANTONIO ROMULO COSTA',20),(2003,'AYACUCHO',20),(2004,'BOLIVAR',20),(2005,'CARDENAS',20),(2006,'CORDOBA',20),(2007,'FERNANDO FEO',20),(2008,'FRANCISCO DE MIRANDA',20),(2009,'GARCIA DE HEVIA',20),(2010,'GUASIMOS',20),(2011,'INDEPEDENCIA',20),(2012,'JUAREGUI',20),(2013,'JOSE MARIA VARGAS',20),(2014,'JUNIN',20),(2015,'LIBERTAD',20),(2016,'LIBERTADOR',20),(2017,'LOBATERA',20),(2018,'MICHELENA',20),(2019,'PANAMERICANO',20),(2020,'PEDRO MARIA UREÑA',20),(2021,'RAFAEL URDANETA',20),(2022,'SAMUEL DARIO MALDONADO',20),(2023,'SAN CRISTOBAL',20),(2024,'SEBORUCO',20),(2025,'SIMON RODRIGUEZ',20),(2026,'SUCRE',20),(2027,'TORRES',20),(2028,'URIBANTE',20),(2029,'SAN JUDAS TADEO',20),(2101,'ANDRES BELLO',21),(2102,'BOCONO',21),(2103,'BOLIVAR',21),(2104,'CANDELARIA',21),(2105,'CARACHE',21),(2106,'ESCUQUE',21),(2107,'JOSE FELIPE MARQUEZ CAÑIZALES',21),(2108,'JUAN VICENTE CAMPO ELIAS',21),(2109,'LA CEIBA',21),(2110,'MIRANDA',21),(2111,'MONTE CARMELO',21),(2112,'MOTATAN',21),(2113,'PAMPAN',21),(2114,'PAMPANITO',21),(2115,'RAFAEL RANGEL',21),(2116,'SAN RAFAEL DE CARVAJAL',21),(2117,'SUCRE',21),(2118,'TRUJILLO',21),(2119,'URDANETA',21),(2120,'VALERA',21),(2201,'ARTIDES BASTIDAS',22),(2202,'BOLIVAR',22),(2203,'BRUZUAL',22),(2204,'COCOROTE',22),(2205,'INDEPENDENCIA',22),(2206,'JOSE ANTONIO PAEZ',22),(2207,'LA TRINIDAD',22),(2208,'MANUEL MONGE',22),(2209,'NIRGUA',22),(2210,'PEÑA',22),(2211,'SAN FELIPE',22),(2212,'SUCRE',22),(2213,'URACHE',22),(2214,'VEROES',22),(2301,'ALMIRANTE PADILLA',23),(2302,'BARALT',23),(2303,'CABIMAS',23),(2304,'CATATUMBO',23),(2305,'COLON',23),(2306,'FRANCISCO JAVIER PULGAR',23),(2307,'JESUS ENRIQUE LOSADA',23),(2308,'JESUS MARIA SEMPRUM',23),(2309,'LA CAÑADA DE URDANETA',23),(2310,'LAGUNILLAS',23),(2311,'MACHIQUES DE PERIJA',23),(2312,'MARA',23),(2313,'MARACAIBO',23),(2314,'MIRANDA',23),(2315,'PAEZ',23),(2316,'ROSARIO DE PERIJA',23),(2317,'SAN FRANCISCO',23),(2318,'SANTA RITA',23),(2319,'SIMON BOLIVAR',23),(2320,'SUCRE',23),(2321,'VALMORE RODRIGUEZ',23),(2401,'VARGAS',24);
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
) ENGINE=InnoDB AUTO_INCREMENT=471 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parish`
--

LOCK TABLES `parish` WRITE;
/*!40000 ALTER TABLE `parish` DISABLE KEYS */;
INSERT INTO `parish` VALUES (1,'23 DE ENERO',101),(2,'ACEQUIAS',1406),(3,'ACURIGUA',1106),(4,'ADAURE',1109),(5,'ADÍCORA',1109),(6,'ADRIÁN',1707),(7,'AGUA CALIENTE',2110),(8,'AGUA CLARA',1108),(9,'AGUA LARGA',1110),(10,'AGUA LINDA',1111),(11,'AGUA SALADA',705),(12,'AGUA SANTA',2110),(13,'AGUA VIVA',1306),(14,'AGUEDO FELIPE ALVARADO',1303),(15,'AGUIRRE',1706),(16,'ALBARICO',2211),(17,'ALBERTO ADRIANI',2007),(18,'ALFREDO ARVELO LARRIVA',604),(19,'ALMIRANTE LUIS BRIÓN',1001),(20,'ALONSO DE OJEDA',2310),(21,'ALTAGRACIA',101),(22,'ALTAGRACIA',702),(23,'ALTAGRACIA',1308),(24,'ALTAGRACIA',1914),(25,'ALTAGRACIA',2314),(26,'ALTAGRACIA DE LA MONTAÑA',1510),(27,'ALTAGRACIA DE ORITUCO',1209),(28,'ALTA GUAJIRA',2315),(29,'ALTAMIRA',605),(30,'ALTAMIRA',1214),(31,'ALTO BARINAS',604),(32,'ALTO DE LOS GODOS',1608),(33,'ALTO VENTUARI',206),(34,'AMBROSIO',2303),(35,'AMENODORO RANGEL LAMÙS',2005),(36,'ANACO',301),(37,'ANA MARÍA CAMPOS',2314),(38,'ANDRÉS BELLO',602),(39,'ANDRÉS BELLO',2309),(40,'ANDRÉS ELOY BLANCO',706),(41,'ANDRÉS ELOY BLANCO',1413),(42,'ANDRÉS LINARES',2118),(43,'ANTÍMANO',101),(44,'ANTOLÍN TOVAR',1810),(45,'ANTONIO BORJAS ROMERO',2313),(46,'ANTONIO DÍAZ',1308),(47,'ANTONIO JOSÉ DE SUCRE',1903),(48,'ANTONIO JOSÉ DE SUCRE',2107),(49,'ANTONIO NICOLAS BRICEÑO',2116),(50,'ANTONIO SPINETTI DINI',1412),(51,'ANZOÁTEGUI',1305),(52,'APARICIO',1609),(53,'APARICIÓN',1807),(54,'APURITO',401),(55,'ARACUA',1102),(56,'ARAGUA',302),(57,'ARAGÜITA',1501),(58,'ARAMENDI',404),(59,'ARAURIMA',1111),(60,'ARAYA',1908),(61,'ARENAS',1912),(62,'AREO',1605),(63,'AREVALO GONZÁLEZ',1501),(64,'ARIAS',1412),(65,'ARICAGUA',1912),(66,'ARIPAO',710),(67,'ARISMENDI',603),(68,'ARISTIDES CALVANI',2303),(69,'ARNOLDO GABALDÓN',2104),(70,'ARNOLDO GABALDÓN',2108),(71,'ASCENCIÓN FARRERAS',702),(72,'ATAPIRIRE',305),(73,'AVARIA',1108),(74,'AYACUCHO',1914),(75,'AYACUCHO',2102),(76,'BAJO VENTUARI',206),(77,'BARAIVED',1109),(78,'BARCELONETA',707),(79,'BARÍ',2308),(80,'BARINAS',604),(81,'BARINITAS',605),(82,'BARIRO',1103),(83,'BARRANCAS',606),(84,'BARTOLOMÉ DE LAS CASAS',2311),(85,'BARUTA',1503),(86,'BEATRÍZ',2120),(87,'BERGANTÍN',318),(88,'BETIJOQUE',2115),(89,'BIDEAU',1915),(90,'BOBURES',2320),(91,'BOCA DE AROA',1120),(92,'BOCA DE CHÁVEZ',316),(93,'BOCA DE GRITA',2009),(94,'BOCA DEL PAO',305),(95,'BOCA DE TOCUYO',1115),(96,'BOCA DE UCHIRE',316),(97,'BOCONÓ',2022),(98,'BOCONÓ',2102),(99,'BOLÍVAR',1305),(100,'BOLÍVAR',1521),(101,'BOLÍVAR',1705),(102,'BOLÍVAR',1905),(103,'BOLÍVAR',2313),(104,'BOLIVIA',2104),(105,'BOQUERÓN',1608),(106,'BOROJÓ',1103),(107,'BRAMÓN',2014),(108,'BRUZUAL',1124),(109,'BUENA VISTA',1109),(110,'BUENA VISTA',1303),(111,'BUENA VISTA',2111),(112,'BURBUSAY',2102),(113,'BURÌA',1307),(114,'CABIMBÚ',2119),(115,'CABRUTA',1206),(116,'CABUDARE',1306),(117,'CABURE',1117),(118,'CACHAMAY',701),(119,'CACHIPO',302),(120,'CACHIPO',1610),(121,'CACIQUE MARA',2313),(122,'CACUTE',1417),(123,'CAIGUA',318),(124,'CALABOZO',1208),(125,'CALDERAS',605),(126,'CAMACARO',1308),(127,'CAMPO ALEGRE',2116),(128,'CAMPO CLARO',1910),(129,'CAMPO ELIAS',1909),(130,'CAMPO ELIAS',2203),(131,'CAMPO ELÍAS',2108),(132,'CAMPO LARA',2310),(133,'CANAME',202),(134,'CANDELARIA',101),(135,'CANELONES',1814),(136,'CANTAGALLO',1212),(137,'CANTAURA',313),(138,'CAÑO DELGADITO',1809),(139,'CAÑO EL TIGRE',1423),(140,'CAPADARE',1101),(141,'CAPATÁRIDA',1103),(142,'CAPAYA',1501),(143,'CAPURÍ',1405),(144,'CARABALLEDA',2401),(145,'CARACCIOLO PARRA PÉREZ',1412),(146,'CARACHE',2105),(147,'CARAYACA',2401),(148,'CARDENAS',2028),(149,'CARIACO',1913),(150,'CARICUAO',101),(151,'CARIRUBANA',1105),(152,'CARLOS QUEVEDO',2306),(153,'CARLOS SOUBLETTE',2401),(154,'CARMEN HERRERA',2303),(155,'CARRILLO',2104),(156,'CARRIZAL',1506),(157,'CARUAO',2401),(158,'CARVAJAL',2116),(159,'CASIGUA',1113),(160,'CASIQUIARE',207),(161,'CASTAÑEDA',1308),(162,'CATEDRAL',101),(163,'CATEDRAL',705),(164,'CATEDRAL',1303),(165,'CATIA LA MAR',2401),(166,'CATUARO',1913),(167,'CAUCAGUA',1501),(168,'CAUCAGÜITA',1519),(169,'CAZORLA',1204),(170,'CECILIO ACOSTA',1510),(171,'CECILIO ACOSTA',2313),(172,'CECILIO ZUBILLAGA',1308),(173,'CEGARRA',2104),(174,'CHACANTÁ',1405),(175,'CHACAO',1507),(176,'CHACOPATA',1908),(177,'CHAGUARAMAL',1609),(178,'CHAGUARAMAS',1202),(179,'CHAGUARAMAS',1607),(180,'CHARALLAVE',1508),(181,'CHEJENDÉ',2104),(182,'CHEREGUE',2103),(183,'CHICHIRIVICHE',1115),(184,'CHIGUARÁ',1420),(185,'CHIQUINQUIRÁ',1308),(186,'CHIQUINQUIRÁ',2118),(187,'CHIQUINQUIRÁ',2309),(188,'CHIQUINQUIRÁ',2313),(189,'CHIRICA',701),(190,'CHORRERÓN',306),(191,'CHURUGUARA',1110),(192,'CINCO DE JULIO',1002),(193,'CIPRIANO CASTRO',2015),(194,'CIUDAD BOLIVIA',609),(195,'CIUDAD DE NUTRIAS',611),(196,'CLARINES',312),(197,'COCHE',101),(198,'COCOLLAR',1912),(199,'COCUY',207),(200,'CODAZZI',405),(201,'COJEDES',901),(202,'COLINA',1117),(203,'COMUNIDAD',205),(204,'CONCEPCIÓN',1303),(205,'CONCEPCIÓN',1813),(206,'CONCEPCIÓN',2309),(207,'CONSTITUCIÓN',2017),(208,'COQUIVACOA',2313),(209,'CORAZÓN DE JESÚS',604),(210,'CÓRDOBA',1804),(211,'CORONEL MARIANO PERAZA',1304),(212,'CRISTOBAL COLÓN',1915),(213,'CRISTÓBAL MENDOZA',2118),(214,'CRISTO DE ARANZA',2313),(215,'CRUZ CARRILLO',2118),(216,'CÚA',1520),(217,'CUARA',1304),(218,'CUICAS',2105),(219,'CUMANACOA',1912),(220,'CUMBO',1502),(221,'CUNAVICHE',405),(222,'CÚPIRA',1516),(223,'CURIAPO',1001),(224,'CURIEPE',1504),(225,'CURIMAGUA',1117),(226,'DALLA COSTA',701),(227,'DALLA COSTA',709),(228,'DIEGO DE LOZADA',1304),(229,'DIVINA PASTORA',1805),(230,'DOLORES',610),(231,'DOMINGA ORTIZ DE PÁEZ',604),(232,'DOMINGO PEÑA',1412),(233,'DOMITILA FLORES',2317),(234,'DONALDO GARCIA',2316),(235,'DORADAS',2016),(236,'DR. FRANCISCO ROMERO LOBO',2023),(237,'EDMUNDO BARRIOS',319),(238,'EL AMPARO',404),(239,'EL AMPARO',906),(240,'EL AMPARO',1421),(241,'EL ARAGUANEY',2101),(242,'EL BAJO',2317),(243,'EL BAÑO',2112),(244,'EL BATEY',2320),(245,'EL BAÚL',903),(246,'EL BLANCO',1308),(247,'EL CAFÉ',1501),(248,'EL CAFETAL',1503),(249,'EL CALVARIO',1208),(250,'EL CANTÓN',611),(251,'EL CARITO',311),(252,'EL CARMELO',2309),(253,'EL CARMEN',318),(254,'EL CARMEN',604),(255,'EL CARMEN',2102),(256,'EL CARTANAL',1511),(257,'EL CENIZO',2110),(258,'EL CHAPARRO',320),(259,'EL CHARAL',1123),(260,'EL COROZO',1608),(261,'EL CUJÍ',1303),(262,'EL DIVIDIVE',2110),(263,'ELEAZAR LÓPEZ CONTRERAS',2026),(264,'ELEAZAR LÓPEZ CONTRERAS',2310),(265,'EL FURRIAL',1608),(266,'EL GUÁCHARO',1604),(267,'EL GUAPO',1514),(268,'EL GUAYABO',2214),(269,'EL HATILLO',1509),(270,'EL HATO',1109),(271,'ELÍAS SANCHEZ RUBIO',2315),(272,'EL JAGUITO',2101),(273,'EL JARILLO',1510),(274,'EL JUNKO',2401),(275,'EL JUNQUITO',101),(276,'EL LLANO',1412),(277,'EL LLANO',1421),(278,'EL MENE',2318),(279,'EL MOLINO',1405),(280,'EL MORRO',321),(281,'EL MORRO',1412),(282,'EL MORRO DE PUERTO SANTO',1903),(283,'ELOY PAREDES',1414),(284,'EL PAO',905),(285,'EL PAO DE BARCELONA',305),(286,'EL PARAISO',101),(287,'EL PARAISO',2117),(288,'EL PAUJIL',1907),(289,'EL PILAR',318),(290,'EL PILAR',1904),(291,'EL PINTO',1609),(292,'EL PLAYON',1812),(293,'EL PROGRESO',2109),(294,'EL RASTRO',1208),(295,'EL REAL',608),(296,'EL RECREO',101),(297,'EL RECREO',407),(298,'EL REGALO',611),(299,'EL RINCÓN',1904),(300,'EL ROSARIO',2316),(301,'EL SOCORRO',606),(302,'EL SOCORRO',1203),(303,'EL SOCORRO',2107),(304,'EL SOMBRERO',1207),(305,'EL TEJERO',1606),(306,'EL VALLE',101),(307,'EL VÍNCULO',1109),(308,'EL YAGUAL',401),(309,'EMETERIO OCHOA',2016),(310,'EMILIO CONSTANTINO GUERRERO',2012),(311,'ENCONTRADOS',2304),(312,'ESCUQUE',2106),(313,'ESPINO',1205),(314,'ESPINOZA DE LOS MONTEROS',1308),(315,'ESTANQUES',1420),(316,'FARIA',2314),(317,'FERNÁNDEZ PEÑA',1406),(318,'FERNANDO GIRÓN TOVAR',203),(319,'FILAS DE MARICHES',1519),(320,'FLOR DE PATRIA',2113),(321,'FLORENCIO RAMÍREZ',1407),(322,'FLORIDA',1812),(323,'FRANCISCO ANICETO LUGO',1001),(324,'FRANCISCO EUGENIO BUSTAMANTE',2313),(325,'FRANCISCO FAJARDO',1704),(326,'FRANCISCO JAVIER PULGAR',2306),(327,'FRANCISCO OCHOA',2317),(328,'FREITEZ',1302),(329,'GABRIEL PICÓN GONZALEZ',1401),(330,'GENERAL EN JEFE JOSÉ LAURENCIO SILVA',909),(331,'GENERAL JUAN VICENTE GÓMEZ',2004),(332,'GENERAL RIVAS',2102),(333,'GENERAL URDANETA',2302),(334,'GERMÁN RÍOS LINARES',2303),(335,'GERÓNIMO MALDONADO',1418),(336,'GIBRALTAR',2320),(337,'GONZALO PICÓN FEBRES',1412),(338,'GRAL. FRANCISCO ANTONIO VASQUEZ',1904),(339,'GRANADOS',2103),(340,'GUACHARA',401),(341,'GUADARRAMA',603),(342,'GUAIBACOA',1106),(343,'GUADARRAMA',1405),(344,'GUAJIRA',2315),(345,'GUAJIRO',1103),(346,'GUANAGUANA',1609),(347,'GUANAPE',312),(348,'GUANIAMO',702),(349,'GUANTA',306),(350,'GUARAMACAL',2102),(351,'GUARATARO',710),(352,'GUARAUNOS',1904),(353,'GUARDATINAJAS',1208),(354,'GUARENAS',1517),(355,'GUÁRICO',1305),(356,'GUATIRE',1521),(357,'GUAYAPO',204),(358,'GUEVARA',1705),(359,'GÜIRIA',1915),(360,'GUSTAVO VEGAS LEÓN',1307),(361,'GUZMÁN GUILLERMO',1114),(362,'HECTOR AMABLE MORA',1401),(363,'HERAS',2320),(364,'HERIBERTO ARROYO',1308),(365,'HERNÁNDEZ',2022),(366,'HIGUEROTE',1504),(367,'HILARIO LUNA Y LUNA',1305),(368,'HUMOCARO ALTO',1305),(369,'HUMOCARO BAJO',1305),(370,'IDELFONSO VASQUEZ',2313),(371,'IGNACIO BRICEÑO',609),(372,'IKABARÚ',704),(373,'IMATACA',1002),(374,'INDEPENDENCIA',1110),(375,'INDEPENDENCIA',1422),(376,'IRAPA',1910),(377,'ISAÍAS MEDINA ANGARITA',2004),(378,'ISLA DE TOAS',2301),(379,'JACINTO PLAZA',1412),(380,'JACURA',1111),(381,'JADACAQUIVA',1109),(382,'JAJÍ',1406),(383,'JAJÓ',2119),(384,'JALISCO',2112),(385,'JESÚS MARÍA SEMPRUN',2308),(386,'JORGE HERNÁNDEZ',2303),(387,'JOSÉ ANTONIO PÁEZ',705),(388,'JOSÉ ANTONIO PÁEZ',2009),(389,'JOSÉ BERNARDO DURANTE',1304),(390,'JOSÉ CENOVIO URRIBARRI',2318),(391,'JOSE FÉLIX RIBAS',609),(392,'JOSÉ GREGORIO BASTIDAS',1306),(393,'JOSÉ GREGORIO HERNÁNDEZ',2115),(394,'JOSÉ IGNACIO DEL PUMAR',607),(395,'JOSÉ LEONARDO SUAREZ',2116),(396,'JOSÉ MARÍA BLANCO',1302),(397,'JOSÉ NUCETE SARDI',1401),(398,'JOSÉ RAMÓN YEPEZ',2307),(399,'JOSÉ VIDAL MARCANO',1004),(400,'JUANA DE AVILA',2313),(401,'JUAN ANGEL BRAVO',908),(402,'JUAN ANTONIO RODRÍGUEZ DOMINGUEZ',604),(403,'JUAN BAUTISTA ARISMENDI',1002),(404,'JUAN BAUTISTA RODRIGUEZ',1304),(405,'JUAN DE MATA SUAREZ',901),(406,'JUAN DE VILLEGAS',1303),(407,'JUAN GERMAN ROSCIO',2011),(408,'JUAN IGNACIO MONTILLA',2120),(409,'JUAN MILLAN',1004),(410,'JUAN PABLO PEÑALOZA',2028),(411,'JUAN RODRÍGUEZ SUÁREZ',1412),(412,'JUAREZ',1303),(413,'JUDIBANA',1112),(414,'JUNÍN',2117),(415,'JUSEPÍN',1608),(416,'LA AGUADITA',904),(417,'LA CANDELARIA',1305),(418,'LA CEIBA',2109),(419,'LA CIÈNAGA',1125),(420,'LA CONCEPCIÓN',2105),(421,'LA CONCEPCIÓN',2114),(422,'LA CONCEPCIÓN',2307),(423,'LA CONCORDIA',2023),(424,'LA DEMOCRACIA',1512),(425,'LA DOLORITA',1519),(426,'LA ESPERANZA',2101),(427,'LA ESTACION',1807),(428,'LA FLORIDA',2005),(429,'LA GUAIRA',2401),(430,'LA GUANOTA',1604),(431,'LA LUZ',608),(432,'LA MESA',1406),(433,'LA MESA',2119),(434,'LA PALMITA',2019),(435,'LA PASTORA',101),(436,'LA PASTORA',1101),(437,'LA PAZ',2113),(438,'LA PEÑA',1102),(439,'LA PETROLEA',2014),(440,'LA PICA',1608),(441,'LA PUEBLITA',2115),(442,'LA PUERTA',2120),(443,'LA QUEBRADA',2119),(444,'LARA',1308),(445,'LA ROSA',2303),(446,'LA SABANITA',705),(447,'LAS ALHÚACAS',1607),(448,'LAS BRISAS',1508),(449,'LAS CALDERAS',1106),(450,'LAS COCUIZAS',1608),(451,'LA SIERRITA',2312),(452,'LAS MAJADAS',710),(453,'LAS MERCEDES',1206),(454,'LAS MERCEDES',1308),(455,'LAS MINAS DE BARUTA',1503),(456,'LA SOLEDAD',1125),(457,'LAS PARCELAS',2312),(458,'LAS PIEDRAS',1408),(459,'LASSO DE LA VEGA',1412),(460,'LAS VEGAS DEL TUY',1123),(461,'LA TOMA',1417),(462,'LA TOSCANA',1609),(463,'LA TRAMPA',1420),(464,'LA TRINIDAD',406),(465,'LA UNIÓN',603),(466,'LA UNIÓN',2106),(467,'LA URBANA',702),(468,'LA VEGA',101),(469,'LA VEGA DE GUARAMACAL',2102),(470,'LA VELA DE CORO',1106);
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
  `id_permision` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `permision` varchar(255) NOT NULL,
  PRIMARY KEY (`id_permision`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permision`
--

LOCK TABLES `permision` WRITE;
/*!40000 ALTER TABLE `permision` DISABLE KEYS */;
INSERT INTO `permision` VALUES (1,'view_home');
/*!40000 ALTER TABLE `permision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsable`
--

DROP TABLE IF EXISTS `responsable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsable` (
  `id_responsable` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(50) NOT NULL,
  `cedula` varchar(10) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `id_parish` int(10) unsigned NOT NULL,
  `id_attention` int(10) unsigned NOT NULL,
  `circuit` int(10) unsigned NOT NULL,
  `coordenadas` varchar(255) NOT NULL,
  `mission_base` varchar(150) NOT NULL,
  `clap` varchar(200) NOT NULL,
  `tons` varchar(50) NOT NULL,
  `compliance` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `observations` varchar(200) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_responsable`),
  KEY `responsable_id_parish_foreign` (`id_parish`),
  KEY `responsable_id_attention_foreign` (`id_attention`),
  KEY `responsable_circuit_foreign` (`circuit`),
  CONSTRAINT `responsable_circuit_foreign` FOREIGN KEY (`circuit`) REFERENCES `circuit_or_communes` (`id_circuit`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `responsable_id_attention_foreign` FOREIGN KEY (`id_attention`) REFERENCES `attention` (`id_attention`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `responsable_id_parish_foreign` FOREIGN KEY (`id_parish`) REFERENCES `parish` (`id_parish`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsable`
--

LOCK TABLES `responsable` WRITE;
/*!40000 ALTER TABLE `responsable` DISABLE KEYS */;
/*!40000 ALTER TABLE `responsable` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'Administrador'),(2,'Usuario');
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'Amazonas'),(2,'Anzoátegui'),(3,'Apure'),(4,'Aragua'),(5,'Barinas'),(6,'Bolívar'),(7,'Carabobo'),(8,'Cojedes'),(9,'Delta Amacuro'),(10,'Distrito Capital'),(11,'Falcón'),(12,'Guárico'),(13,'Lara'),(14,'Mérida'),(15,'Miranda'),(16,'Monagas'),(17,'Nueva Esparta'),(18,'Portuguesa'),(19,'Sucre'),(20,'Táchira'),(21,'Trujillo'),(22,'Vargas'),(23,'Yaracuy'),(24,'Zulia');
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
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `id_rols` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_users`),
  UNIQUE KEY `users_username_unique` (`username`),
  KEY `users_id_rols_foreign` (`id_rols`),
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

-- Dump completed on 2026-03-02 13:58:58
