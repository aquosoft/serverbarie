USE `db_persist`;
DROP procedure IF EXISTS `pa_contadorpdf_Leer`;

DELIMITER $$
USE `db_persist`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pa_contadorpdf_Leer`(IN `unTipo` INT)
    NO SQL
BEGIN
/*
	tipo 1 Farmacia
    tipo 2 Consulta
    tipo 3 practica
*/

  select ifnull(max(cantidad),0) CantidadActual from contadorpdf
  where (tipo = unTipo);
END$$

