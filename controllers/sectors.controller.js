const Sector=require('../models/sectors.model');
const { validationResult } = require('express-validator');
const helper=require('../config/helpers')


exports.getRecords =async  (req,res,next)=>{
    try {
          const Data = await Sector.findAll({where: {is_deleted:0} });
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
    const Data = await Sector.findAll({where: {id: req.params.sectorId,is_deleted:0} });
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
  // console.log("In controller");
    // console.log(req.body)
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     return res.status(422).json({errors: errors.array()});
    // }
    // else{
      // const errors = validationResult(req);
      // if(!errors.isEmpty()) {
      //   console.log(errors);
      //   return res.status(400).json({
      //     error: {
      //       message: errors.array()
      //     }
      //   });
      // }    
      try{
      validationResult(req).throw();

  
    const sector = new Sector({          
        sector_name:req.body.sector_name,
        status:req.body.status,
        created_by:req.body.created_by,
      updated_by:req.body.updated_by,      
    });
    sector
      .save()
      .then(result => {
        res.status(201).json({
          message: 'Post created successfully!',
          post: result,
          status:200
        });
      })
      .catch(err => {
        console.log("error:",err);
        helper.logger.info(err)
      });
    }catch (err) {
      res.status(422).json(err);
    }
  
};
exports.updateRecords = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      status: 401,
      message: 'Validation Fialed',/** commit changes */
      error: errors  
  })
  }
  try{
  const sectordetails =await Sector.update({
    sector_name:req.body.sector_name,
    status:req.body.status,
    created_by:req.body.created_by,
    updated_by:req.body.updated_by           
},
{where: {id: req.params.sectorId} });

  if(!sectordetails){
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
    const sectorid = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        status: 401,
        message: 'Validation Fialed',
        error: errors  
    })
    }
    try{
    const details =await Sector.update({
      is_deleted:1
  },
  {where: {id: sectorid} });
  
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

