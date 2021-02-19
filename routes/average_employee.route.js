const averageempController=require('../controllers/average_employee.controller');
const { body } = require('express-validator');

const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/averageEmp',averageempController.getRecords);
  router.get('/averageEmp/:AverageId',averageempController.getRecordsById);
  router.post('/averageEmp',averageempController.postRecords);
  router.put('/averageEmp/:averageEmpId', averageempController.updateRecords);
  router.delete('/averageEmp/:id', averageempController.deleteRecords);
}
