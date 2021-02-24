const packageController=require('../controllers/package.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');

const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/package',packageController.getRecords);
  router.get('/package/:packId',packageController.getRecordsById)
  router.post('/package',
  validate([
    body('package_name').not().isEmpty().isString(),
    body('no_of_employees').not().isEmpty().matches(/^[0-9.-]+$/).withMessage('allow only number and dash'),
body('start_date').not().isEmpty().isDate(),
body('end_date').not().isEmpty().isDate(),
      body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
      body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
      body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),  
  ]),
  packageController.postRecords);
  router.put('/package/:packId',
  validate([
    body('package_name').not().isEmpty().isString(),
    body('no_of_employees').not().isEmpty().matches(/^[0-9.-]+$/).withMessage('allow only number and dash'),
    body('start_date').not().isEmpty().isDate(),
    body('end_date').not().isEmpty().isDate(),
    body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
    body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),       
  ]), 
  packageController.updateRecords);
  router.delete('/package/:id', packageController.deleteRecords);
}
