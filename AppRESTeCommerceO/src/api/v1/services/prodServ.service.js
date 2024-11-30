//Commerce
import ProdServ from '../models/ProdServ.js';
import boom from '@hapi/boom';

import mongoose from 'mongoose';

  // Obtener Todo
  export const getProdServList = async (keyType) => {
    let prodServList;
    
    try {
        // Validate keyType and construct the query dynamically
        let query = {};
        if (keyType === 'OK') {
            query = { IdProdServOK: { $exists: true } };  // Only return items with 'OK' key
        } else if (keyType === 'BK') {
            query = { IdProdServBK: { $exists: true } };  // Only return items with 'BK' key
        }
        
        // Fetch the list of products or services based on the query
        prodServList = await ProdServ.find(query);
        
        // If no items are found, throw a 404 error
        if (!prodServList || prodServList.length === 0) {
            throw boom.notFound('No products or services found');
        }

        return prodServList;
    } catch (error) {
        throw boom.internal(error);
    }


};


//---------------------------------------------Instituto----------------------------------------
// Obtener Instituto
export const getProdServItem = async (id, keyType) => {
    let prodServItem;
   
    try {
        prodServItem = await ProdServ.findOne({
          IdInstitutoOK: id,
        });
      return(prodServItem);
    } catch (error) {
      throw boom.internal(error);
    }
  };

//Agregar Instituto
export const postProdServItem = async (paProdServItem) => {
  try {
  const newProdServItem = new ProdServ(paProdServItem);
  return await newProdServItem.save();
  } catch (error) {
  throw error;
  }
};

//Actualizar Instituto
export const putProdServItem = async (id, paProdServItem) => {
  try {
  return await ProdServ.findOneAndUpdate({ IdInstitutoOK: id }, paProdServItem, {
  new: true,
  });
  } catch (error) {
  throw boom.badImplementation(error);
  }
};

//Eliminar Instituto
export const deleteProdServItem = async (id) => {
  try {
    return await ProdServ.findOneAndDelete({ IdInstitutoOK: id});
  } catch (error) {
  throw error;
  }
  };

//--------------------------------------------Negocios-----------------------------------------------------

// Obtener Negocio
export const getNegocioItem = async (id) => {
  let negocioItem;

  try {
      negocioItem = await ProdServ.findOne({
        'negocios.IdNegocioOK': id,
      }, {
        'negocios.$': 1 // Selecciona solo el negocio específico
      });

    return(negocioItem ? negocioItem.negocios[0] : null);
  } catch (error) {
    throw boom.internal(error);
  }
};

// Agregar Negocio
export const postNegocioItem = async (idInstituto, paNegocioItem) => {
  try {
    const updatedInstituto = await ProdServ.findOneAndUpdate(
      { IdInstitutoOK: idInstituto },
      { $push: { negocios: paNegocioItem } },
      { new: true }
    );
    return updatedInstituto;
  } catch (error) {
    throw error;
  }
};

// Actualizar Negocio
export const putNegocioItem = async (id, paNegocioItem) => {
  try {
    const updatedNegocioItem = await ProdServ.findOneAndUpdate(
      { 'negocios.IdNegocioOK': id },
      { $set: { 'negocios.$': paNegocioItem } },
      { new: true }
    );
    return updatedNegocioItem;
  } catch (error) {
    throw boom.badImplementation(error);
  }
};

// Eliminar Negocio
export const deleteNegocioItem = async (id) => {
  try {
    const updatedInstituto = await ProdServ.findOneAndUpdate(
      { 'negocios.IdNegocioOK': id },
      { $pull: { negocios: { IdNegocioOK: id } } },
      { new: true }
    );
    return updatedInstituto;
  } catch (error) {
    throw error;
  }
};


//-------------------------------------------Almacenes------------------------------------------------------
/*  //Get para un almacen
  export const getAlmacen = async (almacen, keyType) => {
    let prodServItem;
   
    try {
      if (keyType === 'OK') {
        prodServItem = await ProdServ.findOne({
          'negocios.almacenes.IdAlmacenOK': almacen,
        });
      } 
      const almacenInfo = prodServItem.negocios
      .flatMap(negocio => negocio.almacenes)
      .find(almacenObj => almacenObj.IdAlmacenOK === almacen);
      return(almacenInfo);
    } catch (error) {
      throw boom.internal(error);
    }
  };


  // Añadir Almacen
  export const postAlmacen = async (negocio, nuevoAlmacen) => {
    try {
      const prodServItem = await ProdServ.findOneAndUpdate(
        { 'negocios.IdNegocioOK': negocio },
        { $push: { 'negocios.$.almacenes': nuevoAlmacen } },
        { new: true }
      );
    return prodServItem;
    } catch (error) {
    throw error;
    }
  };
  */

  // Obtener Almacen
export const getAlmacenItem = async (id) => {
  let almacenItem;

  try {
      almacenItem = await ProdServ.findOne({
        'negocios.almacenes.IdAlmacenOK': id,
      });
      const almacenInfo = almacenItem.negocios
      .flatMap(negocio => negocio.almacenes)
      .find(almacenObj => almacenObj.IdAlmacenOK === id);
      return(almacenInfo);
  } catch (error) {
    throw boom.internal(error);
  }
};

// Agregar Almacen
export const postAlmacenItem = async (idNegocio, paAlmacenItem) => {
  try {
    const updatedNegocio = await ProdServ.findOneAndUpdate(
      { 'negocios.IdNegocioOK': idNegocio },
      { $push: { 'negocios.$.almacenes': paAlmacenItem } },
      { new: true }
    );
    return updatedNegocio;
  } catch (error) {
    throw error;
  }
};

// Actualizar Almacen
export const putAlmacenItem = async (id, paAlmacenItem) => {
  try {
    const updatedAlmacenItem = await ProdServ.findOneAndUpdate(
      { 'negocios.almacenes.IdAlmacenOK': id },
      { $set: { 'negocios.$[].almacenes.$[almacen]': paAlmacenItem } },
      { arrayFilters: [{ 'almacen.IdAlmacenOK': id }],
        new: true }
    );
    return updatedAlmacenItem;
  } catch (error) {
    throw boom.badImplementation(error);
  }
};

// Eliminar Almacen
export const deleteAlmacenItem = async (id) => {
  try {
    const updatedNegocio = await ProdServ.findOneAndUpdate(
      { 'negocios.almacenes.IdAlmacenOK': id },
      { $pull: { 'negocios.$.almacenes': { IdAlmacenOK: id } } },
      { new: true }
    );
    return updatedNegocio;
  } catch (error) {
    throw error;
  }
};


//-----------------------------------------Info Ad--------------------------------------------------------
// Obtener info_ad del Almacén
export const getInfoAdItem = async (idAlmacen, idInfoAd) => {
  try {
    const almacen = await ProdServ.findOne(
      { 'negocios.almacenes.IdAlmacenOK': idAlmacen },
      { 'negocios.almacenes.$': 1 } // Selecciona solo el almacén específico
    );
    if (!almacen) return null;

    const infoAdItem = almacen.negocios[0].almacenes[0].info_ad.find(info => info.IdEtiquetaOK === idInfoAd);
    return infoAdItem;
  } catch (error) {
    throw boom.internal(error);
  }
};

// Agregar info_ad al Almacén
export const postInfoAdItem = async (idAlmacen, paInfoAdItem) => {
  try {
    const updatedAlmacen = await ProdServ.findOneAndUpdate(
      { 'negocios.almacenes.IdAlmacenOK': idAlmacen },
      { $push: { 'negocios.$.almacenes.$[almacen].info_ad': paInfoAdItem } },
      { arrayFilters: [{ 'almacen.IdAlmacenOK': idAlmacen }],
        new: true }
    );
    return updatedAlmacen;
  } catch (error) {
    throw error;
  }
};

// Actualizar info_ad del Almacén
export const putInfoAdItem = async (idAlmacen, idInfoAd, paInfoAdItem) => {
  try {
    const updatedAlmacen = await ProdServ.findOneAndUpdate(
      { 'negocios.almacenes.IdAlmacenOK': idAlmacen },
      { $set: { [`negocios.$[].almacenes.$[almacen].info_ad.${idInfoAd}`]: paInfoAdItem } },
      {
        arrayFilters: [
          { 'almacen.IdAlmacenOK': idAlmacen },
        ],
        new: true
      }
    );
    return updatedAlmacen;
  } catch (error) {
    throw boom.badImplementation(error);
  }
};


// Eliminar info_ad del Almacén
export const deleteInfoAdItem = async (idAlmacen, idInfoAd) => {
  try {
    await ProdServ.findOneAndUpdate(
      { 'negocios.almacenes.IdAlmacenOK': idAlmacen },
      { $unset: { [`negocios.$[].almacenes.$[almacen].info_ad.${idInfoAd}`]: 1} },
      { arrayFilters: [
        { 'almacen.IdAlmacenOK': idAlmacen },
      ],
      new: true }
    );

    const updatedAlmacen = await ProdServ.findOneAndUpdate( 
      { 'negocios.almacenes.IdAlmacenOK': idAlmacen }, 
      { $pull: { 'negocios.$[].almacenes.$[almacen].info_ad': null } }, 
      { arrayFilters: [ { 'almacen.IdAlmacenOK': idAlmacen }, ], 
      new: true } 
    );
    return updatedAlmacen;
  } catch (error) {
    throw error;
  }
};



//----------------------------------------Movimientos-----------------------------------------------------
// // Obtener mvto del Almacén
export const getMvtoItem = async (idAlmacen) => {
  try {
  const almacen = await ProdServ.findOne(
       { 
 'negocios.almacenes.IdAlmacenOK': idAlmacen },
       { 
 'negocios.almacenes.$': 1 } // Selecciona solo el almacén específico
     );
  if (!almacen) return null;
  const almacenes = almacen.negocios[0]?.almacenes || [];
  const alm = almacenes.find(alm => alm.IdAlmacenOK === idAlmacen);
  const mvtoItem = alm.movtos || [];
  return mvtoItem;
   }catch (error) {
    throw boom.internal(error); 
   }
  };

// Agregar mvto al Almacén
export const postMvtoItem = async (idAlmacen, paMvtoItem) => {
  try {
  const updatedAlmacen = await ProdServ.findOneAndUpdate(
       { 
 'negocios.almacenes.IdAlmacenOK': idAlmacen }, // Filtro para encontrar el negocio y almacén
       {
  $push: {
  // Solo usamos un operador posicional para apuntar al subdocumento correcto en 'almacenes'
  'negocios.$.almacenes.$[almacen].movtos': paMvtoItem
         }
       },
       {
  new: true, // Para obtener el documento actualizado
  arrayFilters: [
           { 
 'almacen.IdAlmacenOK': idAlmacen } // Filtro que se aplica dentro del array de almacenes
         ]
       }
     );
  return updatedAlmacen; // Retornamos el almacén actualizado
   } 
 catch (error) {
  throw error; // Si hay un error, lo lanzamos
   }
  };
 
// Actualizar mvto del Almacén
export const updateMovto = async (movtoId, almacenId, movtoData) => {
  try {
    // Asegúrate de usar almacenId como un string
    const result = await ProdServ.findOneAndUpdate({ "negocios.almacenes.IdAlmacenOK": almacenId, 
    "negocios.almacenes.movtos._id": movtoId },
    
    {
      $set: {
          "negocios.$.almacenes.$[almacen].movtos.$[movto]": movtoData
      }
    },
 {
    arrayFilters: [
      { "almacen.IdAlmacenOK": almacenId },
      { "movto._id": movtoId }
 ],
    new: true // Devuelve el documento actualizado
    }
 );
    return result;
  } catch (error) {
     throw new Error('Error al actualizar el movimiento: ' + error.message);
  }
};

 // Eliminar un movimiento
export const deleteMovto = async (movtoId, almacenId) => {
  try {
    // Realizamos la operación de $pull para eliminar el movimiento en el almacén específico
    const result = await ProdServ.findOneAndUpdate(
        { "negocios.almacenes.IdAlmacenOK": almacenId },  // Buscamos el almacén por su ID
        { 
          $pull: {
            "negocios.$.almacenes.$[almacen].movtos": { _id: movtoId }  // Eliminar el movimiento por ID
          }
        },
      {
        arrayFilters: [
          { "almacen.IdAlmacenOK": almacenId }  // Filtro para el almacén
        ],
          new: true  // Devuelve el documento actualizado
      }
    );
    if (!result) {
      throw new Error('No se encontró el almacén o movimiento para eliminar');
    }
    return result;
  } catch (error) {
    throw new Error('Error al eliminar el movimiento: ' + error.message);
  }
}; 

//----------------------------------------Series----------------------------------------------------------
// Obtener serie del Almacén
export const getSerieItem = async (idAlmacen, idSerie) => {
  try {
    const almacen = await ProdServ.findOne(
      { 'negocios.almacenes.IdAlmacenOK': idAlmacen },
      { 'negocios.almacenes.$': 1 } // Selecciona solo el almacén específico
    );
    if (!almacen) return null;

    const serieItem = almacen.negocios[0].almacenes[0].series.find(serie => serie.Serie === idSerie);
    return serieItem;
  } catch (error) {
    throw boom.internal(error);
  }
};

export const postSerieItem = async (idAlmacen, paSerieItem) => {
  try {
 
    if (!idAlmacen || !paSerieItem || typeof paSerieItem !== 'object') {
      throw new Error('Parámetros inválidos: se requiere un ID de almacén y un objeto de serie válido.');
    }

    const updatedAlmacen = await ProdServ.findOneAndUpdate(
      {
        'negocios.almacenes.IdAlmacenOK': idAlmacen,
      },
      {
        $push: { 'negocios.$[neg].almacenes.$[alm].series': paSerieItem }, 
      },
      {
        arrayFilters: [
          { 'neg.almacenes': { $exists: true } }, 
          { 'alm.IdAlmacenOK': idAlmacen }, 
        ],
        new: true, 
      }
    );

    
    if (!updatedAlmacen) {
      throw new Error(`No se encontró el almacén con ID: ${idAlmacen}, o no se pudo actualizar.`);
    }

    
    const updatedSeries = updatedAlmacen.negocios
      .flatMap((neg) => neg.almacenes)
      .find((alm) => alm.IdAlmacenOK === idAlmacen)?.series;

    return {
      message: 'Serie agregada exitosamente.',
      series: updatedSeries,
    };
  } catch (error) {
   
    console.error(
      `Error in postSerieItem service: ${error.message} (Almacén ID: ${idAlmacen}, Serie: ${JSON.stringify(
        paSerieItem
      )})`
    );

    
    throw error;
  }
};

// Actualizar serie del Almacén
export const putSerieItem = async (idAlmacen, idSerie, paSerieItem) => {
  try {
    const updatedAlmacen = await ProdServ.findOneAndUpdate(
      {
        'negocios.almacenes.IdAlmacenOK': idAlmacen, 
        'negocios.almacenes.series.Serie': idSerie, 
      },
      {
        $set: { 'negocios.$[neg].almacenes.$[almacen].series.$[serie]': paSerieItem },
      },
      {
        arrayFilters: [
          { 'neg.almacenes': { $exists: true } }, 
          { 'almacen.IdAlmacenOK': idAlmacen }, 
          { 'serie.Serie': idSerie }, 
        ],
        new: true, 
      }
    );

    if (!updatedAlmacen) {
      throw new Error(`No se encontró o actualizó la serie con ID: ${idSerie} en el almacén: ${idAlmacen}`);
    }

    return updatedAlmacen;
  } catch (error) {
    console.error('Error in putSerieItem service:', error.message);
    throw error;
  }
};

// Eliminar serie del Almacén
export const deleteSerieItem = async (idAlmacen, idSerie) => {
  try {
    const updatedAlmacen = await ProdServ.findOneAndUpdate(
      {
        'negocios.almacenes.IdAlmacenOK': idAlmacen,
      },
      {
        $pull: {
          'negocios.$[neg].almacenes.$[alm].series': { Serie: idSerie },
        },
      },
      {
        arrayFilters: [
          { 'neg.almacenes': { $exists: true } }, // Match businesses with almacenes
          { 'alm.IdAlmacenOK': idAlmacen },      // Match the specific almacen
        ],
        new: true, // Return the updated document
      }
    );

    if (!updatedAlmacen) {
      throw new Error(`No se pudo encontrar o actualizar el almacén con ID: ${idAlmacen}`);
    }

    return updatedAlmacen;
  } catch (error) {
    console.error('Error in deleteSerieItem service:', error.message);
    throw error;
  }
};

  

//---------------------------------------------Estatus Fisico----------------------------------------------
// Obtener estatus físico de la serie en el almacén
export const getEstatusFisicoItem = async (idAlmacen, idSerie, idEstatusFisico) => {
  try {
    // Buscar el documento que contiene el almacén y la serie
    const documento = await ProdServ.findOne(
      {
        'negocios.almacenes.IdAlmacenOK': idAlmacen,
        'negocios.almacenes.series.Serie': idSerie,
      },
      {
        'negocios.$': 1, // Proyección para traer solo el negocio relevante
      }
    );

    if (!documento) {
      return null;
    }

    // Encontrar el negocio relevante
    const negocio = documento.negocios.find((n) =>
      n.almacenes.some((a) => a.IdAlmacenOK === idAlmacen)
    );

    if (!negocio) {
      return null;
    }

    // Encontrar el almacén relevante
    const almacen = negocio.almacenes.find((a) => a.IdAlmacenOK === idAlmacen);

    if (!almacen) {
      return null;
    }

    // Encontrar la serie relevante
    const serie = almacen.series.find((s) => s.Serie === idSerie);

    if (!serie) {
      return null;
    }

    // Encontrar el estatus físico relevante
    const estatusFisico = serie.estatus_fisico.find(
      (e) => e.IdTipoEstatusOK === idEstatusFisico
    );

    return estatusFisico || null;
  } catch (error) {
    throw boom.internal(error.message);
  }
};




// Agregar estatus físico a la serie en el almacén
export const postEstatusFisicoItem = async (idAlmacen, idSerie, paEstatusFisicoItem) => {
  try {
    const updatedAlmacen = await ProdServ.findOneAndUpdate(
      { 
        'negocios.almacenes.IdAlmacenOK': idAlmacen, 
        'negocios.almacenes.series.Serie': idSerie 
      },
      { 
        $push: { 
          'negocios.$[neg].almacenes.$[alm].series.$[ser].estatus_fisico': paEstatusFisicoItem 
        } 
      },
      { 
        new: true, // Devuelve el documento actualizado
        arrayFilters: [
          { 'neg.almacenes.IdAlmacenOK': idAlmacen },
          { 'alm.series.Serie': idSerie },
          { 'ser.Serie': idSerie }
        ]
      }
    );
    return updatedAlmacen;
  } catch (error) {
    throw error;
  }
};



// Actualizar estatus físico de la serie en el almacén
export const putEstatusFisicoItem = async (idAlmacen, idSerie, idEstatusFisico, paEstatusFisicoItem) => {
  try {
    const updatedAlmacen = await ProdServ.findOneAndUpdate(
      { 
        'negocios.almacenes.IdAlmacenOK': idAlmacen, 
        'negocios.almacenes.series.Serie': idSerie, 
        'negocios.almacenes.series.estatus_fisico.IdTipoEstatusOK': idEstatusFisico 
      },
      { 
        $set: { 
          'negocios.$.almacenes.$[almacen].series.$[serie].estatus_fisico.$[estatus]': paEstatusFisicoItem 
        } 
      },
      { 
        arrayFilters: [
          { 'almacen.IdAlmacenOK': idAlmacen },
          { 'serie.Serie': idSerie },
          { 'estatus.IdTipoEstatusOK': idEstatusFisico }
        ],
        new: true, // Para devolver el documento actualizado
        runValidators: true // Para asegurar validaciones en el esquema
      }
    );

    return updatedAlmacen;
  } catch (error) {
    throw boom.badImplementation(`Error en el servicio: ${error.message}`);
  }
};


// Eliminar estatus físico de la serie en el almacén
export const deleteEstatusFisicoItem = async (idAlmacen, idSerie, idEstatusFisico) => {
  try {
    const updatedAlmacen = await ProdServ.findOneAndUpdate(
      {
        'negocios.almacenes.IdAlmacenOK': idAlmacen,
        'negocios.almacenes.series.Serie': idSerie,
      },
      {
        $pull: {
          'negocios.$[neg].almacenes.$[alm].series.$[ser].estatus_fisico': {
            IdTipoEstatusOK: idEstatusFisico,
          },
        },
      },
      {
        arrayFilters: [
          { 'neg.almacenes.IdAlmacenOK': idAlmacen },
          { 'alm.series.Serie': idSerie },
          { 'ser.estatus_fisico.IdTipoEstatusOK': idEstatusFisico },
        ],
        new: true,
      }
    );

    return updatedAlmacen;
  } catch (error) {
    throw error;
  }
};

//-------------------------------------------Estatus Venta--------------------------------------------------
// Obtener estatus de venta de la serie en el almacén
export const getEstatusVentaItem = async (idAlmacen, idSerie, idEstatusVenta) => {
  try {
    const almacen = await ProdServ.findOne(
      { 'negocios.almacenes.IdAlmacenOK': idAlmacen, 'negocios.almacenes.series.Serie': idSerie },
      { 'negocios.almacenes.series.$': 1 } // Selecciona solo la serie específica
    );
    if (!almacen) return null;

    const estatusVentaItem = almacen.negocios[0].almacenes[0].series[0].estatus_venta.find(estatus => estatus.IdTipoEstatusOK === idEstatusVenta);
    return estatusVentaItem;
  } catch (error) {
    throw boom.internal(error);
  }
};

// Agregar estatus de venta a la serie en el almacén
export const postEstatusVentaItem = async (idAlmacen, idSerie, newEstatusVenta) => {
  try {
    const result = await ProdServ.findOneAndUpdate(
      {
        "negocios.almacenes": {
          $elemMatch: {
            IdAlmacenOK: idAlmacen,
            "series.Serie": idSerie,
          },
        },
      },
      {
        $push: {
          "negocios.$[neg].almacenes.$[alm].series.$[ser].estatus_venta": newEstatusVenta,
        },
      },
      {
        arrayFilters: [
          { "neg.almacenes": { $elemMatch: { IdAlmacenOK: idAlmacen } } },
          { "alm.series": { $elemMatch: { Serie: idSerie } } },
          { "ser.Serie": idSerie } // Filtro añadido para 'ser'
        ],
        new: true, // Devuelve el documento actualizado
      }
    );

    console.log('Resultado de la inserción:', result);
    return result;
  } catch (error) {
    console.error('Error al insertar estatus de venta:', error.message);
    throw error;
  }
};



// Actualizar estatus de venta de la serie en el almacén
export const putEstatusVentaItem = async (idAlmacen, idSerie, idEstatusVenta, updatedEstatusVenta) => {
  try {
    const result = await ProdServ.findOneAndUpdate(
      {
        "negocios.almacenes": {
          $elemMatch: {
            IdAlmacenOK: idAlmacen,
            "series.Serie": idSerie,
            "series.estatus_venta.IdTipoEstatusOK": idEstatusVenta,
          },
        },
      },
      {
        $set: {
          "negocios.$[neg].almacenes.$[alm].series.$[ser].estatus_venta.$[est]": updatedEstatusVenta,
        },
      },
      {
        arrayFilters: [
          { "neg.almacenes": { $elemMatch: { IdAlmacenOK: idAlmacen } } },
          { "alm.series": { $elemMatch: { Serie: idSerie } } },
          { "ser.estatus_venta": { $elemMatch: { IdTipoEstatusOK: idEstatusVenta } } },
          { "est.IdTipoEstatusOK": idEstatusVenta } // Filtro para 'est'
        ],
        new: true, // Devuelve el documento actualizado
      }
    );

    console.log('Resultado de la actualización:', result);
    return result;
  } catch (error) {
    console.error('Error al actualizar estatus de venta:', error.message);
    throw error;
  }
};


// Eliminar estatus de venta de la serie en el almacén
export const deleteEstatusVentaItem = async (idAlmacen, idSerie, idEstatusVenta) => {
  try {
    const result = await ProdServ.findOneAndUpdate(
      {
        "negocios.almacenes": {
          $elemMatch: {
            IdAlmacenOK: idAlmacen,
            "series.Serie": idSerie,
          },
        },
      },
      {
        $pull: {
          "negocios.$[neg].almacenes.$[alm].series.$[ser].estatus_venta": {
            IdTipoEstatusOK: idEstatusVenta,
          },
        },
      },
      {
        arrayFilters: [
          { "neg.almacenes": { $elemMatch: { IdAlmacenOK: idAlmacen } } },
          { "alm.series": { $elemMatch: { Serie: idSerie } } },
          { "ser.Serie": idSerie } // Filtro añadido para 'ser'
        ],
        new: true, // Devuelve el documento actualizado
      }
    );

    console.log('Resultado de la eliminación:', result);
    return result;
  } catch (error) {
    console.error('Error al eliminar estatus de venta:', error.message);
    throw error;
  }
};

//------------------------------------------Ubicaciones-----------------------------------------------------
// Obtener ubicación de la serie en el almacén
export const getUbicacionItem = async (idAlmacen, idSerie, idUbicacion) => {
  try {
    const almacen = await ProdServ.findOne(
      { 'negocios.almacenes.IdAlmacenOK': idAlmacen, 'negocios.almacenes.series.Serie': idSerie },
      { 'negocios.almacenes.series.$': 1 } // Selecciona solo la serie específica
    );
    if (!almacen) return null;

    const ubicacionItem = almacen.negocios[0].almacenes[0].series[0].ubicaciones.find(ubicacion => ubicacion.IdAlmacenOK === idUbicacion);
    return ubicacionItem;
  } catch (error) {
    throw boom.internal(error);
  }
};

// Agregar ubicación a la serie en el almacén
export const postUbicacionItem = async (idAlmacen, idSerie, paUbicacionItem) => {
  try {
    const updatedAlmacen = await ProdServ.findOneAndUpdate(
      { 'negocios.almacenes.IdAlmacenOK': idAlmacen, 'negocios.almacenes.series.Serie': idSerie },
      { $push: { 'negocios.$.almacenes.$.series.$.ubicaciones': paUbicacionItem } },
      { new: true }
    );
    return updatedAlmacen;
  } catch (error) {
    throw error;
  }
};

// Actualizar ubicación de la serie en el almacén
export const putUbicacionItem = async (idAlmacen, idSerie, idUbicacion, paUbicacionItem) => {
  try {
    const updatedAlmacen = await ProdServ.findOneAndUpdate(
      { 'negocios.almacenes.IdAlmacenOK': idAlmacen, 'negocios.almacenes.series.Serie': idSerie, 'negocios.almacenes.series.ubicaciones.IdAlmacenOK': idUbicacion },
      { $set: { 'negocios.$.almacenes.$[almacen].series.$[serie].ubicaciones.$[ubicacion]': paUbicacionItem } },
      { 
        arrayFilters: [
          { 'almacen.IdAlmacenOK': idAlmacen },
          { 'serie.Serie': idSerie },
          { 'ubicacion.IdAlmacenOK': idUbicacion }
        ],
        new: true 
      }
    );
    return updatedAlmacen;
  } catch (error) {
    throw boom.badImplementation(error);
  }
};

// Eliminar ubicación de la serie en el almacén
export const deleteUbicacionItem = async (idAlmacen, idSerie, idUbicacion) => {
  try {
    const updatedAlmacen = await ProdServ.findOneAndUpdate(
      { 'negocios.almacenes.IdAlmacenOK': idAlmacen, 'negocios.almacenes.series.Serie': idSerie },
      { $pull: { 'negocios.$.almacenes.$.series.$.ubicaciones': { IdAlmacenOK: idUbicacion } } },
      { new: true }
    );
    return updatedAlmacen;
  } catch (error) {
    throw error;
  }
};
