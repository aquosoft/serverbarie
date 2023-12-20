CREATE SCHEMA `db_persist` ;

CREATE TABLE `db_persist`.`contadorpdf` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Detalle` VARCHAR(500) NULL,
  `Cantidad` INT NULL,
  `Tipo` INT NULL,
  PRIMARY KEY (`Id`));
