const Package=require('../models/package.model');
const { validationResult } = require('express-validator');
const helper=require('../config/helpers')


exports.getRecords =async  (req,res,next)=>{
    try {
          const Data = await Package.findAll({where: {is_deleted:0} });
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
    const Data = await Package.findAll({where: {id: req.params.packId,is_deleted:0} });
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
} catch (error) {
if (!error.statusCode) {
  error.statusCode = 500;
}
next(error);   
helper.logger.info(error)
}}



exports.postRecords=async(req,res,next)=>{
  console.log(req.body);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({
          status: 401,
          message: 'Validation Fialed',
          error: errors  
      })
    }
    const package = new Package({          
        package_name:req.body.package_name,
        no_of_employees:req.body.no_of_employees,
        end_date:req.body.end_date,
        start_date:req.body.start_date,
      created_by:req.body.created_by,
      created_on:req.body.created_on,      
    });
    package
      .save()
      .then(result => {
        res.status(201).json({
          message: 'Post created successfully!',
          post: result,
          status:200
        });
      })
      .catch(err => {
        helper.logger.info(err)
        console.log(err);
      });
  
};
exports.updateRecords = async (req, res, next) => {
  console.log(req.body);
  try{
  const packagedetails =await Package.update({
    package_name:req.body.package_name,
    no_of_employees:req.body.no_of_employees,
    end_date:req.body.end_date,
    start_date:req.body.start_date,
    created_by:req.body.created_by,
    created_on:req.body.created_on          
},
{where: {id: req.params.packId} });

  if(!packagedetails){
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
  helper.logger.info(error)
  return res.status(500).send({
    message:'Unable to Update data',
    status: 500
});
}    
  }
exports.deleteRecords = async (req, res, next) => {
    const packid = req.params.id;
    try{
    const details =await Package.update({
      is_deleted:1
  },
  {where: {id: packid} });
  
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
    helper.logger.info(error)
    return res.status(500).send({
      message:'Unable to Delete Record',
      status: 500
  });
  }
};

