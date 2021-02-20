const rolesController=require('../controllers/roles.controller');
const { body } = require('express-validator');

const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/role',rolesController.getRecords);
  router.get('/role/:roleId',rolesController.getRecordsById);
  router.post('/role',rolesController.postRecords);
  router.put('/role/:roleId', rolesController.updateRecords);
  router.delete('/role/:id', rolesController.deleteRecords);
}
