
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456789';

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789';
FLUSH PRIVILEGES;




CREATE SCHEMA `db_persist` ;

CREATE TABLE `db_persist`.`contadorpdf` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Detalle` VARCHAR(500) NULL,
  `Cantidad` INT NULL,
  `Tipo` INT NULL,
  PRIMARY KEY (`Id`));
