const Country=require('../models/countries.model');
const { validationResult } = require('express-validator');
const helper=require('../config/helpers')


exports.getRecords =async  (req,res,next)=>{
    try {
          const Data = await Country.findAll({where: {is_deleted:'0'} });
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
    const Data = await Country.findAll({where: {id: req.params.countryId,is_deleted:'0'} });
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
    const country = new Country({          
      country_name:req.body.country_name,
      status:req.body.status,
      created_on:req.body.created_on,
      created_by:req.body.created_by,
      updated_by:req.body.updated_by,      
    });
    country
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

  try{
  const countrydetails =await Country.update({
    country_name:req.body.country_name,
    status:req.body.status,
    created_by:req.body.created_by,
    updated_by:req.body.updated_by,
    created_on:req.body.created_on          
},
{where: {id: req.params.countryId} });

  if(!countrydetails){
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
    const countryid = req.params.id;
    try{
    const details =await Country.update({
      is_deleted:'1'
  },
  {where: {id: countryid} });
  
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

