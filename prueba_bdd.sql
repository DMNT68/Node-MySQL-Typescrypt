/*
 Navicat Premium Data Transfer

 Source Server         : MariaDB
 Source Server Type    : MariaDB
 Source Server Version : 100136
 Source Host           : localhost:3306
 Source Schema         : prueba_bdd

 Target Server Type    : MariaDB
 Target Server Version : 100136
 File Encoding         : 65001

 Date: 17/09/2019 17:25:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cliente
-- ----------------------------
DROP TABLE IF EXISTS `cliente`;
CREATE TABLE `cliente` (
  `id cliente` int(20) NOT NULL AUTO_INCREMENT, -- falto autoincremental
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  --`categoria` varchar(255) DEFAULT NULL, -- no es necesario este campo aqui, prodria ser roles
  PRIMARY KEY (`id cliente`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for factura -- cabezera de la factura o maestro 
-- ----------------------------
DROP TABLE IF EXISTS `factura`;
CREATE TABLE `factura` (
  `numero_factura` int(10) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(10) DEFAULT NULL,
  `fecha_venta` date DEFAULT NULL, -- aca prodrias cojer la fecha del sistema
  `total` double(20,2) DEFAULT NULL, -- falta campo total y  (20,2) (enteros,decimales)
  --`id_producto` int(10) DEFAULT NULL, -- no va este campo aqui
  PRIMARY KEY (`numero_factura`) USING BTREE,
  KEY `fk_cliente` (`id_cliente`) USING BTREE,
  -- KEY `fk_producto` (`id_producto`) USING BTREE, --borrar
  CONSTRAINT `fk_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id cliente`),
  -- CONSTRAINT `fk_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) --borrar
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for detalle factura -- faltaba esta tabla
-- ----------------------------
CREATE TABLE `detalle_factura` (
  `id_detalle` int(20) NOT NULL AUTO_INCREMENT,
  `id_factura` int(10) NOT NULL ,
  `id_producto` int(20) not NULL,
  `cantidad` int(10) NOT NULL,
  `precio_unitario` double(20,2) NOT NULL, -- falto agregar este campo calcularlo en el backend complicado o enviarlo desde el backend calculado
  PRIMARY KEY (`id_detalle`) USING BTREE,
  KEY `fk_producto` (`id_producto`) USING BTREE,
  KEY `fk_factura` (`id_factura`) USING BTREE,
  CONSTRAINT `fk_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `fk_producto` FOREIGN KEY (`id_factura`) REFERENCES `factura` (`numero_factura`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- ----------------------------
-- Table structure for producto
-- ----------------------------
DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto` (
  `id_producto` int(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `precio` double(20,2) DEFAULT NULL,
  `stock` int(20) DEFAULT NULL,
  --`id_factura` int(20) DEFAULT NULL, -- no va
  PRIMARY KEY (`id_producto`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for t_casos
-- ----------------------------
DROP TABLE IF EXISTS `t_casos`;
CREATE TABLE `t_casos` (
  `caso_id` int(11) NOT NULL,
  `proco_id` int(11) DEFAULT NULL,
  `est_id` int(11) DEFAULT NULL,
  `tda_id` int(11) DEFAULT NULL,
  `dav_id` int(11) DEFAULT NULL,
  `tdenun_id` int(11) DEFAULT NULL,
  `caso_numcaso` varchar(30) DEFAULT NULL,
  `caso_motivo` varchar(200) DEFAULT NULL,
  `caso_observaciones` varchar(200) DEFAULT NULL,
  `caso_fechareg` date DEFAULT NULL,
  `caso_fechaingreso` date DEFAULT NULL,
  PRIMARY KEY (`caso_id`) USING BTREE,
  KEY `fk_t_casos_reference_t_derech` (`dav_id`) USING BTREE,
  KEY `fk_t_casos_reference_t_estado` (`est_id`) USING BTREE,
  KEY `fk_t_casos_reference_t_proces` (`proco_id`) USING BTREE,
  KEY `fk_t_casos_reference_t_tipo_d` (`tdenun_id`) USING BTREE,
  KEY `fk_t_casos_reference_tipo_der` (`tda_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for t_datosafectado
-- ----------------------------
DROP TABLE IF EXISTS `t_datosafectado`;
CREATE TABLE `t_datosafectado` (
  `daf_id` int(11) NOT NULL,
  `caso_id` int(11) DEFAULT NULL,
  `iden_id` int(11) DEFAULT NULL,
  `gene_id` int(11) DEFAULT NULL,
  `dis_id` int(11) DEFAULT NULL,
  `prov_id` int(11) DEFAULT NULL,
  `can_id` int(11) DEFAULT NULL,
  `sec_id` int(11) DEFAULT NULL,
  `parr_id` int(11) DEFAULT NULL,
  `daf_nombre` varchar(30) DEFAULT NULL,
  `daf_apellido` varchar(50) DEFAULT NULL,
  `daf_ci` varchar(10) DEFAULT NULL,
  `daf_fecha_nacimiento` date DEFAULT NULL,
  `daf_edad` int(11) DEFAULT NULL,
  `daf_direccion` varchar(150) DEFAULT NULL,
  `daf_telefono` varchar(10) DEFAULT NULL,
  `daf_email` varchar(20) DEFAULT NULL,
  `daf_obsevacion` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`daf_id`) USING BTREE,
  KEY `fk_t_datosa_reference_t_canton` (`can_id`) USING BTREE,
  KEY `fk_t_datosa_reference_t_casos` (`caso_id`) USING BTREE,
  KEY `fk_t_datosa_reference_t_discap` (`dis_id`) USING BTREE,
  KEY `fk_t_datosa_reference_t_genero` (`gene_id`) USING BTREE,
  KEY `fk_t_datosa_reference_t_identi` (`iden_id`) USING BTREE,
  KEY `fk_t_datosa_reference_t_parroq` (`parr_id`) USING BTREE,
  KEY `fk_t_datosa_reference_t_provin` (`prov_id`) USING BTREE,
  KEY `fk_t_datosa_reference_t_sector` (`sec_id`) USING BTREE,
  CONSTRAINT `fk_t_datosa_reference_t_casos` FOREIGN KEY (`caso_id`) REFERENCES `t_casos` (`caso_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for t_denunciado
-- ----------------------------
DROP TABLE IF EXISTS `t_denunciado`;
CREATE TABLE `t_denunciado` (
  `dag_id` int(11) NOT NULL,
  `caso_id` int(11) DEFAULT NULL,
  `iden_id` int(11) DEFAULT NULL,
  `gene_id` int(11) DEFAULT NULL,
  `prov_id` int(11) DEFAULT NULL,
  `sec_id` int(11) DEFAULT NULL,
  `can_id` int(11) DEFAULT NULL,
  `tper_id` int(11) DEFAULT NULL,
  `parr_id` int(11) DEFAULT NULL,
  `dag_nombre` varchar(50) DEFAULT NULL,
  `dag_apellido` varchar(50) DEFAULT NULL,
  `dag_ci` varchar(10) DEFAULT NULL,
  `dag_relacion_afectado` varchar(150) DEFAULT NULL,
  `dag_direccion` varchar(150) DEFAULT NULL,
  `dag_telefono` varchar(10) DEFAULT NULL,
  `dag_email` varchar(20) DEFAULT NULL,
  `dag_observacion` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`dag_id`) USING BTREE,
  KEY `fk_t_denunc_reference_t_canton` (`can_id`) USING BTREE,
  KEY `fk_t_denunc_reference_t_casos` (`caso_id`) USING BTREE,
  KEY `fk_t_denunc_reference_t_genero` (`gene_id`) USING BTREE,
  KEY `fk_t_denunc_reference_t_identi` (`iden_id`) USING BTREE,
  KEY `fk_t_denunc_reference_t_parroq` (`parr_id`) USING BTREE,
  KEY `fk_t_denunc_reference_t_provin` (`prov_id`) USING BTREE,
  KEY `fk_t_denunc_reference_t_sector` (`sec_id`) USING BTREE,
  KEY `fk_t_denunc_reference_t_tipo_p` (`tper_id`) USING BTREE,
  CONSTRAINT `fk_t_denunc_reference_t_casos` FOREIGN KEY (`caso_id`) REFERENCES `t_casos` (`caso_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 1;
