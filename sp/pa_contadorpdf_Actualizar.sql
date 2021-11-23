USE `db_persist`;
DROP procedure IF EXISTS `pa_contadorpdf_Actualizar`;

DELIMITER $$
USE `db_persist`$$
CREATE DEFINER=`servici4`@`localhost` PROCEDURE `pa_contadorpdf_Actualizar`(IN `unDetalle` varchar(255),IN `unTipo` INT)
    MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN    
	declare CantidadActual int;
	select (ifnull(max(cantidad),0) + 1) into CantidadActual
    from contadorpdf
	where (tipo = unTipo);
 
    insert into contadorpdf (Detalle,Cantidad,Tipo) values (unDetalle,CantidadActual,unTipo);
    SELECT LAST_INSERT_ID() Id;  
END$$

DELIMITER ;


	


