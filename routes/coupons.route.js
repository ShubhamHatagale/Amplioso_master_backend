const couponsController=require('../controllers/coupons.controller');
const { body } = require('express-validator');
const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/coupon',couponsController.getRecords);
  router.post('/coupon',[
      body('coupon_percentage')
      .trim()       
      .isInt({ min: 1, max: 100 })
      .withMessage('Only Numbers are allowed upto 100')      
  ],couponsController.postRecords);
  router.put('/coupon/:couponId',[
    body('coupon_percentage')
    .trim() 
    .isInt({ min: 1, max: 100 })
    .withMessage('Only Numbers are allowed upto 100')      
  ], couponsController.updateRecords);
  router.delete('/coupon/:id', couponsController.deleteRecords);
}
