const feedbackController=require('../controllers/feedback_frequencies.controller');
const { body } = require('express-validator');

const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/feedback',feedbackController.getRecords);
  router.get('/feedback/:feedId',feedbackController.getRecordsById);
  router.post('/feedback',feedbackController.postRecords);
  router.put('/feedback/:feedId', feedbackController.updateRecords);
  router.delete('/feedback/:id', feedbackController.deleteRecords);
}
