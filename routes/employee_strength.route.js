const employeeController=require('../controllers/employee_strength.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');


const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/employee',employeeController.getRecords);
  router.get('/employee/:empId',employeeController.getRecordsById);
  router.post('/employee',validate([
  body('number_of_employee').not().isEmpty().matches(/^[0-9.-]+$/).withMessage('allow only number and dash'),
  body('status').not().isEmpty().isString().withMessage(' can not be empty'),
  body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
  body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
  body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),  ]),employeeController.postRecords);
  router.put('/employee/:empId',validate([
    body('number_of_employee').not().isEmpty().matches(/^[0-9.-]+$/).withMessage('allow only number and dash'),
    body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
    body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    ]), employeeController.updateRecords);
  router.delete('/employee/:id', employeeController.deleteRecords);
}
