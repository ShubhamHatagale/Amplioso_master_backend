const companyController = require('../controllers/companies.controller');
const { body } = require('express-validator');

const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/company',companyController.getRecords);
  router.post('/company', 
  [
    body('company_name').not().isEmpty().isString(),
    body('company_logo').not().isEmpty().isString(),
    body('comapany_headquaters').not().isEmpty().isString()
  ]
,companyController.postRecords);
  router.put('/company/:comId', companyController.updateRecords);
  router.delete('/company/:id', companyController.deleteRecords);
}
