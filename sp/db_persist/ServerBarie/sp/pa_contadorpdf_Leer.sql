USE `db_persist`;
DROP procedure IF EXISTS `pa_contadorpdf_Leer`;

DELIMITER $$
USE `db_persist`$$
CREATE DEFINER=`servici4`@`localhost` PROCEDURE `pa_contadorpdf_Leer`()
    NO SQL
BEGIN
  select ifnull(max(Id),0) CantidadActual from contadorpdf;
END$$

DELIMITER ;

