const companyController = require('../controllers/companies.controller');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './assets/images');
  },
  filename: function (req, file, callback) {
    callback(null,Date.now()+ '-' +file.originalname );
  }
});
var fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({ storage : storage,fileFilter: fileFilter}).single('company_logo');

module.exports=(router)=>{
  router.get('/company',companyController.getRecords);
  router.get('/company/:comId',companyController.getRecordsById)
  router.post('/company', 
  upload,
  //  [
  //   body('company_name')
  //   .custom(val => {   
  //     if (body('company_name').isAlphanumeric() || val.indexOf('-') !== -1 ||val.indexOf('.') !== -1 ) return true
  //     return false
  //   }),    
    // body('comapany_headquaters').isString()
  // ], 
companyController.postRecords);
  router.put('/company/:comId', upload,companyController.updateRecords);
  router.delete('/company/:id', companyController.deleteRecords);
}
