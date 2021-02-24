const sectorController=require('../controllers/sectors.controller');
// const { body } = require('express-validator');
const {check, validationResult, body} = require('express-validator');
const { validate } = require('../config/validate');


module.exports=(router)=>{
  router.get('/sector',sectorController.getRecords);
  router.get('/sector/:sectorId',sectorController.getRecordsById);
  router.post('/sector',validate([
    body('sector_name').not().isEmpty().matches(/^[A-Za-z0-9-/]+$/).withMessage('allow only number char dash and slash'),
    body('status').not().isEmpty().isString().withMessage('Sector status can not be empty and should be string'),
    body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
    body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    ]),sectorController.postRecords);
  router.put('/sector/:sectorId',validate([
    body('sector_name').not().isEmpty().matches(/^[A-Za-z0-9-/]+$/).withMessage('allow only number and dash'),
    body('status').not().isEmpty().isString().withMessage('Sector status can not be empty and should be string'),
    body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
    body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
      ]), sectorController.updateRecords);
  router.delete('/sector/:id', sectorController.deleteRecords);
}
