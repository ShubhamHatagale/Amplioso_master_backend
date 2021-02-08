const packageController=require('../controllers/package.controller');
const { body } = require('express-validator');
const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/package',packageController.getRecords);
  router.post('/package',[
      body('no_of_employees')
      .trim() 
      .isInt()     
      .withMessage('Only Numbers are allowd')
  ],packageController.postRecords);
  router.put('/package/:packId',[
    body('no_of_employees')
    .trim() 
    .isInt() 
    .withMessage('Only Numbers are allowd')       
  ], packageController.updateRecords);
  router.delete('/package/:id', packageController.deleteRecords);
}
