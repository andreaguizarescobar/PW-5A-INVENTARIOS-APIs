//Importar la clase de Servicios de Productos y Servicios.
// y librería estándar de manejo de errores técnicos.

import * as ProdServServices from '../services/prodServ.service.js';
import boom from '@hapi/boom';

// obtener todos los institutos (GET):
export const getProdServList = async (req, res, next) => {
    try {
      const prodServList = await ProdServServices.getProdServList();
      if (!prodServList) {
        throw boom.notFound('No se encontraron productos/servicios registrados.');
      } else {
        res.status(200).json(prodServList);
      }
    } catch (error) {
      next(error);
    }
  };


//---------------------------Metodos Instituto---------------------------

// Obtener instituto
export const getProdServItem = async (req, res, next) => {
    try {
      const { id } = req.params;
      const keyType = req.query.keyType || 'OK';
      const prodServItem = await ProdServServices.getProdServItem(id, keyType);
  
      if (!prodServItem) {
        throw boom.notFound('No se encontraron institutos registrados.');
      } else {
        res.status(200).json(prodServItem);
      }
    } catch (error) {
      next(error);
    }
  };
  
   //Agregar Instituto
   export const postProdServItem = async (req, res, next) => {
    try {
      const paProdServItem = req.body;
      const newProdServItem = await ProdServServices.postProdServItem(paProdServItem);
      if (!newProdServItem) {
        throw boom.badRequest('No se pudo crear el instituto.');
      } else if (newProdServItem) {
        res.status(201).json(newProdServItem);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  //Actualizar Instituto
  export const putProdServItem = async (req, res, next) => {
    try {
    const { id } = req.params;
    const paProdServItem = req.body;
    const updatedProdServItem = await ProdServServices.putProdServItem(id, paProdServItem );
    if (!updatedProdServItem) {
    throw boom.badRequest('No se pudo actualizar el instituto.');
    } else if (updatedProdServItem) {
    res.status(200).json(updatedProdServItem);
    }
    } catch (error) {
    next(error);
    }
    };

    //Eliminar Instituto
    export const deleteProdServItem = async (req, res, next) => {
      try {
        const { id } = req.params;
        const paProdServItem = req.body;
        const deletProdServItem = await ProdServServices.deleteProdServItem(id, paProdServItem);
        if (!deletProdServItem) {
          throw boom.badRequest('No se pudo borrar el instituto.');
        } else if (deletProdServItem) {
          res.status(200).json(deletProdServItem);
        }
      } catch (error) {
        console.log(error);
        next(error);
      }
    };


//-------------------------Metodos Negocio--------------------------------

// Obtener negocio
export const getNegocioItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const negocioItem = await ProdServServices.getNegocioItem(id);

    if (!negocioItem) {
      throw boom.notFound('No se encontraron negocios registrados.');
    } else {
      res.status(200).json(negocioItem);
    }
  } catch (error) {
    next(error);
  }
};

// Agregar Negocio
export const postNegocioItem = async (req, res, next) => {
  try {
    const paNegocioItem = req.body;
    const { id }=req.params;
    const newNegocioItem = await ProdServServices.postNegocioItem(id,paNegocioItem);
    if (!newNegocioItem) {
      throw boom.badRequest('No se pudo crear el negocio.');
    } else if (newNegocioItem) {
      res.status(201).json(newNegocioItem);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Actualizar Negocio
export const putNegocioItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const paNegocioItem = req.body;
    const updatedNegocioItem = await ProdServServices.putNegocioItem(id, paNegocioItem);
    if (!updatedNegocioItem) {
      throw boom.badRequest('No se pudo actualizar el negocio.');
    } else if (updatedNegocioItem) {
      res.status(200).json(updatedNegocioItem);
    }
  } catch (error) {
    next(error);
  }
};

// Eliminar Negocio
export const deleteNegocioItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const paNegocioItem = req.body;
    const deletedNegocioItem = await ProdServServices.deleteNegocioItem(id, paNegocioItem);
    if (!deletedNegocioItem) {
      throw boom.badRequest('No se pudo borrar el negocio.');
    } else if (deletedNegocioItem) {
      res.status(200).json(deletedNegocioItem);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};


//--------------------------------Metodos Almacen-----------------------

  // Obtener Almacén
export const getAlmacenItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const almacenItem = await ProdServServices.getAlmacenItem(id);

    if (!almacenItem) {
      throw boom.notFound('No se encontraron almacenes registrados.');
    } else {
      res.status(200).json(almacenItem);
    }
  } catch (error) {
    next(error);
  }
};

// Agregar Almacén
export const postAlmacenItem = async (req, res, next) => {
  try {
    const { id } = req.params; // Asegúrate de enviar el ID del negocio
    const paAlmacenItem = req.body;
    const newAlmacenItem = await ProdServServices.postAlmacenItem(id, paAlmacenItem);
    if (!newAlmacenItem) {
      throw boom.badRequest('No se pudo crear el almacén.');
    } else if (newAlmacenItem) {
      res.status(201).json(newAlmacenItem);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Actualizar Almacén
export const putAlmacenItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const paAlmacenItem = req.body;
    const updatedAlmacenItem = await ProdServServices.putAlmacenItem(id, paAlmacenItem);
    if (!updatedAlmacenItem) {
      throw boom.badRequest('No se pudo actualizar el almacén.');
    } else if (updatedAlmacenItem) {
      res.status(200).json(updatedAlmacenItem);
    }
  } catch (error) {
    next(error);
  }
};

// Eliminar Almacén
export const deleteAlmacenItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAlmacenItem = await ProdServServices.deleteAlmacenItem(id);
    if (!deletedAlmacenItem) {
      throw boom.badRequest('No se pudo borrar el almacén.');
    } else if (deletedAlmacenItem) {
      res.status(200).json(deletedAlmacenItem);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//---------------------Metodos Info Ad---------------------------------

// Obtener info_ad del Almacén
export const getInfoAdItem = async (req, res, next) => {
  try {
    const { idInfoAd } = req.params;
    const infoAdItem = await ProdServServices.getInfoAdItem(idInfoAd);

    if (!infoAdItem) {
      throw boom.notFound('No se encontró la información adicional del almacén.');
    } else {
      res.status(200).json(infoAdItem);
    }
  } catch (error) {
    next(error);
  }
};

// Agregar info_ad al Almacén
export const postInfoAdItem = async (req, res, next) => {
  try {
    const { idAlmacen } = req.params;
    const paInfoAdItem = req.body;
    const newInfoAdItem = await ProdServServices.postInfoAdItem(idAlmacen, paInfoAdItem);
    if (!newInfoAdItem) {
      throw boom.badRequest('No se pudo agregar la información adicional al almacén.');
    } else if (newInfoAdItem) {
      res.status(201).json(newInfoAdItem);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Actualizar info_ad del Almacén
export const putInfoAdItem = async (req, res, next) => {
  try {
    const { idInfoAd } = req.params;
    const { idAlmacen } = req.params;
    const paInfoAdItem = req.body;
    const updatedInfoAdItem = await ProdServServices.putInfoAdItem( idAlmacen, idInfoAd, paInfoAdItem);
    if (!updatedInfoAdItem) {
      throw boom.badRequest('No se pudo actualizar la información adicional del almacén.');
    } else if (updatedInfoAdItem) {
      res.status(200).json(updatedInfoAdItem);
    }
  } catch (error) {
    next(error);
  }
};

// Eliminar info_ad del Almacén
export const deleteInfoAdItem = async (req, res, next) => {
  try {
    const { idInfoAd } = req.params;
    const { idAlmacen } = req.params;
    const deletedInfoAdItem = await ProdServServices.deleteInfoAdItem(idAlmacen, idInfoAd);
    if (!deletedInfoAdItem) {
      throw boom.badRequest('No se pudo eliminar la información adicional del almacén.');
    } else if (deletedInfoAdItem) {
      res.status(200).json(deletedInfoAdItem);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};


//--------------------Metodos Movimientos------------------------------
// Obtener mvto del Almacén
export const getMvtoItem = async (req, res, next) => {
  try {
    const { idAlmacen } = req.params;
    const mvtoItem = await ProdServServices.getMvtoItem(idAlmacen);
    
      if (!mvtoItem) {
        throw boom.notFound('No se encontró el movimiento del almacén.');
      }else { 
          res.status(200).json(mvtoItem);
      }
    } catch (error) {
      next (error);
    }
  };

// Agregar mvto al Almacén
export const postMvtoItem = async (req, res, next) => {
  try {
    const { idAlmacen } = req.params;  // Obtenemos el id del almacen desde los parámetros
    const paMvtoItem = req.body;  // Obtenemos el movimiento desde el cuerpo de la solicitud

    // Llamamos al servicio que actualizará el movimiento
    const newMvtoItem = await 
    ProdServServices.postMvtoItem(idAlmacen, paMvtoItem);

    // Verificamos si la actualización fue exitosa
    if (!newMvtoItem) {
      throw boom.badRequest('No se pudo agregar el movimiento al almacén.');
    } else {
      // Si todo es correcto, respondemos con el nuevo documento actualizado
      res.status(201).json(newMvtoItem);
    }
  } catch (error) {
    console.log(error);  // Mostramos el error en consola
    next(error);  // Pasamos el error al siguiente middleware  
  }
};

// Actualizar mvto del Almacén
export const updateMovtoController = async (req, res) => {
  const { almacenId, movtoId } = req.params;
  const movtoData = req.body; // Datos del movimiento a actualizar

  try {
    const updatedMovto = await ProdServServices.updateMovto(movtoId, almacenId, movtoData);
    if (updatedMovto) {
          res.status(200).json(updatedMovto);
    } else {
          res.status(404).json({ message: 'Movimiento no encontrado' });
    }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Eliminar mvto del Almacén
export const deleteMovtoController = async (req, res) => {
  const { almacenId, movtoId } = req.params;
  try {
  const result = await ProdServServices.deleteMovto(movtoId, almacenId);
     res.status(200).json({ message: 'Movimiento eliminado correctamente', result });
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
};

//--------------------Metodos Series-----------------------------------

// Obtener serie del Almacén
export const getSerieItem = async (req, res, next) => {
  try {
    const { idAlmacen, idSerie } = req.params;
    const serieItem = await ProdServServices.getSerieItem(idAlmacen, idSerie);
    res.status(200).json(serieItem);
    if (!serieItem) {
      throw boom.notFound('No se encontró la serie del almacén.');
    } else {
      res.status(200).json(serieItem);
    }
  } catch (error) {
    next(error);
  }
};

// Agregar serie al Almacén
export const postSerieItem = async (req, res, next) => {
  try {
    const { idAlmacen } = req.params;
    const paSerieItem = req.body; 

    
    const newSerieItem = await ProdServServices.postSerieItem(idAlmacen, paSerieItem);

 
    if (!newSerieItem) {
      throw boom.notFound(`No se pudo agregar la serie. Almacén con ID ${idAlmacen} no encontrado.`);
    }

   
    res.status(201).json({
      message: 'Serie agregada exitosamente al almacén.',
      data: newSerieItem,
    });
  } catch (error) {
    
    console.error('Error in postSerieItem controller:', error.message);

    
    next(error);
  }
};

// Actualizar serie del Almacén
export const putSerieItem = async (req, res, next) => {
  try {
    const { idAlmacen, idSerie } = req.params;
    const paSerieItem = req.body;

    const updatedSerieItem = await ProdServServices.putSerieItem(idAlmacen, idSerie, paSerieItem);

    if (!updatedSerieItem) {
      throw boom.notFound('No se pudo encontrar o actualizar la serie en el almacén.');
    }

    res.status(200).json({
      message: 'Serie actualizada correctamente.',
      updatedSerieItem,
    });
  } catch (error) {
    console.error('Error in putSerieItem controller:', error.message);
    next(error);
  }
};

// Eliminar serie del Almacén
export const deleteSerieItem = async (req, res, next) => {
  try {
    const { idAlmacen, idSerie } = req.params;

    const updatedAlmacen = await ProdServServices.deleteSerieItem(idAlmacen, idSerie);

    if (!updatedAlmacen) {
      return res.status(404).json({ message: 'No se encontró el almacén o serie para eliminar.' });
    }

    res.status(200).json({
      message: 'Serie eliminada correctamente.',
      updatedAlmacen,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


//-------------------------Metodos estatus Fisico----------------------
// Obtener estatus físico de la serie en el almacén
export const getEstatusFisicoItem = async (req, res, next) => {
  try {
    const { idAlmacen, idSerie, idEstatusFisico } = req.params;
    const estatusFisicoItem = await ProdServServices.getEstatusFisicoItem(
      idAlmacen,
      idSerie,
      idEstatusFisico
    );

    if (!estatusFisicoItem) {
      return res
        .status(404)
        .json({ message: 'No se encontró el estatus físico de la serie en el almacén.' });
    }

    res.status(200).json(estatusFisicoItem);
  } catch (error) {
    next(error);
  }
};



// Agregar estatus físico a la serie en el almacén
export const postEstatusFisicoItem = async (req, res, next) => {
  try {
    const { idAlmacen, idSerie } = req.params;
    const paEstatusFisicoItem = req.body;

    // Validar que el cuerpo tenga las propiedades necesarias
    if (!paEstatusFisicoItem.IdTipoEstatusOK || !paEstatusFisicoItem.Actual) {
      return res.status(400).json({ message: 'Faltan campos obligatorios en el cuerpo de la solicitud.' });
    }

    const newEstatusFisicoItem = await ProdServServices.postEstatusFisicoItem(
      idAlmacen, idSerie, paEstatusFisicoItem
    );

    if (!newEstatusFisicoItem) {
      throw boom.badRequest('No se pudo agregar el estatus físico a la serie en el almacén.');
    }

    res.status(201).json(newEstatusFisicoItem);
  } catch (error) {
    console.error('Error en postEstatusFisicoItem:', error);
    next(error);
  }
};


// Actualizar estatus físico de la serie en el almacén
export const putEstatusFisicoItem = async (req, res, next) => {
  try {
    const { idAlmacen, idSerie, idEstatusFisico } = req.params;
    const paEstatusFisicoItem = req.body;

    if (!idAlmacen || !idSerie || !idEstatusFisico) {
      throw boom.badRequest('Parámetros requeridos faltantes.');
    }

    const updatedEstatusFisicoItem = await ProdServServices.putEstatusFisicoItem(
      idAlmacen, idSerie, idEstatusFisico, paEstatusFisicoItem
    );

    if (!updatedEstatusFisicoItem) {
      throw boom.notFound('No se encontró el almacén o la serie especificada.');
    }

    res.status(200).json(updatedEstatusFisicoItem);
  } catch (error) {
    next(error);
  }
};


// Eliminar estatus físico de la serie en el almacén
export const deleteEstatusFisicoItem = async (req, res, next) => {
  try {
    const { idAlmacen, idSerie, idEstatusFisico } = req.params;

    const deletedEstatusFisicoItem = await ProdServServices.deleteEstatusFisicoItem(
      idAlmacen,
      idSerie,
      idEstatusFisico
    );

    if (!deletedEstatusFisicoItem) {
      return res
        .status(404)
        .json({ message: 'No se pudo eliminar el estatus físico. Verifica los datos proporcionados.' });
    }

    res.status(200).json({
      message: 'Estatus físico eliminado correctamente.',
      data: deletedEstatusFisicoItem,
    });
  } catch (error) {
    next(error); // Usa el middleware de manejo de errores
  }
};

//-----------------------Metodos Estatus Venta--------------------------
// Obtener estatus de venta de la serie en el almacén
export const getEstatusVentaItem = async (req, res, next) => {
  try {
    const { idAlmacen, idSerie, idEstatusVenta } = req.params;
    const estatusVentaItem = await ProdServServices.getEstatusVentaItem(idAlmacen, idSerie, idEstatusVenta);

    if (!estatusVentaItem) {
      throw boom.notFound('No se encontró el estatus de venta de la serie en el almacén.');
    } else {
      res.status(200).json(estatusVentaItem);
    }
  } catch (error) {
    next(error);
  }
};

// Agregar estatus de venta a la serie en el almacén
export const postEstatusVentaItem = async (req, res, next) => {
  try {
    const { idAlmacen, idSerie } = req.params;
    const newEstatusVenta = req.body;

    console.log('Parámetros recibidos:', { idAlmacen, idSerie });
    console.log('Datos recibidos:', newEstatusVenta);

    const result = await ProdServServices.postEstatusVentaItem(idAlmacen, idSerie, newEstatusVenta);

    if (!result) {
      console.error('Error al insertar en la base de datos.');
      return res.status(400).json({ message: 'No se pudo agregar el estatus de venta.' });
    }

    res.status(201).json(result);
  } catch (error) {
    console.error('Error en postEstatusVentaItem:', error.message);
    next(error);
  }
};


// Actualizar estatus de venta de la serie en el almacén
export const putEstatusVentaItem = async (req, res, next) => {
  try {
    const { idAlmacen, idSerie, idEstatusVenta } = req.params;
    const updatedEstatusVenta = req.body;

    console.log('Parámetros:', { idAlmacen, idSerie, idEstatusVenta });
    console.log('Datos actualizados:', updatedEstatusVenta);

    const result = await ProdServServices.putEstatusVentaItem(
      idAlmacen,
      idSerie,
      idEstatusVenta,
      updatedEstatusVenta
    );

    if (!result) {
      console.error('No se encontró el estatus de venta para actualizar.');
      return res.status(404).json({ message: 'Estatus de venta no encontrado.' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error en putEstatusVentaItem:', error.message);
    next(error);
  }
};

// Eliminar estatus de venta de la serie en el almacén
export const deleteEstatusVentaItem = async (req, res, next) => {
  try {
    const { idAlmacen, idSerie, idEstatusVenta } = req.params;

    console.log('Parámetros:', { idAlmacen, idSerie, idEstatusVenta });

    const result = await ProdServServices.deleteEstatusVentaItem(
      idAlmacen,
      idSerie,
      idEstatusVenta
    );

    if (!result) {
      console.error('No se encontró el estatus de venta para eliminar.');
      return res.status(404).json({ message: 'Estatus de venta no encontrado.' });
    }

    res.status(200).json({ message: 'Estatus de venta eliminado correctamente', result });
  } catch (error) {
    console.error('Error en deleteEstatusVentaItem:', error.message);
    next(error);
  }
};

//-----------------------Metodos Ubicaciones-----------------------------
// Obtener ubicación de la serie en el almacén
export const getUbicacionItem = async (req, res, next) => {
  try {
    const { idAlmacen, idSerie, idUbicacion } = req.params;
    const ubicacionItem = await ProdServServices.getUbicacionItem(idAlmacen, idSerie, idUbicacion);

    if (!ubicacionItem) {
      throw boom.notFound('No se encontró la ubicación de la serie en el almacén.');
    } else {
      res.status(200).json(ubicacionItem);
    }
  } catch (error) {
    next(error);
  }
};

// Agregar ubicación a la serie en el almacén
export const postUbicacionItem = async (req, res, next) => {
  try {
    const { idAlmacen, idSerie } = req.params;
    const paUbicacionItem = req.body;
    const newUbicacionItem = await ProdServServices.postUbicacionItem(idAlmacen, idSerie, paUbicacionItem);
    if (!newUbicacionItem) {
      throw boom.badRequest('No se pudo agregar la ubicación a la serie en el almacén.');
    } else if (newUbicacionItem) {
      res.status(201).json(newUbicacionItem);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Actualizar ubicación de la serie en el almacén
export const putUbicacionItem = async (req, res, next) => {
  try {
    const { idAlmacen, idSerie, idUbicacion } = req.params;
    const paUbicacionItem = req.body;
    const updatedUbicacionItem = await ProdServServices.putUbicacionItem(idAlmacen, idSerie, idUbicacion, paUbicacionItem);
    if (!updatedUbicacionItem) {
      throw boom.badRequest('No se pudo actualizar la ubicación de la serie en el almacén.');
    } else if (updatedUbicacionItem) {
      res.status(200).json(updatedUbicacionItem);
    }
  } catch (error) {
    next(error);
  }
};

// Eliminar ubicación de la serie en el almacén
export const deleteUbicacionItem = async (req, res, next) => {
  try {
    const { idAlmacen, idSerie, idUbicacion } = req.params;
    const deletedUbicacionItem = await ProdServServices.deleteUbicacionItem(idAlmacen, idSerie, idUbicacion);
    if (!deletedUbicacionItem) {
      throw boom.badRequest('No se pudo eliminar la ubicación de la serie en el almacén.');
    } else if (deletedUbicacionItem) {
      res.status(200).json(deletedUbicacionItem);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};


// Obtener movimientos por almacén
export const getMovimientosByAlmacen = async (req, res, next) => {
  try {
    const { almacenId } = req.params;
    const movimientos = await ProdServServices.getMovimientosByAlmacen(almacenId);

    if (!movimientos || movimientos.length === 0) {
      throw boom.notFound('No se encontraron movimientos para el almacén especificado.');
    }

    res.status(200).json(movimientos);
  } catch (error) {
    next(error);
  }
};


  export default ProdServServices;