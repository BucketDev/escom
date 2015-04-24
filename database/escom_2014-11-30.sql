# ************************************************************
# Sequel Pro SQL dump
# Versión 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.20)
# Base de datos: escom
# Tiempo de Generación: 2014-12-01 04:35:35 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Volcado de tabla cat_carreras
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cat_carreras`;

CREATE TABLE `cat_carreras` (
  `carrera_k` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'identificador del catálogo de carreras',
  `nombre` varchar(100) NOT NULL DEFAULT '' COMMENT 'nombre de la carrera',
  `activo` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'bandera booleana de activación',
  PRIMARY KEY (`carrera_k`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `cat_carreras` WRITE;
/*!40000 ALTER TABLE `cat_carreras` DISABLE KEYS */;

INSERT INTO `cat_carreras` (`carrera_k`, `nombre`, `activo`)
VALUES
	(1,'Ingeniería en Sistemas Computacionales',1);

/*!40000 ALTER TABLE `cat_carreras` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla cat_categorias
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cat_categorias`;

CREATE TABLE `cat_categorias` (
  `categoria_k` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'identificador del catálogo de categorias',
  `nombre` varchar(100) NOT NULL DEFAULT '' COMMENT 'nombre de la categoría',
  `timestamp_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'timestamp de creación del registro',
  `usuario_creacion_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del usuario que agregó el registro',
  `activo` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'bandera booleana de activación',
  PRIMARY KEY (`categoria_k`),
  KEY `usuario_creacion_k` (`usuario_creacion_k`),
  CONSTRAINT `cat_categorias_ibfk_1` FOREIGN KEY (`usuario_creacion_k`) REFERENCES `tb_usuarios` (`usuario_k`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `cat_categorias` WRITE;
/*!40000 ALTER TABLE `cat_categorias` DISABLE KEYS */;

INSERT INTO `cat_categorias` (`categoria_k`, `nombre`, `timestamp_creacion`, `usuario_creacion_k`, `activo`)
VALUES
	(1,'Administradores','2014-01-23 18:18:16',NULL,1),
	(2,'Alumnos','2014-01-23 18:26:14',1,1),
	(3,'Documentos Generales','2014-02-05 22:26:21',1,1),
	(4,'Documentos Titulación','2014-02-05 22:26:31',1,1),
	(5,'Dictámenes','2014-02-05 22:26:40',1,1);

/*!40000 ALTER TABLE `cat_categorias` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla cat_configuraciones
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cat_configuraciones`;

CREATE TABLE `cat_configuraciones` (
  `configuracion_k` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'identificador del catálogo de configuraciones',
  `nombre` varchar(50) NOT NULL DEFAULT '' COMMENT 'nombre de la configuración',
  `propietario_k` int(11) unsigned NOT NULL COMMENT 'identificador de la tabla a la que está relacionada una configuración',
  `tabla_propietario` varchar(100) DEFAULT NULL COMMENT 'nombre de la tabla a la que está relacionada una configuración',
  `valor` text NOT NULL COMMENT 'valor de la configuración',
  PRIMARY KEY (`configuracion_k`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla cat_documentos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cat_documentos`;

CREATE TABLE `cat_documentos` (
  `documento_k` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'identificador del catálogo de documentos',
  `nombre` varchar(200) NOT NULL DEFAULT '' COMMENT 'nombre del documento',
  `descripcion` text COMMENT 'descripción del documento',
  `categoria_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del catálogo de categorías',
  `tiempo_minimo` int(11) NOT NULL DEFAULT '1' COMMENT 'tiempo mínimo de entrega del documento, se usa para dar estimados',
  `usuario_creacion_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del usuario que agregó el registro',
  `activo` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'bandera booleana de activación',
  PRIMARY KEY (`documento_k`),
  KEY `categoria_k` (`categoria_k`),
  KEY `usuario_creacion_k` (`usuario_creacion_k`),
  CONSTRAINT `cat_documentos_ibfk_1` FOREIGN KEY (`categoria_k`) REFERENCES `cat_categorias` (`categoria_k`) ON DELETE SET NULL,
  CONSTRAINT `cat_documentos_ibfk_2` FOREIGN KEY (`usuario_creacion_k`) REFERENCES `tb_usuarios` (`usuario_k`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `cat_documentos` WRITE;
/*!40000 ALTER TABLE `cat_documentos` DISABLE KEYS */;

INSERT INTO `cat_documentos` (`documento_k`, `nombre`, `descripcion`, `categoria_k`, `tiempo_minimo`, `usuario_creacion_k`, `activo`)
VALUES
	(1,'Constancia de Créditos','Constancia que avale los créditos cursados en la carrera',4,5,1,1),
	(2,'Boleta Global','Boleta de calificaciones global',3,2,1,1);

/*!40000 ALTER TABLE `cat_documentos` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla cat_estatus
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cat_estatus`;

CREATE TABLE `cat_estatus` (
  `estatus_k` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'identificador del catálogo de estatus',
  `nombre` varchar(50) NOT NULL DEFAULT '' COMMENT 'nombre del estatus',
  `descripcion` text COMMENT 'descripción del estatus',
  PRIMARY KEY (`estatus_k`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `cat_estatus` WRITE;
/*!40000 ALTER TABLE `cat_estatus` DISABLE KEYS */;

INSERT INTO `cat_estatus` (`estatus_k`, `nombre`, `descripcion`)
VALUES
	(1,'Solicitado','Estatus inicial de un documento al ser solicitado por un alumno'),
	(2,'Asignado','La solicitud del documento ha sido asignada a un administrador'),
	(3,'En Revisión','El administrador ha enviado la solicitud a revisión');

/*!40000 ALTER TABLE `cat_estatus` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla cat_modulos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cat_modulos`;

CREATE TABLE `cat_modulos` (
  `modulo_k` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'identificador del catálogo de módulos',
  `nombre` varchar(50) NOT NULL DEFAULT '' COMMENT 'nombre del módulo, se usará para las barras de títulos',
  `descripcion` text COMMENT 'descripción del módulo',
  `icono` varchar(200) NOT NULL DEFAULT '' COMMENT 'icono que será mostrado al usuario al listar el módulo',
  `timestamp_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'timestamp de creación del registro',
  `usuario_creacion_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del usuario que agregó el registro',
  `activo` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'bandera booleana de activación',
  PRIMARY KEY (`modulo_k`),
  KEY `usuario_creacion_k` (`usuario_creacion_k`),
  CONSTRAINT `cat_modulos_ibfk_1` FOREIGN KEY (`usuario_creacion_k`) REFERENCES `tb_usuarios` (`usuario_k`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `cat_modulos` WRITE;
/*!40000 ALTER TABLE `cat_modulos` DISABLE KEYS */;

INSERT INTO `cat_modulos` (`modulo_k`, `nombre`, `descripcion`, `icono`, `timestamp_creacion`, `usuario_creacion_k`, `activo`)
VALUES
	(1,'Administración','Módulo de administración de la plataforma','gear_in','2014-02-03 15:16:35',1,1),
	(2,'Mi Perfil','Módulo de administración de los datos personales del perfil de un usuario','user_batman','2014-02-03 15:18:04',1,1),
	(3,'Reportes','Módulo de administración de los reportes entregados por la plataforma','report_stack','2014-02-03 15:20:36',1,1),
	(4,'Seguimiento','Módulo de seguimiento de las solicitudes de documentos en la plataforma','document_next','2014-02-03 15:27:28',1,1);

/*!40000 ALTER TABLE `cat_modulos` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla cat_planes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cat_planes`;

CREATE TABLE `cat_planes` (
  `plan_k` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'identificador del catálogo de planes',
  `nombre` varchar(100) NOT NULL DEFAULT '' COMMENT 'nombre del plan',
  `activo` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'bandera booleana de activación',
  PRIMARY KEY (`plan_k`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `cat_planes` WRITE;
/*!40000 ALTER TABLE `cat_planes` DISABLE KEYS */;

INSERT INTO `cat_planes` (`plan_k`, `nombre`, `activo`)
VALUES
	(1,'09',1);

/*!40000 ALTER TABLE `cat_planes` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla cat_roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cat_roles`;

CREATE TABLE `cat_roles` (
  `rol_k` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'identificador del catálogo de roles',
  `categoria_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del catálogo de categorías',
  `nombre` varchar(100) NOT NULL DEFAULT '' COMMENT 'nombre del rol',
  `controlador` varchar(100) NOT NULL DEFAULT '' COMMENT 'nombre de la clase del controlador de php que será llamado al ingresar a la plataforma',
  `activo` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'bandera booleana de activación',
  PRIMARY KEY (`rol_k`),
  KEY `categoria_k` (`categoria_k`),
  CONSTRAINT `cat_roles_ibfk_1` FOREIGN KEY (`categoria_k`) REFERENCES `cat_categorias` (`categoria_k`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `cat_roles` WRITE;
/*!40000 ALTER TABLE `cat_roles` DISABLE KEYS */;

INSERT INTO `cat_roles` (`rol_k`, `categoria_k`, `nombre`, `controlador`, `activo`)
VALUES
	(1,1,'Administrador de la plataforma','admin',1),
	(2,2,'Alumno','seguimiento',1),
	(3,1,'Control Escolar','admin',1);

/*!40000 ALTER TABLE `cat_roles` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla cat_submodulos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cat_submodulos`;

CREATE TABLE `cat_submodulos` (
  `submodulo_k` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'identificador del catálogo de submódulos',
  `submodulo_padre_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del catálogo de submódulos al que pertenece este submódulo',
  `modulo_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del catálogo de módulos',
  `nombre` varchar(50) NOT NULL DEFAULT '' COMMENT 'nombre del submódulo, se usará para las barras de títulos',
  `descripcion` text COMMENT 'descripción del submódulo',
  `icono` varchar(200) NOT NULL DEFAULT '' COMMENT 'icono que será mostrado al usuario al listar el submódulo',
  `controlador` varchar(100) NOT NULL DEFAULT '' COMMENT 'nombre de la clase del controlador que sera llamado al instanciar el submódulo',
  `timestamp_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'timestamp de creación del registro',
  `usuario_creacion_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del usuario que agregó el registro',
  `activo` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'bandera booleana de activación',
  PRIMARY KEY (`submodulo_k`),
  KEY `modulo_k` (`modulo_k`),
  KEY `usuario_creacion_k` (`usuario_creacion_k`),
  KEY `submodulo_padre_k` (`submodulo_padre_k`),
  CONSTRAINT `cat_submodulos_ibfk_1` FOREIGN KEY (`modulo_k`) REFERENCES `cat_modulos` (`modulo_k`) ON DELETE SET NULL,
  CONSTRAINT `cat_submodulos_ibfk_2` FOREIGN KEY (`usuario_creacion_k`) REFERENCES `tb_usuarios` (`usuario_k`) ON DELETE SET NULL,
  CONSTRAINT `cat_submodulos_ibfk_3` FOREIGN KEY (`submodulo_padre_k`) REFERENCES `cat_submodulos` (`submodulo_k`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `cat_submodulos` WRITE;
/*!40000 ALTER TABLE `cat_submodulos` DISABLE KEYS */;

INSERT INTO `cat_submodulos` (`submodulo_k`, `submodulo_padre_k`, `modulo_k`, `nombre`, `descripcion`, `icono`, `controlador`, `timestamp_creacion`, `usuario_creacion_k`, `activo`)
VALUES
	(1,NULL,1,'Usuarios','Módulo de administración de los usuarios de la plataforma','user_edit','EscomApp.controller.admin.Users','2014-02-03 15:33:23',1,1),
	(2,NULL,1,'Permisos','Módulo de administración de roles y permisos para los usuarios de la plataforma','group_key','EscomApp.controller.admin.Permissions','2014-02-03 15:39:18',1,1),
	(3,NULL,1,'Submódulos','Módulo de administración de los módulos y submódulos de la plataforma','class_module','EscomApp.controller.admin.Modules','2014-02-03 15:46:34',1,1),
	(4,NULL,2,'Administrar Perfil','Módulo de administración del perfil del usuario, para visualizar o modificar sus datos personales','profiles','EscomApp.controller.profile.Profiles','2014-02-03 15:57:28',1,1),
	(5,NULL,3,'Administrar Reportes','Módulo que administra los reportes entregados por la plataforma','chart_curve_edit','EscomApp.controller.reports.Reports','2014-02-03 16:00:21',1,1),
	(6,NULL,3,'Dashboard','Módulo que administra dashboard con los reportes entregados por la plataforma y asignados previamente','dashboard','EscomApp.controller.reports.Dashboards','2014-02-03 16:00:21',1,1),
	(7,NULL,3,'Correos','Módulo que administra el envío de correos','email_setting','EscomApp.controller.reports.Mails','2014-02-03 16:03:57',1,1),
	(8,NULL,4,'Solicitudes','Módulo de visualización de las solicitudes de documentos en la plataforma','track_changes_2','EscomApp.controller.tracking.Requests','2014-02-03 16:03:57',1,1),
	(9,NULL,4,'Reasignación','Módulo de administración de la carga de trabajo','balance','EscomApp.controller.tracking.Reassignments','2014-02-03 16:17:29',1,1),
	(11,NULL,1,'Documentos','Módulo de administración del catálogo de documentos','document_copies','EscomApp.controller.admin.Documents','2014-02-05 18:41:41',1,1);

/*!40000 ALTER TABLE `cat_submodulos` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla cat_submodulos_acciones
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cat_submodulos_acciones`;

CREATE TABLE `cat_submodulos_acciones` (
  `submodulo_accion_k` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'identificador del catálogo de acciones con submódulos',
  `submodulo_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del catálogo de submódulos',
  `accion` varchar(100) NOT NULL DEFAULT '' COMMENT 'nombre corto de la acción a realizar, servirá para validaciones en JS',
  `descripcion` text COMMENT 'descripción de la relación del sumbódulo con la acción',
  `activo` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'bandera booleana de activación',
  PRIMARY KEY (`submodulo_accion_k`),
  KEY `submodulo_k` (`submodulo_k`),
  CONSTRAINT `cat_submodulos_acciones_ibfk_1` FOREIGN KEY (`submodulo_k`) REFERENCES `cat_submodulos` (`submodulo_k`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `cat_submodulos_acciones` WRITE;
/*!40000 ALTER TABLE `cat_submodulos_acciones` DISABLE KEYS */;

INSERT INTO `cat_submodulos_acciones` (`submodulo_accion_k`, `submodulo_k`, `accion`, `descripcion`, `activo`)
VALUES
	(1,1,'ver_admin_usuarios','Visualizar el módulo de administración de los usuarios de la plataforma',1),
	(2,2,'ver_admin_permisos','Visualizar el módulo de administración de roles y permisos para los usuarios de la plataforma',1),
	(3,3,'ver_admin_submodulos','Visualizar el módulo de administración de los módulos y submódulos de la plataforma',1),
	(4,4,'ver_perfil_miperfil','Visualizar el módulo de administración del perfil del usuario, para visualizar o modificar sus datos personales',1),
	(5,5,'ver_reportes_administrar','Visualizar el módulo que administra los reportes entregados por la plataforma',1),
	(6,6,'ver_reportes_dashboard','Visualizar el módulo que administra dashboard con los reportes entregados por la plataforma y asignados previamente',1),
	(7,7,'ver_reportes_correos','Visualizar el módulo que administra el envío de correos',1),
	(8,8,'ver_seguimiento_solicitudes','Visualizar el módulo de visualización de las solicitudes de documentos en la plataforma',1),
	(9,9,'ver_seguimiento_reasignar','Visualizar el módulo de administración de la carga de trabajo',1),
	(10,8,'editar_seguimiento_solicitudes','Editar las solicitudes de documentos en la plataforma',1),
	(12,11,'ver_admin_documentos','Visualizar el módulo de administración del catálogo de documentos',1),
	(13,1,'agregar_admin_usuarios','Agregar nuevos usuarios en la administración de los usuarios de la plataforma',1),
	(14,1,'eliminar_admin_usuarios','Eliminar usuarios en la administración de los usuarios de la plataforma',1),
	(15,1,'editar_admin_usuarios','Editar usuarios en la administración de los usuarios de la plataforma',1);

/*!40000 ALTER TABLE `cat_submodulos_acciones` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla cat_telefonos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cat_telefonos`;

CREATE TABLE `cat_telefonos` (
  `telefono_k` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'identificador del catálogo de telefonos',
  `propietario_k` int(11) NOT NULL COMMENT 'identificador de la tabla a la que está relacionada un telefono, por ahora, usuario_k',
  `tabla_propietario` varchar(50) NOT NULL DEFAULT '' COMMENT 'nombre de la tabla a la que está relacionada un telefono, por ahora, cat_usuarios',
  `numero` varchar(50) NOT NULL DEFAULT '' COMMENT 'valor del número telefónico',
  `tipo` int(11) NOT NULL DEFAULT '0' COMMENT 'tipo de teléfono, 0-casa, 1-móvil, 2-oficina',
  `activo` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'bandera booleana de activación',
  PRIMARY KEY (`telefono_k`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla escom_sessions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `escom_sessions`;

CREATE TABLE `escom_sessions` (
  `session_id` varchar(40) NOT NULL DEFAULT '0',
  `ip_address` varchar(45) NOT NULL DEFAULT '0',
  `user_agent` varchar(120) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` text NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `last_activity_idx` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `escom_sessions` WRITE;
/*!40000 ALTER TABLE `escom_sessions` DISABLE KEYS */;

INSERT INTO `escom_sessions` (`session_id`, `ip_address`, `user_agent`, `last_activity`, `user_data`)
VALUES
	('91fa4af8cc5b6aa067ea6db4ede4f4c9','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',1417406969,'a:6:{s:9:\"user_data\";s:0:\"\";s:4:\"user\";s:7:\"rodrigo\";s:9:\"usuario_k\";s:1:\"1\";s:10:\"controller\";s:5:\"admin\";s:6:\"origen\";s:3:\"app\";s:3:\"rol\";s:1:\"1\";}'),
	('acff9d8a7c6d181fe150179cf19ff40a','::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',1417408009,'a:6:{s:9:\"user_data\";s:0:\"\";s:4:\"user\";s:7:\"rodrigo\";s:9:\"usuario_k\";s:1:\"1\";s:10:\"controller\";s:5:\"admin\";s:6:\"origen\";s:3:\"app\";s:3:\"rol\";s:1:\"1\";}');

/*!40000 ALTER TABLE `escom_sessions` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_bitacora_errores
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_bitacora_errores`;

CREATE TABLE `tb_bitacora_errores` (
  `bitacora_error_k` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Identificador de la tabla de bitácora de errores',
  `modulo_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador de la tabla de módulos',
  `submodulo_k` int(11) unsigned DEFAULT NULL COMMENT 'Identificador de la tabla de submódulos',
  `clase` varchar(50) NOT NULL DEFAULT '' COMMENT 'Nombre de la clase PHP donde ocurrió el error',
  `metodo` varchar(50) NOT NULL DEFAULT '' COMMENT 'Nombre del método PHP donde ocurrió el error',
  `mensaje_log` varchar(200) NOT NULL DEFAULT '' COMMENT 'Descripción del mensaje arrojado, únicamente será almacenado en bitácora',
  `mensaje_usuario` varchar(200) NOT NULL DEFAULT '' COMMENT 'Descripción del mensaje enviado al usuario',
  `params` text NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`bitacora_error_k`),
  KEY `modulo_k` (`modulo_k`),
  KEY `submodulo_k` (`submodulo_k`),
  CONSTRAINT `tb_bitacora_errores_ibfk_1` FOREIGN KEY (`modulo_k`) REFERENCES `cat_modulos` (`modulo_k`) ON DELETE SET NULL,
  CONSTRAINT `tb_bitacora_errores_ibfk_2` FOREIGN KEY (`submodulo_k`) REFERENCES `cat_submodulos` (`submodulo_k`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tb_bitacora_errores` WRITE;
/*!40000 ALTER TABLE `tb_bitacora_errores` DISABLE KEYS */;

INSERT INTO `tb_bitacora_errores` (`bitacora_error_k`, `modulo_k`, `submodulo_k`, `clase`, `metodo`, `mensaje_log`, `mensaje_usuario`, `params`, `fecha_creacion`)
VALUES
	(1,1,1,'UsuarioDAO','addUser','Duplicate entry \'\' for key \'usuario\'','Ocurrió un error al agregar al usuario, favor de validar los datos ingresados','{\"contrasena\":\"da39a3ee5e6b4b0d3255bfef95601890afd80709\",\"nombre\":\"\",\"apellido_paterno\":\"\",\"apellido_materno\":\"\",\"curp\":\"\",\"edad\":\"5\",\"genero\":\"\",\"carrera_k\":\"\",\"plan_k\":\"\",\"periodo_ingreso\":\"\",\"semestre\":\"\",\"turno\":\"\",\"boleta\":\"\",\"correo\":\"\",\"usuario\":\"\",\"rol_k\":\"\"}','2014-11-09 00:44:34'),
	(2,1,1,'UsuarioDAO','addUser','Cannot add or update a child row: a foreign key constraint fails (`escom`.`tb_usuarios`, CONSTRAINT `tb_usuarios_ibfk_4` FOREIGN KEY (`rol_k`) REFERENCES `cat_roles` (`rol_k`) ON DELETE SET NULL)','Ocurrió un error al agregar al usuario, favor de validar los datos ingresados','{\"contrasena\":\"da39a3ee5e6b4b0d3255bfef95601890afd80709\",\"nombre\":\"Melkor\",\"apellido_paterno\":\"\",\"apellido_materno\":\"\",\"curp\":\"\",\"edad\":\"2\",\"genero\":\"\",\"carrera_k\":\"1\",\"plan_k\":\"1\",\"periodo_ingreso\":\"\",\"semestre\":\"\",\"turno\":\"\",\"boleta\":\"\",\"correo\":\"\",\"usuario\":\"melkor\",\"rol_k\":\"\"}','2014-11-10 23:32:06'),
	(3,1,1,'Usuario','adduser','<p>The file you are attempting to upload is larger than the permitted size.</p>','<p>The file you are attempting to upload is larger than the permitted size.</p>','{\"contrasena\":\"da39a3ee5e6b4b0d3255bfef95601890afd80709\",\"nombre\":\"Melkor\",\"apellido_paterno\":\"Loyola\",\"apellido_materno\":\"\",\"curp\":\"\",\"edad\":\"1\",\"genero\":\"\",\"carrera_k\":\"1\",\"plan_k\":\"1\",\"periodo_ingreso\":\"\",\"semestre\":\"\",\"turno\":\"\",\"boleta\":\"\",\"correo\":\"\",\"usuario\":\"\",\"rol_k\":\"2\"}','2014-11-10 23:33:38'),
	(4,1,1,'UsuarioDAO','addUser','Duplicate entry \'0\' for key \'boleta\'','Ocurrió un error al agregar al usuario, favor de validar los datos ingresados','{\"contrasena\":\"f90937f7c78362d27054790764fd4ccb2d2209b2\",\"nombre\":\"Geisha\",\"apellido_paterno\":\"\",\"apellido_materno\":\"\",\"curp\":\"\",\"edad\":\"\",\"genero\":\"1\",\"carrera_k\":\"\",\"plan_k\":\"\",\"periodo_ingreso\":\"\",\"semestre\":\"\",\"turno\":\"\",\"boleta\":\"\",\"correo\":\"geisha@ipn.mx\",\"usuario\":\"geisha\",\"rol_k\":\"2\"}','2014-11-10 23:52:08'),
	(5,1,1,'UsuarioDAO','addUser','Unknown column \'boleta\' in \'field list\'','Ocurrió un error al agregar al usuario, favor de validar los datos ingresados','{\"contrasena\":\"f90937f7c78362d27054790764fd4ccb2d2209b2\",\"nombre\":\"Geisha\",\"apellido_paterno\":\"\",\"apellido_materno\":\"\",\"curp\":\"\",\"edad\":\"\",\"genero\":\"1\",\"carrera_k\":\"\",\"plan_k\":\"\",\"periodo_ingreso\":\"\",\"semestre\":\"\",\"turno\":\"\",\"boleta\":\"\",\"correo\":\"geisha@ipn.mx\",\"usuario\":\"geisha\",\"rol_k\":\"2\"}','2014-11-10 23:54:02'),
	(6,1,1,'UsuarioDAO','addUser','Duplicate entry \'rodrigo\' for key \'usuario\'','Ocurrió un error al agregar al usuario, favor de validar los datos ingresados','{\"contrasena\":\"15ebf1f2fe0adce6fd6527ddfad05482d05b3668\",\"nombre\":\"Rodrigo\",\"apellido_paterno\":\"Loyola\",\"apellido_materno\":\"Jaramillo\",\"curp\":\"LOJR870826H91\",\"edad\":\"26\",\"genero\":\"0\",\"carrera_k\":\"1\",\"plan_k\":\"1\",\"periodo_ingreso\":\"20061\",\"semestre\":\"8\",\"turno\":\"0\",\"boleta\":\"2006630166\",\"correo\":\"rodrigo.loyola@live.com\",\"usuario\":\"rodrigo\",\"rol_k\":\"2\",\"foto\":\"uploads\\/users\\/Captura_de_pantalla_2014-08-26_00.06_.41_.png\"}','2014-11-11 00:01:40'),
	(7,1,1,'UsuarioDAO','addUser','Duplicate entry \'rodrigo\' for key \'usuario\'','Ocurrió un error al agregar al usuario, favor de validar los datos ingresados','{\"contrasena\":\"86f7e437faa5a7fce15d1ddcb9eaeaea377667b8\",\"nombre\":\"Rodrigo\",\"apellido_paterno\":\"Loyola\",\"apellido_materno\":\"Jaramillo\",\"curp\":\"LOJR870826H91\",\"edad\":\"26\",\"genero\":\"0\",\"carrera_k\":\"1\",\"plan_k\":\"1\",\"periodo_ingreso\":\"20061\",\"semestre\":\"8\",\"turno\":\"0\",\"boleta\":\"2006630166\",\"correo\":\"rodrigo.loyola@live.com\",\"usuario\":\"rodrigo\",\"rol_k\":\"2\"}','2014-11-11 00:07:56'),
	(8,1,1,'UsuarioDAO','addUser','Duplicate entry \'rodrigo\' for key \'usuario\'','Ocurrió un error al agregar al usuario, favor de validar los datos ingresados','{\"contrasena\":\"86f7e437faa5a7fce15d1ddcb9eaeaea377667b8\",\"nombre\":\"Rodrigo\",\"apellido_paterno\":\"Loyola\",\"apellido_materno\":\"Jaramillo\",\"curp\":\"LOJR870826H91\",\"edad\":\"26\",\"genero\":\"0\",\"carrera_k\":\"1\",\"plan_k\":\"1\",\"periodo_ingreso\":\"20061\",\"semestre\":\"8\",\"turno\":\"0\",\"boleta\":\"2006630166\",\"correo\":\"rodrigo.loyola@live.com\",\"usuario\":\"rodrigo\",\"rol_k\":\"1\"}','2014-11-11 00:11:47'),
	(9,1,1,'UsuarioDAO','addUser','Duplicate entry \'rodrigo\' for key \'usuario\'','Ocurrió un error al agregar al usuario, favor de validar los datos ingresados','{\"contrasena\":\"86f7e437faa5a7fce15d1ddcb9eaeaea377667b8\",\"nombre\":\"Rodrigo\",\"apellido_paterno\":\"Loyola\",\"apellido_materno\":\"Jaramillo\",\"curp\":\"LOJR870826H91\",\"edad\":\"26\",\"genero\":\"0\",\"carrera_k\":\"1\",\"plan_k\":\"1\",\"periodo_ingreso\":\"20061\",\"semestre\":\"8\",\"turno\":\"0\",\"boleta\":\"2006630166\",\"correo\":\"rodrigo.loyola@live.com\",\"usuario\":\"rodrigo\",\"rol_k\":\"1\"}','2014-11-11 00:12:15'),
	(10,1,1,'UsuarioDAO','addUser','Duplicate entry \'rodrigo\' for key \'usuario\'','Ocurrió un error al agregar al usuario, favor de validar los datos ingresados','{\"contrasena\":\"86f7e437faa5a7fce15d1ddcb9eaeaea377667b8\",\"nombre\":\"Rodrigo\",\"apellido_paterno\":\"Loyola\",\"apellido_materno\":\"Jaramillo\",\"curp\":\"LOJR870826H91\",\"edad\":\"26\",\"genero\":\"0\",\"carrera_k\":\"1\",\"plan_k\":\"1\",\"periodo_ingreso\":\"20061\",\"semestre\":\"8\",\"turno\":\"0\",\"boleta\":\"2006630166\",\"correo\":\"rodrigo.loyola@live.com\",\"usuario\":\"rodrigo\",\"rol_k\":\"1\"}','2014-11-11 00:12:31'),
	(11,1,1,'UsuarioDAO','addUser','Duplicate entry \'rodrigo\' for key \'usuario\'','Ocurrió un error al agregar al usuario, favor de validar los datos ingresados','{\"contrasena\":\"86f7e437faa5a7fce15d1ddcb9eaeaea377667b8\",\"nombre\":\"Rodrigo\",\"apellido_paterno\":\"Loyola\",\"apellido_materno\":\"Jaramillo\",\"curp\":\"LOJR870826H91\",\"edad\":\"26\",\"genero\":\"0\",\"carrera_k\":\"1\",\"plan_k\":\"1\",\"periodo_ingreso\":\"20061\",\"semestre\":\"8\",\"turno\":\"0\",\"boleta\":\"2006630166\",\"correo\":\"rodrigo.loyola@live.com\",\"usuario\":\"rodrigo\",\"rol_k\":\"1\"}','2014-11-11 00:12:53'),
	(12,1,1,'UsuarioDAO','addUser','Duplicate entry \'yaya_07109@hotmail.com\' for key \'correo\'','Ocurrió un error al agregar al usuario, favor de validar los datos ingresados','{\"contrasena\":\"7eb697d52cb3f8465c6110ad155a857c36bd985a\",\"nombre\":\"Yajaira Thal\\u00eda\",\"apellido_paterno\":\"Vega\",\"apellido_materno\":\"Mendoza\",\"curp\":\"VEMY880710MGSGYJ00\",\"edad\":\"26\",\"genero\":\"1\",\"carrera_k\":\"1\",\"plan_k\":\"1\",\"periodo_ingreso\":\"20101\",\"semestre\":\"3\",\"turno\":\"0\",\"boleta\":\"2010630001\",\"correo\":\"yaya_07109@hotmail.com\",\"usuario\":\"yayavegam2\",\"rol_k\":\"2\"}','2014-11-11 22:32:52'),
	(13,1,1,'Usuario','adduser','<p>The file you are attempting to upload is larger than the permitted size.</p>','<p>The file you are attempting to upload is larger than the permitted size.</p>','{\"contrasena\":\"f10e2821bbbea527ea02200352313bc059445190\",\"nombre\":\"asd\",\"apellido_paterno\":\"asd\",\"apellido_materno\":\"sad\",\"curp\":\"asd\",\"edad\":\"1\",\"genero\":\"0\",\"carrera_k\":\"1\",\"plan_k\":\"1\",\"periodo_ingreso\":\"1\",\"semestre\":\"1\",\"turno\":\"0\",\"boleta\":\"1232131\",\"correo\":\"a@a.com\",\"usuario\":\"asd\",\"rol_k\":\"2\"}','2014-11-11 23:05:30'),
	(14,1,1,'UsuarioDAO','addUser','Duplicate entry \'1\' for key \'PRIMARY\'','Ocurrió un error al agregar al usuario, favor de validar los datos ingresados','{\"contrasena\":\"40bd001563085fc35165329ea1ff5c5ecbdbbeef\",\"nombre\":\"asdsad\",\"apellido_paterno\":\"sadasd\",\"apellido_materno\":\"asdsad\",\"curp\":\"asdsad\",\"edad\":\"1\",\"genero\":\"0\",\"carrera_k\":\"1\",\"plan_k\":\"1\",\"periodo_ingreso\":\"1\",\"semestre\":\"1\",\"turno\":\"0\",\"boleta\":\"123213213\",\"correo\":\"a@ao.com\",\"usuario\":\"123\",\"rol_k\":\"2\",\"usuario_k\":\"1\",\"foto\":\"uploads\\/users\\/Captura_de_pantalla_2014-08-26_00.06_.41_.png\"}','2014-11-11 23:08:20'),
	(15,1,1,'Usuario','adduser','<p>The file you are attempting to upload is larger than the permitted size.</p>','<p>The file you are attempting to upload is larger than the permitted size.</p>','{\"contrasena\":\"356a192b7913b04c54574d18c28d46e6395428ab\",\"nombre\":\"a\",\"apellido_paterno\":\"\",\"apellido_materno\":\"\",\"curp\":\"\",\"edad\":\"\",\"genero\":\"0\",\"carrera_k\":\"\",\"plan_k\":\"\",\"periodo_ingreso\":\"\",\"semestre\":\"\",\"turno\":\"\",\"boleta\":\"\",\"correo\":\"c@c.com\",\"usuario\":\"c\",\"rol_k\":\"2\",\"usuario_creacion_k\":\"1\"}','2014-11-14 00:06:40'),
	(16,1,1,'Usuario','adduser','<p>The file you are attempting to upload is larger than the permitted size.</p>','<p>The file you are attempting to upload is larger than the permitted size.</p>','{\"contrasena\":\"356a192b7913b04c54574d18c28d46e6395428ab\",\"nombre\":\"a\",\"apellido_paterno\":\"\",\"apellido_materno\":\"\",\"curp\":\"\",\"edad\":\"\",\"genero\":\"0\",\"carrera_k\":\"\",\"plan_k\":\"\",\"periodo_ingreso\":\"\",\"semestre\":\"\",\"turno\":\"\",\"boleta\":\"\",\"correo\":\"d@d.com\",\"usuario\":\"d\",\"rol_k\":\"2\",\"usuario_creacion_k\":\"1\"}','2014-11-14 00:11:02'),
	(17,1,1,'Usuario','adduser','<p>The file you are attempting to upload is larger than the permitted size.</p>','<p>The file you are attempting to upload is larger than the permitted size.</p>','{\"contrasena\":\"356a192b7913b04c54574d18c28d46e6395428ab\",\"nombre\":\"e\",\"apellido_paterno\":\"\",\"apellido_materno\":\"\",\"curp\":\"\",\"edad\":\"\",\"genero\":\"0\",\"carrera_k\":\"\",\"plan_k\":\"\",\"periodo_ingreso\":\"\",\"semestre\":\"\",\"turno\":\"\",\"boleta\":\"\",\"correo\":\"e@e.com\",\"usuario\":\"e\",\"rol_k\":\"2\",\"usuario_creacion_k\":\"1\"}','2014-11-14 00:15:02'),
	(18,1,1,'Usuario','adduser','<p>The file you are attempting to upload is larger than the permitted size.</p>','<p>The file you are attempting to upload is larger than the permitted size.</p>','{\"contrasena\":\"356a192b7913b04c54574d18c28d46e6395428ab\",\"nombre\":\"e\",\"apellido_paterno\":\"\",\"apellido_materno\":\"\",\"curp\":\"\",\"edad\":\"\",\"genero\":\"0\",\"carrera_k\":\"\",\"plan_k\":\"\",\"periodo_ingreso\":\"\",\"semestre\":\"\",\"turno\":\"\",\"boleta\":\"\",\"correo\":\"e@e.com\",\"usuario\":\"e\",\"rol_k\":\"2\",\"usuario_creacion_k\":\"1\"}','2014-11-14 00:15:07'),
	(19,1,1,'Usuario','adduser','<p>The file you are attempting to upload is larger than the permitted size.</p>','<p>The file you are attempting to upload is larger than the permitted size.</p>','{\"contrasena\":\"7c222fb2927d828af22f592134e8932480637c0d\",\"nombre\":\"Renata\",\"apellido_paterno\":\"Loyola\",\"apellido_materno\":\"Vega\",\"curp\":\"LOVR160826MMCYGN00\",\"edad\":\"5\",\"genero\":\"1\",\"carrera_k\":\"\",\"plan_k\":\"\",\"periodo_ingreso\":\"\",\"semestre\":\"\",\"turno\":\"\",\"boleta\":\"\",\"correo\":\"renata@bucketdev.com\",\"usuario\":\"renata\",\"rol_k\":\"2\",\"usuario_creacion_k\":\"1\"}','2014-11-30 18:39:58');

/*!40000 ALTER TABLE `tb_bitacora_errores` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_historial_seguimientos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_historial_seguimientos`;

CREATE TABLE `tb_historial_seguimientos` (
  `historial_seguimiento_k` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'identificador de la tabla del historial de seguimiento de las solicitudes',
  `seguimiento_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador de la tabla de seguimiento de las solicitudes',
  `estatus_anterior_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del catálogo de estatus, del que se cambió',
  `estatus_actual_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del catálogo de estatus, al que se cambió',
  `usuario_modificacion_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del catálogo de usuarios, persona que hizo el cambio de estatus',
  `timestamp_modificacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'timestamp en la que se modificó el estatus del seguimiento de la solicitud',
  PRIMARY KEY (`historial_seguimiento_k`),
  KEY `seguimiento_k` (`seguimiento_k`),
  KEY `estatus_anterior_k` (`estatus_anterior_k`),
  KEY `estatus_actual_k` (`estatus_actual_k`),
  KEY `usuario_modificacion_k` (`usuario_modificacion_k`),
  CONSTRAINT `tb_historial_seguimientos_ibfk_1` FOREIGN KEY (`seguimiento_k`) REFERENCES `tb_seguimientos` (`seguimiento_k`) ON DELETE SET NULL,
  CONSTRAINT `tb_historial_seguimientos_ibfk_2` FOREIGN KEY (`estatus_anterior_k`) REFERENCES `cat_estatus` (`estatus_k`) ON DELETE SET NULL,
  CONSTRAINT `tb_historial_seguimientos_ibfk_3` FOREIGN KEY (`estatus_actual_k`) REFERENCES `cat_estatus` (`estatus_k`) ON DELETE SET NULL,
  CONSTRAINT `tb_historial_seguimientos_ibfk_4` FOREIGN KEY (`usuario_modificacion_k`) REFERENCES `tb_usuarios` (`usuario_k`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tb_historial_seguimientos` WRITE;
/*!40000 ALTER TABLE `tb_historial_seguimientos` DISABLE KEYS */;

INSERT INTO `tb_historial_seguimientos` (`historial_seguimiento_k`, `seguimiento_k`, `estatus_anterior_k`, `estatus_actual_k`, `usuario_modificacion_k`, `timestamp_modificacion`)
VALUES
	(1,1,1,2,1,'2014-02-05 23:45:58'),
	(2,2,1,2,1,'2014-02-09 14:43:54'),
	(3,2,2,3,1,'2014-02-23 02:56:17');

/*!40000 ALTER TABLE `tb_historial_seguimientos` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_roles_acciones
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_roles_acciones`;

CREATE TABLE `tb_roles_acciones` (
  `rol_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del catálogo de roles',
  `submodulo_accion_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del catálogo de acciones con submódulos',
  `timestamp_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'timestamp de creación del registro',
  `usuario_creacion_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del usuario que agregó el registro',
  `activo` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'bandera booleana de activación',
  UNIQUE KEY `rol_k` (`rol_k`,`submodulo_accion_k`),
  KEY `submodulo_accion_k` (`submodulo_accion_k`),
  KEY `usuario_creacion_k` (`usuario_creacion_k`),
  CONSTRAINT `tb_roles_acciones_ibfk_1` FOREIGN KEY (`rol_k`) REFERENCES `cat_roles` (`rol_k`) ON DELETE SET NULL,
  CONSTRAINT `tb_roles_acciones_ibfk_2` FOREIGN KEY (`submodulo_accion_k`) REFERENCES `cat_submodulos_acciones` (`submodulo_accion_k`) ON DELETE SET NULL,
  CONSTRAINT `tb_roles_acciones_ibfk_3` FOREIGN KEY (`usuario_creacion_k`) REFERENCES `tb_usuarios` (`usuario_k`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tb_roles_acciones` WRITE;
/*!40000 ALTER TABLE `tb_roles_acciones` DISABLE KEYS */;

INSERT INTO `tb_roles_acciones` (`rol_k`, `submodulo_accion_k`, `timestamp_creacion`, `usuario_creacion_k`, `activo`)
VALUES
	(1,1,'2014-02-04 13:51:37',1,1),
	(1,2,'2014-02-04 13:51:37',1,1),
	(1,3,'2014-02-04 13:51:37',1,1),
	(1,4,'2014-02-04 13:51:37',1,1),
	(1,5,'2014-02-04 13:51:37',1,1),
	(1,6,'2014-02-04 13:51:37',1,1),
	(1,7,'2014-02-04 13:51:37',1,1),
	(1,8,'2014-02-04 13:51:37',1,1),
	(1,9,'2014-02-04 13:51:37',1,1),
	(1,10,'2014-02-04 22:31:42',1,1),
	(1,12,'2014-02-05 18:47:07',1,1),
	(1,13,'2014-11-08 16:58:21',1,1),
	(1,14,'2014-11-08 16:59:50',1,1),
	(1,15,'2014-11-08 17:00:56',1,1);

/*!40000 ALTER TABLE `tb_roles_acciones` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_seguimientos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_seguimientos`;

CREATE TABLE `tb_seguimientos` (
  `seguimiento_k` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'identificador de la tabla de seguimiento de las solicitudes',
  `documento_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador de la tabla de documentos',
  `usuario_creacion_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador de la tabla de usuarios, persona que realizo la solicitud',
  `timestamp_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'timestamp de creación del registro',
  `estatus_k` int(11) unsigned DEFAULT '1' COMMENT 'identificador de la tabla de estatus',
  `usuario_responsable_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador de la tabla de usuarios, persona responsable del seguimiento de la solicitud',
  `timestamp_asignacion` timestamp NULL DEFAULT NULL COMMENT 'timestamp en la que se asigno al responsable',
  `activo` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'bandera booleana de activación',
  PRIMARY KEY (`seguimiento_k`),
  KEY `documento_k` (`documento_k`),
  KEY `usuario_creacion_k` (`usuario_creacion_k`),
  KEY `estatus_k` (`estatus_k`),
  KEY `usuario_responsable_k` (`usuario_responsable_k`),
  CONSTRAINT `tb_seguimientos_ibfk_1` FOREIGN KEY (`documento_k`) REFERENCES `cat_documentos` (`documento_k`) ON DELETE SET NULL,
  CONSTRAINT `tb_seguimientos_ibfk_2` FOREIGN KEY (`usuario_creacion_k`) REFERENCES `tb_usuarios` (`usuario_k`) ON DELETE SET NULL,
  CONSTRAINT `tb_seguimientos_ibfk_3` FOREIGN KEY (`estatus_k`) REFERENCES `cat_estatus` (`estatus_k`) ON DELETE SET NULL,
  CONSTRAINT `tb_seguimientos_ibfk_4` FOREIGN KEY (`usuario_responsable_k`) REFERENCES `tb_usuarios` (`usuario_k`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tb_seguimientos` WRITE;
/*!40000 ALTER TABLE `tb_seguimientos` DISABLE KEYS */;

INSERT INTO `tb_seguimientos` (`seguimiento_k`, `documento_k`, `usuario_creacion_k`, `timestamp_creacion`, `estatus_k`, `usuario_responsable_k`, `timestamp_asignacion`, `activo`)
VALUES
	(1,1,1,'2014-02-05 22:29:45',2,1,'2014-02-05 23:45:11',1),
	(2,2,1,'2014-02-09 14:42:33',3,1,'2014-02-09 14:43:24',1);

/*!40000 ALTER TABLE `tb_seguimientos` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_usuarios
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_usuarios`;

CREATE TABLE `tb_usuarios` (
  `usuario_k` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'identificador del catálogo de usuarios',
  `rol_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del catálogo de roles',
  `usuario` varchar(50) NOT NULL DEFAULT '' COMMENT 'valor de acceso a la plataforma',
  `contrasena` varchar(50) NOT NULL COMMENT 'valor de acceso a la plataforma',
  `nombre` varchar(100) DEFAULT NULL COMMENT 'nombre del usuario de la plataforma',
  `apellido_paterno` varchar(100) DEFAULT NULL COMMENT 'apellido paterno del usuario de la plataforma',
  `apellido_materno` varchar(100) DEFAULT NULL COMMENT 'apellido materno del usuario de la plataforma',
  `foto` varchar(200) DEFAULT NULL COMMENT 'ruta de la imagen para la foto del colaborador',
  `curp` varchar(50) DEFAULT NULL COMMENT 'curp del usuario de la plataforma',
  `genero` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'género del usuario de la plataforma, 0-masculino, 1-femenino',
  `edad` int(11) DEFAULT NULL COMMENT 'edad del usuario de la plataforma',
  `correo` varchar(100) NOT NULL COMMENT 'correo electrónico del usaurio de la plataforma',
  `carrera_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del catálogo de carreras',
  `boleta` int(11) unsigned DEFAULT NULL COMMENT 'número de boleta que identifica a un alumno dentro del plantel',
  `plan_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del catálogo de planes',
  `periodo_ingreso` varchar(50) DEFAULT NULL COMMENT 'clave de ingreso al plantel',
  `semestre` int(11) DEFAULT NULL COMMENT 'semestre en el que está actualmente inscrito el alumno del plantel',
  `turno` tinyint(1) DEFAULT NULL COMMENT 'valor que indica el turno inscrito, 0-matutino, 1-vespertino',
  `timestamp_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'timestamp de creación del registro',
  `usuario_creacion_k` int(11) unsigned DEFAULT NULL COMMENT 'identificador del usuario que agregó el registro',
  `activo` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'bandera booleana de activación',
  PRIMARY KEY (`usuario_k`),
  UNIQUE KEY `usuario` (`usuario`),
  UNIQUE KEY `correo` (`correo`),
  KEY `usuario_creacion_k` (`usuario_creacion_k`),
  KEY `carrera_k` (`carrera_k`),
  KEY `plan_k` (`plan_k`),
  KEY `index_usuario` (`usuario`),
  KEY `rol_k` (`rol_k`),
  CONSTRAINT `tb_usuarios_ibfk_1` FOREIGN KEY (`usuario_creacion_k`) REFERENCES `tb_usuarios` (`usuario_k`) ON DELETE SET NULL,
  CONSTRAINT `tb_usuarios_ibfk_4` FOREIGN KEY (`rol_k`) REFERENCES `cat_roles` (`rol_k`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tb_usuarios` WRITE;
/*!40000 ALTER TABLE `tb_usuarios` DISABLE KEYS */;

INSERT INTO `tb_usuarios` (`usuario_k`, `rol_k`, `usuario`, `contrasena`, `nombre`, `apellido_paterno`, `apellido_materno`, `foto`, `curp`, `genero`, `edad`, `correo`, `carrera_k`, `boleta`, `plan_k`, `periodo_ingreso`, `semestre`, `turno`, `timestamp_creacion`, `usuario_creacion_k`, `activo`)
VALUES
	(1,1,'rodrigo','15ebf1f2fe0adce6fd6527ddfad05482d05b3668','Rodrigo','Loyola','Jaramillo',NULL,'LOJR870826H91',0,26,'rodrigo.loyola@live.com',1,2006630166,1,'20061',8,0,'2014-01-23 18:28:40',NULL,1),
	(2,2,'yaya','356a192b7913b04c54574d18c28d46e6395428ab','Yajaira','Vega','Mendoza',NULL,'',1,0,'a@a.com',0,0,0,'',NULL,0,'2014-11-13 23:53:08',1,1),
	(3,2,'e','356a192b7913b04c54574d18c28d46e6395428ab','Bruno','Loyola','Vega','uploads/users/Captura_de_pantalla_2014-08-26_00.06_.41_.png','',0,0,'e@e.com',0,0,0,'',NULL,0,'2014-11-14 00:15:17',1,1),
	(4,2,'renata','7c222fb2927d828af22f592134e8932480637c0d','Renata','Loyola','Vega','uploads/users/Captura_de_pantalla_2014-08-27_00.05_.28_.png','LOVR160826MMCYGN00',1,5,'renata@bucketdev.com',NULL,NULL,NULL,NULL,NULL,NULL,'2014-11-30 18:40:13',1,1);

/*!40000 ALTER TABLE `tb_usuarios` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
