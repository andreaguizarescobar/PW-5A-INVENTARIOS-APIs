import * as prodServController from '../controllers/prodserv.controller.js';

//Commerce
import { Router } from 'express';
//import * as prodServController from '../controllers/prodserv.controller';
const router = Router();

//router.get('/list', ProdServController.getProdServList);
router.get('/', prodServController.getProdServList);

//router.get('/item/:ficIdProdServ', prodServController.getProdServItem);

//------Instituto
router.get('/:id', prodServController.getProdServItem);
router.post('/', prodServController.postProdServItem);
router.put('/:id', prodServController.putProdServItem);
router.delete('/:id', prodServController.deleteProdServItem);

//--------Negocios
router.get('/negocio/:id', prodServController.getNegocioItem);
router.post('/:id/negocio/', prodServController.postNegocioItem);
router.put('/negocio/:id', prodServController.putNegocioItem);
router.delete('/negocio/:id', prodServController.deleteNegocioItem);

//--------Almacenes
router.get('/almacen/:id', prodServController.getAlmacenItem);
router.post('/:id/almacen', prodServController.postAlmacenItem);
router.put('/almacen/:id', prodServController.putAlmacenItem);
router.delete('/almacen/:id', prodServController.deleteAlmacenItem);

//--------InfoAd de Almacenes
router.get('/almacen/:idAlmacen/info_ad/:idInfoAd', prodServController.getInfoAdItem);
router.post('/almacen/:idAlmacen/info_ad', prodServController.postInfoAdItem);
router.put('/almacen/:idAlmacen/info_ad/:idInfoAd', prodServController.putInfoAdItem);
router.delete('/almacen/:idAlmacen/info_ad/:idInfoAd', prodServController.deleteInfoAdItem);

//--------Movimientos de Almacenes
router.get('/almacen/:idAlmacen/mvto/',prodServController.getMvtoItem);
router.post('/almacen/:idAlmacen/mvto', prodServController.postMvtoItem);
// Ruta para actualizar un movimiento
router.put('/almacen/:almacenId/movto/:movtoId', prodServController.updateMovtoController);
// Ruta para eliminar un movimiento
router.delete('/almacen/:almacenId/movto/:movtoId', prodServController.deleteMovtoController);

//--------Series de Almacenes
router.get('/almacen/:idAlmacen/serie/:idSerie', prodServController.getSerieItem);
router.post('/almacen/:idAlmacen/serie', prodServController.postSerieItem);
router.put('/almacen/:idAlmacen/serie/:idSerie', prodServController.putSerieItem);
router.delete('/almacen/:idAlmacen/serie/:idSerie', prodServController.deleteSerieItem);

//--------Estatus Físico de Series en Almacenes
router.get('/almacen/:idAlmacen/serie/:idSerie/estatus_fisico/:idEstatusFisico', prodServController.getEstatusFisicoItem);
router.post('/almacen/:idAlmacen/serie/:idSerie/estatus_fisico', prodServController.postEstatusFisicoItem);
router.put('/almacen/:idAlmacen/serie/:idSerie/estatus_fisico/:idEstatusFisico', prodServController.putEstatusFisicoItem);
router.delete('/almacen/:idAlmacen/serie/:idSerie/estatus_fisico/:idEstatusFisico', prodServController.deleteEstatusFisicoItem);

//--------Estatus de Venta de Series en Almacenes
router.get('/almacen/:idAlmacen/serie/:idSerie/estatus_venta/:idEstatusVenta', prodServController.getEstatusVentaItem);
router.post('/almacen/:idAlmacen/serie/:idSerie/estatus_venta', prodServController.postEstatusVentaItem);

router.put('/almacen/:idAlmacen/serie/:idSerie/estatus_venta/:idEstatusVenta', prodServController.putEstatusVentaItem);
router.delete('/almacen/:idAlmacen/serie/:idSerie/estatus_venta/:idEstatusVenta', prodServController.deleteEstatusVentaItem);

//--------Ubicaciones de Series en Almacenes
router.get('/almacen/:idAlmacen/serie/:idSerie/ubicacion/:idUbicacion', prodServController.getUbicacionItem);
router.post('/almacen/:idAlmacen/serie/:idSerie/ubicacion', prodServController.postUbicacionItem);
router.put('/almacen/:idAlmacen/serie/:idSerie/ubicacion/:idUbicacion', prodServController.putUbicacionItem);
router.delete('/almacen/:idAlmacen/serie/:idSerie/ubicacion/:idUbicacion', prodServController.deleteUbicacionItem);

router.get('/movimientos/almacen/:almacenId', prodServController.getMovimientosByAlmacen);
export default router;