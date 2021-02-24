const companyController = require('../controllers/companies.controller');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const { validate } = require('../config/validate');


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
  validate([
    body('company_name')
    .not().isEmpty().matches(/^[A-Za-z0-9-.]+$/).withMessage('Allow Alpha numric dash and dot and can not be empty'),     
    body('comapany_headquaters').not().isEmpty().isString(),
    body('date_of_inception').not().isEmpty().isDate(),
    body('number_of_employee').not().isEmpty().isInt(),
    body('business_sector').not().isEmpty().isInt(),
    body('average_employee_compansation').not().isEmpty().isInt(),
    body('feed_back_frequency').not().isEmpty().isInt(),
    body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
    body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
  ]),

companyController.postRecords);
  router.put('/company/:comId',
   upload,
   validate([
    body('company_name')
    .not().isEmpty().matches(/^[A-Za-z0-9-.]+$/).withMessage('Allow Alpha numric dash and dot and can not be empty'),     
    body('comapany_headquaters').not().isEmpty().isInt(),
    body('date_of_inception').not().isEmpty().isDate(),
    body('number_of_employee').not().isEmpty().isInt(),
    body('business_sector').not().isEmpty().isInt(),
    body('average_employee_compansation').not().isEmpty().isInt(),
    body('feed_back_frequency').not().isEmpty().isInt(),
    body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
    body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
    ])
,companyController.updateRecords);
  router.delete('/company/:id', companyController.deleteRecords);
}
