const countryController=require('../controllers/countries.controller');
const { body } = require('express-validator');

const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/country',countryController.getRecords);
  router.post('/country',countryController.postRecords);
  router.put('/country/:countryId', countryController.updateRecords);
  router.delete('/country/:id', countryController.deleteRecords);
}
