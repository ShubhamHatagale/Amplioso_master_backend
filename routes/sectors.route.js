const sectorController=require('../controllers/sectors.controller');
const { body } = require('express-validator');

const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/sector',sectorController.getRecords);
  router.post('/sector',sectorController.postRecords);
  router.put('/sector/:sectorId', sectorController.updateRecords);
  router.delete('/sector/:id', sectorController.deleteRecords);
}
