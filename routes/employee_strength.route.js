const employeeController=require('../controllers/employee_strength.controller');
const { body } = require('express-validator');

const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/employee',employeeController.getRecords);
  router.post('/employee',employeeController.postRecords);
  router.put('/employee/:empId', employeeController.updateRecords);
  router.delete('/employee/:id', employeeController.deleteRecords);
}
