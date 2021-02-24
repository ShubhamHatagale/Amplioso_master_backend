const rolesController=require('../controllers/roles.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');

const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/role',rolesController.getRecords);
  router.get('/role/:roleId',rolesController.getRecordsById);
  router.post('/role',validate([
    body('role').not().isEmpty().isString().withMessage('Role can not be empty and should be string'),
    body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
    body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),,

  ]),rolesController.postRecords);
  router.put('/role/:roleId',validate([
    body('role').not().isEmpty().isString().withMessage('Role can not be empty and should be string'),
    body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
    body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),,

  ]), rolesController.updateRecords);
  router.delete('/role/:id', rolesController.deleteRecords);
}
