const feedbackController=require('../controllers/feedback_frequencies.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');

const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/feedback',feedbackController.getRecords);
  router.get('/feedback/:feedId',feedbackController.getRecordsById);
  router.post('/feedback',validate([
    body('feedback_frequencies').not().isEmpty().isString(),
    body('status').not().isEmpty().isString(),
    body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
    body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),  ]),feedbackController.postRecords);
  router.put('/feedback/:feedId', 
  validate([
    body('feedback_frequencies').not().isEmpty().isString(),
    body('status').not().isEmpty().isString(),
    body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
    body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),  
  ]),feedbackController.updateRecords);
  router.delete('/feedback/:id', feedbackController.deleteRecords);
}
