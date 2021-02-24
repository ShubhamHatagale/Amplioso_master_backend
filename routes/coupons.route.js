const couponsController=require('../controllers/coupons.controller');
const { body } = require('express-validator');
const { validate } = require('../config/validate');

module.exports=(router)=>{
  router.get('/coupon',couponsController.getRecords);
  router.get('/coupon/:couponId',couponsController.getRecordsById)

  router.post('/coupon',validate([
    body('coupon_name').not().isEmpty()
    .not().isEmpty().matches(/^[A-Za-z0-9-]+$/).withMessage('Allow Only Alpha numric dash  and can not be empty'),     
   
      body('coupon_percentage')
      .trim()       
      .isInt({ min: 1, max: 100 })
      .withMessage('Only Numbers are allowed upto 100'),
      body('package').not().isEmpty().isString(),
      body('start_date').not().isEmpty().isDate(),
      body('end_date').not().isEmpty().isDate(),
      body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
      body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
      body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
      ]),couponsController.postRecords);
  router.put('/coupon/:couponId',validate([
    body('coupon_name').not().isEmpty()    
    .not().isEmpty().matches(/^[A-Za-z0-9-]+$/).withMessage('Allow Only Alpha numric dash  and can not be empty'),     

      body('coupon_percentage')
      .trim()       
      .isInt({ min: 1, max: 100 })
      .withMessage('Only Numbers are allowed upto 100'),
      body('package').not().isEmpty().isString(),
      body('start_date').not().isEmpty().isDate(),
      body('end_date').not().isEmpty().isDate(),
      body('created_on').not().isEmpty().isDate().withMessage('Should be in date format and can not be empty'),
      body('updated_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
      body('created_by').not().isEmpty().isInt().withMessage('Should be Int and can not be empty'),
      ]), couponsController.updateRecords);
  router.delete('/coupon/:id', couponsController.deleteRecords);
}
