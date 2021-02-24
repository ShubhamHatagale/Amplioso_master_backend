const averageempController=require('../controllers/average_employee.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');


module.exports=(router)=>{
  router.get('/averageEmp',averageempController.getRecords);
  router.get('/averageEmp/:AverageId',averageempController.getRecordsById);
  router.post('/averageEmp',
    validate([
    body('average_employees').not().isEmpty().matches(/^[0-9.-]+$/).withMessage('allow only number and dash'),
    body('status').not().isEmpty().isString().withMessage('status cannot be empty and must be string'),
    body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
    body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    ])
    ,averageempController.postRecords);
  router.put('/averageEmp/:averageEmpId',
  validate([
    body('average_employees').not().isEmpty().matches(/^[0-9.-]+$/).withMessage('allow only number and dash'),
    body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
        body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
        body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
        ])
      , averageempController.updateRecords);
  router.delete('/averageEmp/:id', averageempController.deleteRecords);
}
