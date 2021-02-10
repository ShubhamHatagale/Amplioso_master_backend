const companyController = require('../controllers/companies.controller');
const { body } = require('express-validator');

const helper=require('../config/helpers')
const multer = require('multer');
var uploadbody = multer();

module.exports=(router)=>{
  router.get('/company',companyController.getRecords);
  router.post('/company', uploadbody.single('somefile'),
  /* [
    body('company_name')
    .custom(val => {   
      if (body('company_name').isAlphanumeric() || val.indexOf('-') !== -1 ||val.indexOf('.') !== -1 ) return true
      return false
    }),    
    // body('comapany_headquaters').isString()
  ], */
companyController.postRecords);
  router.put('/company/:comId', companyController.updateRecords);
  router.delete('/company/:id', companyController.deleteRecords);
}
