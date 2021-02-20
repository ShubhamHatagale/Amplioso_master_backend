const Coupon=require('../models/coupons.model');
const { validationResult } = require('express-validator');
const helper=require('../config/helpers')


exports.getRecords =async  (req,res,next)=>{
    try {
          const Data = await Coupon.findAll({where: {is_deleted:0} });
          if(!Data){            
            return res.status(404).json({
              status: 404,
              message: 'could not find result',              
          })
        }
        res.status(200).json({
            message:"Result Fetched",
            data:Data
        }) 
        helper.logger.info(Data)     
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);   
      helper.logger.info(error)
    }   
}
exports.getRecordsById=async(req,res,next)=>{
  try {
    const Data = await Coupon.findAll({where: {id: req.params.couponId,is_deleted:0} });
    if(!Data){            
      return res.status(404).json({
        status: 404,
        message: 'could not find result',              
    })
  }
  res.status(200).json({
      message:"Result Fetched",
      data:Data
  }) 
  helper.logger.info(Data)     
} catch (error) {
if (!error.statusCode) {
  error.statusCode = 500;
}
next(error);   
helper.logger.info(error)
}}



exports.postRecords=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({
          status: 401,
          message: 'Validation Fialed',
          error: errors  
      })
    }
    const coupon = new Coupon({          
        coupon_name:req.body.coupon_name,
        coupon_percentage:req.body.coupon_percentage,
        package:req.body.package,
        start_date:req.body.start_date,
        end_date:req.body.end_date,
       created_by:req.body.created_by,
       created_on:req.body.created_on,      
    });
    coupon
      .save()
      .then(result => {
        res.status(201).json({
          message: 'Post created successfully!',
          post: result,
          status:200          
        });
      })
      .catch(err => {
        console.log(err);
      });
  
};
exports.updateRecords = async (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      status: 401,
      message: 'Validation Fialed',
      error: errors  
  })
  }
  try{
  const coupondetails =await Coupon.update({
    coupon_name:req.body.coupon_name,
    coupon_percentage:req.body.coupon_percentage,
    status:req.body.status,
    package:req.body.package,
    created_by:req.body.created_by,
    updated_by:req.body.updated_by,
    created_on:req.body.created_on          
},
{where: {id: req.params.couponId} });

  if(!coupondetails){
    return res.status(200).json({
      status: 404,
      message: 'No data found'   
  })
  }
  res.status(200).json({
    status: 200,
    message: 'Data Updated Successfully',
 }); 
}catch(error){
  console.log(error)
  return res.status(400).send({
    message:'Unable to Update data',
    errors: error,
    status: 400
});
}    
  }
exports.deleteRecords = async (req, res, next) => {
    const couponid = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        status: 401,
        message: 'Validation Fialed',
        error: errors  
    })
    }
    try{
    const details =await Coupon.update({
      is_deleted:1
  },
  {where: {id: couponid} });
  
    if(!details){
      return res.status(200).json({
        status: 404,
        message: 'No data found'   
    })
    }
    res.status(200).json({
      status: 200,
      message: 'Record Deleted Successfully',
   }); 
  }catch(error){
    console.log(error)
    return res.status(400).send({
      message:'Unable to Delete Record',
      errors: error,
      status: 400
  });
  }
};

