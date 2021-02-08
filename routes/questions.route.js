const questionController=require('../controllers/questions.controller');
const { body } = require('express-validator');

const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/question',questionController.getRecords);
  router.post('/question',questionController.postRecords);
  router.put('/question/:questionId', questionController.updateRecords);
  router.delete('/question/:id', questionController.deleteRecords);
}
