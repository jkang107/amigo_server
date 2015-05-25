-- MySQL dump 10.13  Distrib 5.6.23, for Win64 (x86_64)
--
-- Host: localhost    Database: travel_buddy
-- ------------------------------------------------------
-- Server version	5.6.24-log

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
-- Table structure for table `travel`
--

DROP TABLE IF EXISTS `travel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `travel` (
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `sex` varchar(45) NOT NULL,
  `age` varchar(45) NOT NULL,
  `when_from` varchar(45) DEFAULT NULL,
  `when_to` varchar(45) DEFAULT NULL,
  `country_from` varchar(45) DEFAULT NULL,
  `country_to` varchar(45) DEFAULT NULL,
  `city_from` varchar(45) DEFAULT NULL,
  `city_to` varchar(45) DEFAULT NULL,
  `transportation` varchar(45) DEFAULT NULL,
  `tour_name` varchar(45) DEFAULT NULL,
  `kakao_thumbnail` varchar(200) NOT NULL,
  `comment` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel`
--

LOCK TABLES `travel` WRITE;
/*!40000 ALTER TABLE `travel` DISABLE KEYS */;
INSERT INTO `travel` VALUES (10,'22044723','travelWith','man','age_20','05/26/2015','06/06/2015','페루,볼리비아,브라질,멕시코',NULL,NULL,NULL,NULL,NULL,'http://mud-kage.kakao.co.kr/14/dn/btqb4CAgAzI/RQ6IGbda4CN2krpdNJ5aOk/o.jpg','zzzzz please'),(11,'22044723','moveWith','woman','age_30','05/26/2015',NULL,'페루','페루','리마','와라즈','bus',NULL,'http://mud-kage.kakao.co.kr/14/dn/btqb4CAgAzI/RQ6IGbda4CN2krpdNJ5aOk/o.jpg','야간버스'),(12,'22044723','tourWith','woman','age_20','06/02/2015','06/05/2015','칠레',NULL,NULL,NULL,NULL,'토레스 델 파이네','http://mud-kage.kakao.co.kr/14/dn/btqb4CAgAzI/RQ6IGbda4CN2krpdNJ5aOk/o.jpg','캠핑 같이 해요'),(13,'22044723','foodWith','woman','age_20','05/27/2015',NULL,'아르헨티나',NULL,'살타',NULL,NULL,NULL,'http://mud-kage.kakao.co.kr/14/dn/btqb4CAgAzI/RQ6IGbda4CN2krpdNJ5aOk/o.jpg','고기 ㄱㄱㄱ');
/*!40000 ALTER TABLE `travel` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-05-25 14:08:33
