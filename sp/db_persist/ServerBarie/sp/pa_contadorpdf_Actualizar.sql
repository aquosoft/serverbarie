USE `db_persist`;
DROP procedure IF EXISTS `pa_contadorpdf_Actualizar`;

DELIMITER $$
USE `db_persist`$$
CREATE DEFINER=`servici4`@`localhost` PROCEDURE `pa_contadorpdf_Actualizar`(IN `unDetalle` varchar(255))
    MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN    
    insert into contadorpdf (Detalle) values (unDetalle);
    SELECT LAST_INSERT_ID() Id;  
END$$

DELIMITER ;

/*
call pa_contadorpdf_leer();
call pa_contadorpdf_Actualizar('un detalle');

*/

