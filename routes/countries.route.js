const countryController=require('../controllers/countries.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');

const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/country',countryController.getRecords);
  router.get('/country/:countryId',countryController.getRecordsById)
  router.post('/country',
  validate([
    body('country_name').not().isEmpty().isString().withMessage('Should be in string and can not be empty'),
    body('status').not().isEmpty().isString().withMessage('Should be in string and can not be empty'),
    body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
    body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    ]),countryController.postRecords);
  router.put('/country/:countryId',
  validate([
    body('country_name').not().isEmpty().isString().withMessage('Should be in string and can not be empty'),
    body('status').not().isEmpty().isString().withMessage('Should be in string and can not be empty'),
    body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
    body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
  ]), countryController.updateRecords);
  router.delete('/country/:id', countryController.deleteRecords);
}
